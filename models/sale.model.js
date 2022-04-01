const connection = require('./connection');

const serialize = (sale) => ({
  saleId: sale.sale_id,
  productId: sale.product_id,
  date: sale.date,
  quantity: sale.quantity,
});

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, s.date, sp.quantity
      FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id`,
  );
  return sales.map(serialize);
};

module.exports = {
  getAll,
};
