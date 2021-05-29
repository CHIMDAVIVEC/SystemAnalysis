const express = require('express');
const cors = require('cors');

const app = express();

const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const problemRoute = require('./routes/problem');
const connectDB = require('./config/db');

// cors({credentials: true, origin: true})
dotenv.config();

app.use(morgan('tiny'));
app.use(cors());
connectDB();

const port = process.env.PORT;
const hostname = process.env.HOST;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/problem', problemRoute);
// eslint-disable-next-line no-console
module.exports = app.listen(port, hostname, () =>
  console.log('Server up and running')
);
