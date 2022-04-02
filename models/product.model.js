const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  if (products.length === 0) return null;
  return products[0];
};

const getByName = async (name) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  if (products.length === 0) return null;
  return products[0];
};

module.exports = {
  getAll,
  getById,
  getByName,
};
