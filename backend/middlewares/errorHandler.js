const errorHandler = (err, req, res, next) => {
    return res.status(code).send(`An account with that email already exists.`);
}


//handle email or username duplicates
const handleDuplicateKeyError = (err, res) => {   
    const field = Object.keys(err.keyValue);   
    const code = 409;
    return res.status(code).send(`An account with that ${field} already exists.`);}


module.exports = {
    errorHandler
}