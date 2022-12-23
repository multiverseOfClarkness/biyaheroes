require('dotenv').config()
const connectDB = require('./config/db')
const path = require('path')
const {verifyJWTforCommuters, verifyJWTforAdmin} = require('./middlewares/verifyJWTforCommuters')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
connectDB()

// to serve static files(html, css, images etc.)
app.use(express.static(path.join(__dirname, '../frontend/views')))
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())




app.use('/', require('./routes/indexRoute'))
app.use('/',  require('./routes/commuterRegister'))
app.get('/logout', (req, res) => {
    res.cookie('token', '', {maxAge: 1})
    res.redirect('/')
})

app.use('/admin', require('./routes/adminLogin'))

app.use('/admin', verifyJWTforAdmin, (require('./routes/newAdmin')))



app.use('/commuter',  require('./routes/commuterLogin'))
app.use('/commuter',  verifyJWTforCommuters, require('./routes/commuterDashboard'))
app.use('/commuter',  verifyJWTforCommuters, require('./routes/reportViolation'))
app.use('/commuter',  verifyJWTforCommuters,  require('./routes/reportMissingItem'))
app.use('/commuter',  verifyJWTforCommuters,  require('./routes/getFareCalc'))
app.use('/commuter',  verifyJWTforCommuters,  require('./routes/getReportsHistory'))
app.use('/commuter',  verifyJWTforCommuters,  require('./routes/getCommuterProfile'))


app.use('/', require('./routes/logoutRoute'))

app.get('*', (req, res)=> {
    res.send('Resource not found')
})


app.listen(3000, () =>{
    console.log('Listening to port 3000')
})