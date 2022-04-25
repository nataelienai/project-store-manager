require('dotenv').config();
const express = require('express');
const ProductRouter = require('./src/routers/product.router');
const SaleRouter = require('./src/routers/sale.router');
const ErrorMiddleware = require('./src/middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductRouter);

app.use('/sales', SaleRouter);

app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
