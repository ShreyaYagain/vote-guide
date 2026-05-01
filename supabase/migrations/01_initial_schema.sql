-- 01_initial_schema.sql

-- Enable Row Level Security
ALTER TABLE IF EXISTS myths ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS submitted_myths ENABLE ROW LEVEL SECURITY;

-- 1. Myths Table
CREATE TABLE IF NOT EXISTS myths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code char(2) NOT NULL,
  claim text NOT NULL,
  verdict boolean NOT NULL, -- true = fact, false = myth
  explanation text NOT NULL,
  source_url text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_myths_country ON myths(country_code);

-- 2. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code char(2) NOT NULL,
  question text NOT NULL,
  options text[] NOT NULL, -- Array of 4 options
  correct_index smallint NOT NULL,
  explanation text,
  difficulty smallint DEFAULT 1,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_country ON quiz_questions(country_code);

-- 3. Submitted Myths Table (for public submissions)
CREATE TABLE IF NOT EXISTS submitted_myths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim text NOT NULL,
  email text,
  country_code char(2),
  status text DEFAULT 'pending', -- pending / approved / rejected
  submitted_at timestamptz DEFAULT now()
);

-- RLS Policies (Allow public read for active myths/quiz, insert for submissions)
CREATE POLICY "Public Read Active Myths" ON myths FOR SELECT USING (active = true);
CREATE POLICY "Public Read Active Quiz" ON quiz_questions FOR SELECT USING (active = true);
CREATE POLICY "Public Insert Submitted Myths" ON submitted_myths FOR INSERT WITH CHECK (true);
