const connection = require('./connection');

const serialize = (sale) => ({
  saleId: sale.sale_id,
  productId: sale.product_id,
  date: sale.date,
  quantity: sale.quantity,
});

const serializeWithoutSaleId = (sale) => ({
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

const getById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sp.product_id, s.date, sp.quantity
      FROM StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.product_id
      `,
    [id],
  );
  if (sales.length === 0) return null;
  return sales.map(serializeWithoutSaleId);
};

const create = async (saleProducts) => {
  const [{ insertId: saleId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  const insertSaleProduct = ({ productId, quantity }) => (
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    )
  );

  await Promise.all(saleProducts.map(insertSaleProduct));
  return { id: saleId, itemsSold: saleProducts };
};

module.exports = {
  getAll,
  getById,
  create,
};
