require('dotenv').config()
const connectDB = require('./config/db')
const path = require('path')
const {verifyJWT} = require('./middlewares/verifyJWT')
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
app.use('/admin', require('./routes/adminLogin'))

app.use('/admin', verifyJWT, (require('./routes/newAdmin')))



app.use('/commuter', require('./routes/commuterLogin'))
app.use('/commuter', require('./routes/commuterLogin'))
app.use('/commuter',   require('./routes/reportViolation'))
app.use('/commuter',  verifyJWT,  require('./routes/reportMissingItem'))
app.use('/commuter',  verifyJWT,  require('./routes/getFareCalc'))
app.use('/commuter',  verifyJWT,  require('./routes/getReportsHistory'))
app.use('/commuter',  verifyJWT,  require('./routes/getCommuterProfile'))


app.use('/', require('./routes/logoutRoute'))

app.get('*', (req, res)=> {
    res.send('Resource not found')
})


app.listen(3000, () =>{
    console.log('Listening to port 3000')
})