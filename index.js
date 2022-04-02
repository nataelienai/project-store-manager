require('dotenv').config();
const express = require('express');
const ProductRouter = require('./routers/product.router');
const SaleRouter = require('./routers/sale.router');
const ErrorMiddleware = require('./middlewares/error');

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
