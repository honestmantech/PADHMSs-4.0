-- Create appearance_settings table
CREATE TABLE IF NOT EXISTS appearance_settings (
  id SERIAL PRIMARY KEY,
  theme VARCHAR(20) DEFAULT 'system',
  primary_color VARCHAR(20) DEFAULT 'blue',
  accent_color VARCHAR(20) DEFAULT 'teal',
  border_radius VARCHAR(20) DEFAULT 'medium',
  font_family VARCHAR(50) DEFAULT 'inter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if table is empty
INSERT INTO appearance_settings (id, theme, primary_color, accent_color)
SELECT 1, 'system', 'blue', 'teal'
WHERE NOT EXISTS (SELECT 1 FROM appearance_settings WHERE id = 1);

