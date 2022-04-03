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

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  return { id: insertId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
  return { id, name, quantity };
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteById,
};
