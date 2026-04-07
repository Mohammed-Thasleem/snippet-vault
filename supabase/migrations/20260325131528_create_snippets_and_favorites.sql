/*
  # Snippet Vault Database Schema

  ## Overview
  Creates the core database structure for the Snippet Vault application,
  a modern code snippet manager with sharing and favorites functionality.

  ## 1. New Tables
  
  ### `snippets`
  Stores all code snippets created by users.
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - Links to auth.users
  - `title` (text) - Snippet title/name
  - `code` (text) - The actual code content
  - `language` (text) - Programming language
  - `tags` (text[]) - Array of tag strings for organization
  - `description` (text, optional) - Additional description
  - `is_public` (boolean) - Whether snippet is publicly accessible
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `favorites`
  Junction table for user favorites (many-to-many relationship).
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - User who favorited
  - `snippet_id` (uuid, foreign key) - Favorited snippet
  - `created_at` (timestamptz) - When favorited
  - Unique constraint on (user_id, snippet_id) to prevent duplicates

  ## 2. Security (Row Level Security)
  
  ### Snippets Table Policies
  - **Select**: Users can view their own snippets + all public snippets
  - **Insert**: Authenticated users can create snippets
  - **Update**: Users can only update their own snippets
  - **Delete**: Users can only delete their own snippets
  
  ### Favorites Table Policies
  - **Select**: Users can only view their own favorites
  - **Insert**: Authenticated users can favorite any snippet
  - **Update**: Not allowed (favorites are create/delete only)
  - **Delete**: Users can only remove their own favorites

  ## 3. Indexes
  - Index on snippets(user_id) for fast user queries
  - Index on snippets(is_public) for public snippet discovery
  - Index on favorites(user_id) for fast favorites lookup
  - Index on favorites(snippet_id) for reverse lookups

  ## 4. Important Notes
  - All timestamps use UTC
  - Tags stored as PostgreSQL array for efficient querying
  - RLS ensures complete data isolation between users
  - Public snippets are readable by everyone but only editable by owner
*/

-- Create snippets table
CREATE TABLE IF NOT EXISTS snippets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  code text NOT NULL,
  language text NOT NULL DEFAULT 'javascript',
  tags text[] DEFAULT '{}',
  description text DEFAULT '',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  snippet_id uuid REFERENCES snippets(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, snippet_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_snippets_user_id ON snippets(user_id);
CREATE INDEX IF NOT EXISTS idx_snippets_is_public ON snippets(is_public);
CREATE INDEX IF NOT EXISTS idx_snippets_created_at ON snippets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_snippet_id ON favorites(snippet_id);

-- Enable Row Level Security
ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Snippets Policies
CREATE POLICY "Users can view own snippets and public snippets"
  ON snippets FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR is_public = true
  );

CREATE POLICY "Users can create own snippets"
  ON snippets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own snippets"
  ON snippets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own snippets"
  ON snippets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Favorites Policies
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_snippets_updated_at
  BEFORE UPDATE ON snippets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
