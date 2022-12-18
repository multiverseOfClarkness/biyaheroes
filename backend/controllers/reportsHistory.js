const path = require('path')

const getReportsHistory = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'history.html'))
}

module.exports = {
    getReportsHistory
}

