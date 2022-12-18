const path = require('path')

const getReportViolationPage = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'report-violation.html'))
}

module.exports = {
    getReportViolationPage
}

