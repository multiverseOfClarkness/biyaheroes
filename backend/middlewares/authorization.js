const isAdmin = (req, res, next) => {
    try {
        if(res.locals.B.role === 'admin' || res.locals.B.role === 'Super Admin' ){
            next()
        }else{
            
            res.send('Access denied.')
            
        }
    } catch (error) {
        res.render('illegal-route-accessing')
    }
    
}

const isCommuter = (req, res, next) => {
    try {
        if(res.locals.A.role === 'commuter'){
            next()
        }else{
            
            res.send('Access denied.')
        }
    } catch (error) {
        res.render('illegal-route-accessing')
    }
    
}
const isSuper = (req, res, next) => {
    try {
        if(res.locals.B.role === 'Super Admin'){
            next()
        }else{
            res.send('Access denied.')
        }
    } catch (error) {
        res.render('illegal-route-accessing')
    }
    
}
module.exports = {
    isAdmin,
    isCommuter,
    isSuper
}