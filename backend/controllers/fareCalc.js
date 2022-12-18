const path = require('path')

const getFareCalc = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'fare-calc.html'))
}

module.exports = {
    getFareCalc
}