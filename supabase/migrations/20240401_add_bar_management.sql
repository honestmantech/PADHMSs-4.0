-- Create bar items table
CREATE TABLE IF NOT EXISTS bar_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  unit VARCHAR(50) NOT NULL,
  description TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bar orders table
CREATE TABLE IF NOT EXISTS bar_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) NOT NULL,
  customer_name VARCHAR(255),
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'UNPAID',
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bar order items table
CREATE TABLE IF NOT EXISTS bar_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES bar_orders(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES bar_items(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bar inventory transactions table
CREATE TABLE IF NOT EXISTS bar_inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES bar_items(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(10, 2),
  total_cost DECIMAL(10, 2),
  reference_id UUID,
  notes TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bar_orders_room_id ON bar_orders(room_id);
CREATE INDEX IF NOT EXISTS idx_bar_orders_booking_id ON bar_orders(booking_id);
CREATE INDEX IF NOT EXISTS idx_bar_orders_user_id ON bar_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_bar_order_items_order_id ON bar_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_bar_order_items_item_id ON bar_order_items(item_id);
CREATE INDEX IF NOT EXISTS idx_bar_inventory_transactions_item_id ON bar_inventory_transactions(item_id);

