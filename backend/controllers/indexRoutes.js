const path = require('path')


const getLoginForm = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'index.html'))
}



module.exports = {
    getLoginForm
}