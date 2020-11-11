import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/dbModel.js';
import { gradesRouter } from './routes/router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://nordiws-grades-app.herokuapp.com/',
  })
);
app.use('/', gradesRouter);

app.get('/', (_req, res) => {
  res.send('API em execucao acceso aos endpoints pelo endereço /grades');
});

app.listen(process.env.PORT, () => console.log('API Started'));

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();
