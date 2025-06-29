-- Create tavus_conversations table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'tavus_conversations') THEN
    CREATE TABLE tavus_conversations (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      conversation_id text UNIQUE NOT NULL,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      status text NOT NULL DEFAULT 'active',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      metadata jsonb DEFAULT '{}'::jsonb
    );
  END IF;
END $$;

-- Create tavus_messages table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'tavus_messages') THEN
    CREATE TABLE tavus_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      message_id text UNIQUE NOT NULL,
      conversation_id text NOT NULL,
      content text NOT NULL,
      role text NOT NULL,
      status text NOT NULL DEFAULT 'created',
      video_url text,
      transcript text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      metadata jsonb DEFAULT '{}'::jsonb
    );
  END IF;
END $$;

-- Create tavus_analytics table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'tavus_analytics') THEN
    CREATE TABLE tavus_analytics (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      conversation_id text,
      event_type text NOT NULL,
      event_data jsonb DEFAULT '{}'::jsonb,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE tavus_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for tavus_conversations
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_conversations' 
    AND policyname = 'Users can view their own conversations'
  ) THEN
    CREATE POLICY "Users can view their own conversations" ON tavus_conversations
      FOR SELECT TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_conversations' 
    AND policyname = 'Users can insert their own conversations'
  ) THEN
    CREATE POLICY "Users can insert their own conversations" ON tavus_conversations
      FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_conversations' 
    AND policyname = 'Users can update their own conversations'
  ) THEN
    CREATE POLICY "Users can update their own conversations" ON tavus_conversations
      FOR UPDATE TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_conversations' 
    AND policyname = 'Service role can manage tavus_conversations'
  ) THEN
    CREATE POLICY "Service role can manage tavus_conversations" ON tavus_conversations
      FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Create policies for tavus_messages
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_messages' 
    AND policyname = 'Users can view messages from their conversations'
  ) THEN
    CREATE POLICY "Users can view messages from their conversations" ON tavus_messages
      FOR SELECT TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM tavus_conversations 
          WHERE tavus_conversations.conversation_id = tavus_messages.conversation_id 
          AND tavus_conversations.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_messages' 
    AND policyname = 'Users can insert messages to their conversations'
  ) THEN
    CREATE POLICY "Users can insert messages to their conversations" ON tavus_messages
      FOR INSERT TO authenticated
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM tavus_conversations 
          WHERE tavus_conversations.conversation_id = tavus_messages.conversation_id 
          AND tavus_conversations.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_messages' 
    AND policyname = 'Service role can manage tavus_messages'
  ) THEN
    CREATE POLICY "Service role can manage tavus_messages" ON tavus_messages
      FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Create policies for tavus_analytics
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_analytics' 
    AND policyname = 'Users can view their own analytics'
  ) THEN
    CREATE POLICY "Users can view their own analytics" ON tavus_analytics
      FOR SELECT TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_analytics' 
    AND policyname = 'Users can insert their own analytics'
  ) THEN
    CREATE POLICY "Users can insert their own analytics" ON tavus_analytics
      FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_analytics' 
    AND policyname = 'Service role can manage tavus_analytics'
  ) THEN
    CREATE POLICY "Service role can manage tavus_analytics" ON tavus_analytics
      FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Create public policies for development
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_conversations' 
    AND policyname = 'Public can view tavus_conversations'
  ) THEN
    CREATE POLICY "Public can view tavus_conversations" ON tavus_conversations
      FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_messages' 
    AND policyname = 'Public can view tavus_messages'
  ) THEN
    CREATE POLICY "Public can view tavus_messages" ON tavus_messages
      FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_analytics' 
    AND policyname = 'Public can view tavus_analytics'
  ) THEN
    CREATE POLICY "Public can view tavus_analytics" ON tavus_analytics
      FOR SELECT TO public
      USING (true);
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tavus_conversations_user_id ON tavus_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_tavus_conversations_conversation_id ON tavus_conversations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_messages_conversation_id ON tavus_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_messages_message_id ON tavus_messages(message_id);
CREATE INDEX IF NOT EXISTS idx_tavus_analytics_user_id ON tavus_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_tavus_analytics_conversation_id ON tavus_analytics(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_analytics_event_type ON tavus_analytics(event_type);