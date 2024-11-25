const connectDb = require('./config/database.js')
require('dotenv').config({ path: './.env' });
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { adminAuth, userAuth } = require('./middleware/auth-middleware');
const userModel = require('./model/user.schema.js')
const customeResponse = require('./utils/customeResponse.js')
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
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
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
        const { email, password } = req.body
        const isUserExist = await userModel.findOne({ email: email })
        if (!isUserExist) {
            const encryptPassword = await bcrypt.hash(password, 10);
            req.body.password = encryptPassword
            const userObj = new userModel(req.body)
            const user = await userObj.save()
            res.send(user)
        } else {
            res.send(new customeResponse().errorResponse(false, 'user alrady Exist', isUserExist))
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
        const doc = await userModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
        res.json(new customeResponse({}, 'user is updated successFully').successResponse(true, 'user is updated successFully', doc))
    } catch (error) {
        res.status(400).json(new customeResponse().errorResponse(false, error.message, {}))
    }
})

connectDb().then((res) => {
    console.log('database connection established successfully');
    app.listen(port || 3000, () => console.log(`server listing on port ${port}`));
}).catch((err) => {
    console.log(err);
})
