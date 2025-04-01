-- Insert sample bar inventory items
INSERT INTO bar_inventory (name, category, quantity, unit, unit_price, reorder_level)
VALUES
  ('Guinness', 'Beer', 48, 'bottles', 15.00, 10),
  ('Star Beer', 'Beer', 36, 'bottles', 12.00, 10),
  ('Club Beer', 'Beer', 24, 'bottles', 12.00, 10),
  ('Jameson', 'Whiskey', 3, 'bottles', 120.00, 2),
  ('Hennessy VS', 'Cognac', 2, 'bottles', 180.00, 2),
  ('Coca-Cola', 'Soft Drink', 48, 'cans', 5.00, 20),
  ('Sprite', 'Soft Drink', 36, 'cans', 5.00, 20),
  ('Fanta', 'Soft Drink', 24, 'cans', 5.00, 20),
  ('Minute Maid', 'Juice', 12, 'bottles', 8.00, 10),
  ('Alvaro', 'Malt Drink', 24, 'bottles', 7.00, 10);

-- Insert sample customers if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM customers LIMIT 1) THEN
    CREATE TABLE IF NOT EXISTS customers (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO customers (name, email, phone)
    VALUES
      ('John Doe', 'john@example.com', '+233501234567'),
      ('Jane Smith', 'jane@example.com', '+233507654321'),
      ('Kofi Mensah', 'kofi@example.com', '+233241234567');
  END IF;
END $$;

-- Insert sample bar sales
INSERT INTO bar_sales (transaction_id, transaction_date, customer_id, item_count, total_amount, payment_method, status)
VALUES
  ('BAR-001', CURRENT_TIMESTAMP - INTERVAL '1 day', (SELECT id FROM customers ORDER BY RANDOM() LIMIT 1), 3, 45.00, 'Cash', 'completed'),
  ('BAR-002', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL, 2, 24.00, 'Mobile Money', 'completed'),
  ('BAR-003', CURRENT_TIMESTAMP - INTERVAL '3 days', (SELECT id FROM customers ORDER BY RANDOM() LIMIT 1), 5, 75.00, 'Card', 'completed'),
  ('BAR-004', CURRENT_TIMESTAMP - INTERVAL '4 days', NULL, 1, 120.00, 'Room Charge', 'completed'),
  ('BAR-005', CURRENT_TIMESTAMP - INTERVAL '5 days', (SELECT id FROM customers ORDER BY RANDOM() LIMIT 1), 4, 48.00, 'Cash', 'completed'),
  ('BAR-006', CURRENT_TIMESTAMP - INTERVAL '6 days', NULL, 3, 36.00, 'Mobile Money', 'completed'),
  ('BAR-007', CURRENT_TIMESTAMP - INTERVAL '7 days', (SELECT id FROM customers ORDER BY RANDOM() LIMIT 1), 2, 24.00, 'Cash', 'completed');

-- Insert sample bar sales items
DO $$
DECLARE
  sale_id UUID;
  inventory_id UUID;
  quantity DECIMAL;
  unit_price DECIMAL;
  total_price DECIMAL;
BEGIN
  FOR sale_id IN SELECT id FROM bar_sales
  LOOP
    -- For each sale, add 1-3 random items
    FOR i IN 1..floor(random() * 3 + 1)::int
    LOOP
      -- Get a random inventory item
      SELECT id, unit_price INTO inventory_id, unit_price FROM bar_inventory ORDER BY RANDOM() LIMIT 1;
      
      -- Generate a random quantity between 1 and 5
      quantity := floor(random() * 5 + 1);
      
      -- Calculate total price
      total_price := quantity * unit_price;
      
      -- Insert the sales item
      INSERT INTO bar_sales_items (sale_id, inventory_id, quantity, unit_price, total_price)
      VALUES (sale_id, inventory_id, quantity, unit_price, total_price);
    END LOOP;
  END LOOP;
END $$;

