import express from 'express';
import MainRouter from './routes/0.index';

const app = express();
app.use(express.json());

app.use('/api', MainRouter);
require('./config/configs');

require('dotenv').config();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server is running on port ${PORT}`);
});
