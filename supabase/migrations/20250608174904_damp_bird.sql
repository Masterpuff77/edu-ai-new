/*
  # Create Subject Test Results Table

  1. New Tables
    - subject_test_results: Stores quiz results for each subject
      - id (uuid, primary key)
      - userId (uuid, references users)
      - subject (text)
      - score (integer)
      - totalQuestions (integer)
      - completedAt (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own test results
*/

-- Create the subject_test_results table
CREATE TABLE IF NOT EXISTS subject_test_results (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" uuid REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  score integer NOT NULL,
  "totalQuestions" integer NOT NULL DEFAULT 10,
  "completedAt" timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE subject_test_results ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own test results"
  ON subject_test_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");

CREATE POLICY "Users can insert their own test results"
  ON subject_test_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");

-- Service role policy for administrative access
CREATE POLICY "Service role can manage all test results"
  ON subject_test_results
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);