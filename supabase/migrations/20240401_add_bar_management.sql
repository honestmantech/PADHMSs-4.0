-- Create bar inventory table
CREATE TABLE IF NOT EXISTS bar_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 0,
  unit VARCHAR(50) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  reorder_level INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create bar sales table
CREATE TABLE IF NOT EXISTS bar_sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id VARCHAR(50) NOT NULL UNIQUE,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  customer_id UUID REFERENCES customers(id),
  item_count INTEGER NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create bar sales items table
CREATE TABLE IF NOT EXISTS bar_sales_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES bar_sales(id) ON DELETE CASCADE,
  inventory_id UUID NOT NULL REFERENCES bar_inventory(id),
  quantity DECIMAL(10, 2) NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create view for daily sales aggregation
CREATE OR REPLACE VIEW bar_sales_daily AS
SELECT 
  TO_CHAR(transaction_date, 'YYYY-MM-DD') as date,
  COUNT(*) as transactions,
  SUM(item_count) as items_sold,
  SUM(total_amount) as total
FROM bar_sales
GROUP BY TO_CHAR(transaction_date, 'YYYY-MM-DD')
ORDER BY date;

-- Create view for top selling items
CREATE OR REPLACE VIEW bar_top_items AS
SELECT 
  bi.id,
  bi.name,
  bi.category,
  SUM(bsi.quantity) as quantity,
  SUM(bsi.total_price) as revenue
FROM bar_sales_items bsi
JOIN bar_inventory bi ON bsi.inventory_id = bi.id
JOIN bar_sales bs ON bsi.sale_id = bs.id
WHERE bs.transaction_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY bi.id, bi.name, bi.category
ORDER BY quantity DESC;

