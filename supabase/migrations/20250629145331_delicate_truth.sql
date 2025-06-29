/*
  # Create Tavus Integration Tables

  1. New Tables
    - users: Base users table (if not exists)
    - tavus_conversations: Stores conversation data from Tavus
    - tavus_messages: Stores message data including video URLs
    - tavus_analytics: Stores analytics data for reporting

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Set up appropriate foreign key constraints
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tavus_conversations table
CREATE TABLE IF NOT EXISTS tavus_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text UNIQUE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create tavus_messages table
CREATE TABLE IF NOT EXISTS tavus_messages (
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
  metadata jsonb DEFAULT '{}'::jsonb,
  FOREIGN KEY (conversation_id) REFERENCES tavus_conversations(conversation_id) ON DELETE CASCADE
);

-- Create tavus_analytics table
CREATE TABLE IF NOT EXISTS tavus_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  conversation_id text REFERENCES tavus_conversations(conversation_id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tavus_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Create policies for tavus_conversations
CREATE POLICY "Users can view their own conversations" ON tavus_conversations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations" ON tavus_conversations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" ON tavus_conversations
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for tavus_messages
CREATE POLICY "Users can view messages from their conversations" ON tavus_messages
  FOR SELECT TO authenticated
  USING (
    conversation_id IN (
      SELECT conversation_id FROM tavus_conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their conversations" ON tavus_messages
  FOR INSERT TO authenticated
  WITH CHECK (
    conversation_id IN (
      SELECT conversation_id FROM tavus_conversations WHERE user_id = auth.uid()
    )
  );

-- Create policies for tavus_analytics
CREATE POLICY "Users can view their own analytics" ON tavus_analytics
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON tavus_analytics
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create service role policies for all tables (for backend operations)
CREATE POLICY "Service role can manage users" ON users
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage tavus_conversations" ON tavus_conversations
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage tavus_messages" ON tavus_messages
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage tavus_analytics" ON tavus_analytics
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tavus_conversations_user_id ON tavus_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_tavus_conversations_conversation_id ON tavus_conversations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_messages_conversation_id ON tavus_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_messages_message_id ON tavus_messages(message_id);
CREATE INDEX IF NOT EXISTS idx_tavus_analytics_user_id ON tavus_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_tavus_analytics_conversation_id ON tavus_analytics(conversation_id);
CREATE INDEX IF NOT EXISTS idx_tavus_analytics_event_type ON tavus_analytics(event_type);