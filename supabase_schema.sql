# Supabase SQL Schema Migration for Keycoach

Run this SQL snippet in your Supabase SQL Editor (`https://app.supabase.com/project/_/sql`):

```sql
-- 1. Create table for lesson progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    lesson_id TEXT PRIMARY KEY,
    stars INTEGER NOT NULL DEFAULT 0,
    best_wpm DOUBLE PRECISION NOT NULL DEFAULT 0,
    best_accuracy DOUBLE PRECISION NOT NULL DEFAULT 0,
    completed_at BIGINT
);

-- 2. Create table for SRS state
CREATE TABLE IF NOT EXISTS public.srs_state (
    lang TEXT PRIMARY KEY,
    keys JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 3. Enable Row Level Security (RLS) & allow anonymous access for simple usage
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.srs_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read lesson_progress" ON public.lesson_progress FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update lesson_progress" ON public.lesson_progress FOR ALL USING (true);

CREATE POLICY "Allow public read srs_state" ON public.srs_state FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update srs_state" ON public.srs_state FOR ALL USING (true);
```
