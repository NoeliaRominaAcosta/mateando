module.exports = {

    inSession : (req,res,next)=>{
        if(req.session.userLogin){
            res.redirect('/')
        }else{
            next()
        }

    },
    offSession : (req,res,next)=>{
        if(!req.session.userLogin){
            res.redirect('/users/login')
        }else{
            next()
        }

    }

}