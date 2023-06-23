const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const authRoute = require('./routes/authRoute');
const bodyParser = require('body-parser');
const cors = require('cors')


app.use(bodyParser.json())



dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8080;

connectDB();


app.use(cors())
app.use('/auth', authRoute); // Remove (req, res) from the authRoute middleware

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
