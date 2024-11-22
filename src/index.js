
const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });

const app = express();

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
});

app.listen(port || 3000, () => console.log(`server listing on port ${port}`)); 