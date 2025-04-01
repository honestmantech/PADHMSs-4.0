-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO system_settings (id, settings)
VALUES (1, '{
  "theme": "system",
  "primaryColor": "blue",
  "accentColor": "teal",
  "currency": "GHS",
  "dateFormat": "MM/DD/YYYY",
  "timeFormat": "12h",
  "language": "en"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

