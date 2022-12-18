require('dotenv').config()
const connectDB = require('./config/db')
const path = require('path')
const {verifyJWT} = require('./middlewares/verifyJWT')
const express = require('express')
const app = express()
connectDB()

// to serve static files(html, css, images etc.)
app.use(express.static(path.join(__dirname, '../frontend/views')))
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: true}))


app.use('/', require('./routes/indexRoute'))
app.use('/admin', require('./routes/adminLogin'))
app.use('/',  require('./routes/register'))
app.use('/admin', verifyJWT, (require('./routes/newAdmin')))

app.use('/commuter', require('./routes/commuterLogin'))
app.use('/commuter', require('./routes/commuterLogin'))

app.use('/', require('./routes/logoutRoute'))

app.get('*', (req, res)=> {
    res.send('Resource not found')
})


app.listen(3000, () =>{
    console.log('Listening to port 3000')
})