const logout = (req, res) => {
    res.cookie('token', '', {maxAge: 1})
    res.redirect('/')

}

module.exports = {
    logout
}