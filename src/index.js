const connectDb = require('./config/database.js')
const express = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './.env' });
const { adminAuth, userAuth } = require('./middleware/auth-middleware');
const userModel = require('./model/user.schema.js')
const app = express();
app.use(express.json());


const port = process.env.PORT


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            res.send('user is not exist please signup')
        } else {
            if (user.password != password) {
                res.send('invalid credential')
            } else {
                const token = jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.json({ access_Token: token })
            }
        }
    } catch (error) {
        res.send('someting went wrong')
    }
})

app.get('/getAllUser', userAuth, async (req, res) => {
    try {
        const user = await userModel.find()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/signup', adminAuth, async (req, res) => {
    try {
        const { email } = req.body
        const isUserExist = await userModel.findOne({ email: email })
        if (!isUserExist) {
            const userObj = new userModel(req.body)
            const user = await userObj.save()
            res.send(user)
        } else {
            res.send({ data: isUserExist, msg: 'user alrady Exist' })
        }
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/delete', async (req, res) => {
    try {
        const id = req.body._id
        await userModel.findByIdAndDelete(id)
        res.send('user is deleted successFully')
    } catch (error) {
        res.status(400).send('somethiung went wrong')
    }
})

app.put('/update', userAuth, async (req, res) => {
    try {
        const id = req.body._id
        await userModel.findByIdAndUpdate(id, req.body)
        res.send('user is updated successFully')
    } catch (error) {
        res.status(400).send('somethiung went wrong')
    }
})

connectDb().then((res) => {
    console.log('database connection established successfully');
    app.listen(port || 3000, () => console.log(`server listing on port ${port}`));
}).catch((err) => {
    console.log(err);
})
