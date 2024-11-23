
const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const {adminAuth , userAuth} = require('./middleware/auth-middleware')

const app = express();

const port = process.env.PORT


app.get('/user' ,  userAuth , (req, res) => {
    try {
        res.send('user hava access')
    } catch (error) {
          res.status(500).send(error.message)
    }
})

app.get('/admin', adminAuth, (req, res) => {
    try {
        res.send("admin data access")
    } catch (error) {
        res.status(500).send(error.message) 
    }
})


app.listen(port || 3000, () => console.log(`server listing on port ${port}`)); 