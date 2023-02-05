const logger = require ('../config/logger')

const reqResLogger = (req, res, next) => {
    let errorMessage = null;
    
   
    

    const { rawHeaders, httpVersion, method, socket, url, body} = req;
    const { remoteAddress, remoteFamily } = socket;
    const data = (
        JSON.stringify({
            timestamp: Date.now(),
            rawHeaders,
            httpVersion,
            body,
            errorMessage,
            method,
            remoteAddress,
            remoteFamily,
            url
        })
      );
      logger.info(JSON.parse(data))
    next();
}

module.exports = {reqResLogger}