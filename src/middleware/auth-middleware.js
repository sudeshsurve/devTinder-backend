
const  adminAuth = (req, res, next) => {
    const token = req['headers'].authorization
    if(!token) return res.status(401).json({ error: 'unauthorized' })
    const isAdmiinAuthrized = token.split(' ')[1] ==  process.env.ACCESS_TOKEN 
    if (!isAdmiinAuthrized) res.status(401).json({ error: 'unauthorized' })
    else next()
}
    

const  userAuth = (req, res, next) => {
    const token = req['headers'].authorization
    if(!token) return res.status(401).json({ error: 'unauthorized' })
    const isAdmiinAuthrized = token.split(' ')[1] == process.env.ACCESS_TOKEN 
    if (!isAdmiinAuthrized) res.status(401).json({ error: 'unauthorized' })
    else next()
}


module.exports = {adminAuth , userAuth}