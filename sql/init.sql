-- Create the table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  gender TEXT NOT NULL,
  category TEXT NOT NULL, -- Student, Alumni, Guest
  chapter TEXT NOT NULL,
  unit TEXT NOT NULL,
  expectations TEXT
);

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (Public Registration)
CREATE POLICY "Enable insert for public" ON registrations
FOR INSERT WITH CHECK (true);

-- Allow only admins to view (Optional: You can view data in Supabase Dashboard)
CREATE POLICY "Enable read for authenticated users only" ON registrations
FOR SELECT TO authenticated USING (true);
