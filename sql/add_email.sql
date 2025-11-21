ALTER TABLE registrations 
ADD COLUMN email TEXT NOT NULL DEFAULT 'no-email@example.com';

-- Optional: Remove the default constraint for future inserts so it's truly required
ALTER TABLE registrations 
ALTER COLUMN email DROP DEFAULT;

-- 1. Add the missing Email column
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Make 'unit' optional (Nullable)
-- This prevents errors if the frontend passes null for Guests
ALTER TABLE registrations 
ALTER COLUMN unit DROP NOT NULL;

-- 3. Make 'chapter' optional (Nullable)
ALTER TABLE registrations 
ALTER COLUMN chapter DROP NOT NULL;