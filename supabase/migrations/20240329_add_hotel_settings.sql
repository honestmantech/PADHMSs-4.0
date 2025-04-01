-- Create hotel_settings table
CREATE TABLE IF NOT EXISTS hotel_settings (
  id SERIAL PRIMARY KEY,
  hotel_name VARCHAR(255) NOT NULL DEFAULT 'Grand Hotel Ghana',
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  check_in_time VARCHAR(10) DEFAULT '14:00',
  check_out_time VARCHAR(10) DEFAULT '11:00',
  currency VARCHAR(10) DEFAULT 'GHS',
  currency_symbol VARCHAR(5) DEFAULT '₵',
  timezone VARCHAR(50) DEFAULT 'GMT',
  auto_confirm_bookings BOOLEAN DEFAULT false,
  send_email_notifications BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if table is empty
INSERT INTO hotel_settings (id, hotel_name, email, phone, address)
SELECT 1, 'Grand Hotel Ghana', 'info@grandhotelghana.com', '+233 20 123 4567', '123 Main Street, Accra, Ghana'
WHERE NOT EXISTS (SELECT 1 FROM hotel_settings WHERE id = 1);

