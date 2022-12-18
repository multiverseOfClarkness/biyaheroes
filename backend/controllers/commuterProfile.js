const path = require('path')

const getCommuterProfile = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'profile.html'))
}

module.exports = {
    getCommuterProfile
}

