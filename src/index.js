
const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const {adminAuth , userAuth} = require('./middleware/auth-middleware')

const app = express();

const port = process.env.PORT

app.use('/admin', adminAuth);

app.get('/user' ,  userAuth , (req, res) => {
   res.send('user hava access')
})

app.get('/admin/getdata', (req, res) => {
    res.send("admin data access")
})

app.get('/admin/getdata', (req, res) => {
    res.send("admin data access")
})

app.listen(port || 3000, () => console.log(`server listing on port ${port}`)); 