/*
  # Add Tavus Live Interactions Tables

  1. New Tables
    - tavus_live_interactions: Stores live interaction sessions
    - tavus_live_messages: Stores messages from live interactions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Set up appropriate foreign key constraints
*/

-- Create tavus_live_interactions table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'tavus_live_interactions') THEN
    CREATE TABLE tavus_live_interactions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      live_id text UNIQUE NOT NULL,
      conversation_id text NOT NULL,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      status text NOT NULL DEFAULT 'active',
      mode text NOT NULL DEFAULT 'interactive',
      created_at timestamptz DEFAULT now(),
      ended_at timestamptz,
      metadata jsonb DEFAULT '{}'::jsonb
    );
  END IF;
END $$;

-- Create tavus_live_messages table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'tavus_live_messages') THEN
    CREATE TABLE tavus_live_messages (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      message_id text UNIQUE NOT NULL,
      live_id text NOT NULL,
      conversation_id text NOT NULL,
      content text NOT NULL,
      role text NOT NULL,
      status text NOT NULL DEFAULT 'created',
      video_url text,
      transcript text,
      created_at timestamptz DEFAULT now(),
      metadata jsonb DEFAULT '{}'::jsonb
    );
  END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE tavus_live_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_live_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for tavus_live_interactions
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_interactions' 
    AND policyname = 'Users can view their own live interactions'
  ) THEN
    CREATE POLICY "Users can view their own live interactions" ON tavus_live_interactions
      FOR SELECT TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_interactions' 
    AND policyname = 'Users can insert their own live interactions'
  ) THEN
    CREATE POLICY "Users can insert their own live interactions" ON tavus_live_interactions
      FOR INSERT TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_interactions' 
    AND policyname = 'Users can update their own live interactions'
  ) THEN
    CREATE POLICY "Users can update their own live interactions" ON tavus_live_interactions
      FOR UPDATE TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_interactions' 
    AND policyname = 'Service role can manage tavus_live_interactions'
  ) THEN
    CREATE POLICY "Service role can manage tavus_live_interactions" ON tavus_live_interactions
      FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Create policies for tavus_live_messages
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_messages' 
    AND policyname = 'Users can view messages from their live interactions'
  ) THEN
    CREATE POLICY "Users can view messages from their live interactions" ON tavus_live_messages
      FOR SELECT TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM tavus_live_interactions 
          WHERE tavus_live_interactions.live_id = tavus_live_messages.live_id 
          AND tavus_live_interactions.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_messages' 
    AND policyname = 'Users can insert messages to their live interactions'
  ) THEN
    CREATE POLICY "Users can insert messages to their live interactions" ON tavus_live_messages
      FOR INSERT TO authenticated
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM tavus_live_interactions 
          WHERE tavus_live_interactions.live_id = tavus_live_messages.live_id 
          AND tavus_live_interactions.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_messages' 
    AND policyname = 'Service role can manage tavus_live_messages'
  ) THEN
    CREATE POLICY "Service role can manage tavus_live_messages" ON tavus_live_messages
      FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Create public policies for development
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_interactions' 
    AND policyname = 'Public can view tavus_live_interactions'
  ) THEN
    CREATE POLICY "Public can view tavus_live_interactions" ON tavus_live_interactions
      FOR SELECT TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tavus_live_messages' 
    AND policyname = 'Public can view tavus_live_messages'
  ) THEN
    CREATE POLICY "Public can view tavus_live_messages" ON tavus_live_messages
      FOR SELECT TO public
      USING (true);
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tavus_live_interactions_user_id ON tavus_live_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_tavus_live_interactions_conversation_id ON tavus_live_interactions(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_live_interactions_live_id ON tavus_live_interactions(live_id);
CREATE INDEX IF NOT EXISTS idx_tavus_live_messages_live_id ON tavus_live_messages(live_id);
CREATE INDEX IF NOT EXISTS idx_tavus_live_messages_conversation_id ON tavus_live_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_live_messages_message_id ON tavus_live_messages(message_id);