-- Create function to update bar item stock
CREATE OR REPLACE FUNCTION update_bar_item_stock(p_item_id UUID, p_quantity INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE bar_items
  SET 
    stock_quantity = stock_quantity + p_quantity,
    updated_at = NOW()
  WHERE id = p_item_id;
END;
$$ LANGUAGE plpgsql;

