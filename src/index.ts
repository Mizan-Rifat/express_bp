import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
