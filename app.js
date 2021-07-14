const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const routes = require('./routes/index')
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/err');
const corsOption = require('./middlewares/corsOption');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
require('dotenv').config();

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb'} = process.env;
const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors(corsOption));

// удалить после ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes)
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
})
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
