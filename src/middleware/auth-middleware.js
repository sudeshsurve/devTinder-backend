const jwt = require('jsonwebtoken')
const adminAuth = (req, res, next) => {
    const token = req['headers'].authorization
    if (!token) return res.status(401).json({ error: 'unauthorized' })
    const isAdmiinAuthrized = token.split(' ')[1] == process.env.ACCESS_TOKEN
    if (!isAdmiinAuthrized) res.status(401).json({ error: 'unauthorized' })
    else next()
}


const userAuth = async (req, res, next) => {
    try {
        const token = req['headers'].authorization
        if (!token) return res.status(401).json({ error: 'unauthorized' })
        jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.json(err)
            } else {
                next()
            }
        })
    } catch (error) {
        console.log(error);
        res.send('someting went wrong')
    }

}


module.exports = { adminAuth, userAuth }