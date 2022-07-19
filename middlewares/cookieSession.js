const cookieSession = (req, res, next) => {
    if(req.cookies.mateando){
        req.session.userLogin = req.cookies.mateando;
        res.locals.userLogin = req.session.userLogin;
    }
    next()
}

module.exports = cookieSession