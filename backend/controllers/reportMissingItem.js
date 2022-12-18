const path = require('path')

const getReportMissingPage = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'report-missing-item.html'))
}

module.exports = {
    getReportMissingPage
}
