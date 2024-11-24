const connectDb =   require('./config/database.js')
const express = require('express');
require('dotenv').config({ path: './.env' });
const {adminAuth , userAuth} = require('./middleware/auth-middleware');
const userModel = require('./model/user.schema.js')
const app = express();
app.use(express.json());

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


app.post('/createUser' ,async  (req , res)=>{
    try {
        const user = await  userModel.create(req.body)
        res.send(user)  
    } catch (error) {
         res.send(error.message)
    }
})



connectDb().then((res)=>{
    console.log('database connection established successfully');
    app.listen(port || 3000, () => console.log(`server listing on port ${port}`)); 
}).catch((err)=>{
    console.log(err); 
})
