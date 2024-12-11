require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
require('./config/db').connect();

app.use(cors());
app.use(express.json({
    limit: '1024mb'
}));

const routes = require('./routes/index');
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000${port}`)
});
