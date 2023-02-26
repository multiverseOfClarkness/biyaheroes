const path = require('path')

const getCommuterDashboard = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'home.html'))
}

module.exports = {
    getCommuterDashboard
}

