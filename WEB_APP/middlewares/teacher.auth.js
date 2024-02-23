const jwt = require('jsonwebtoken');

const config = require('config');

function getCookies(req){
    let cookies= {}
    let header=req.headers['cookie']
    if(header){
    let cookieList =header.split(';').forEach(cookie=>{
        cookie = cookie.split('=');
        cookies[cookie[0].trim()]=cookie[1].trim()
    })}
    return cookies

}


function auth (req,res,next){
    const cookies= getCookies(req)
    const token = cookies.x_teacher_auth_token
    
    
    if (token) {
        try {

            
            req.user=jwt.verify(token, config.get('JWT-secret-key'))
            next()
            return;
        } catch (err) {
            console.log(err)
            req.user=null
            next()
            return;
        }
    }
    req.user=null
    next()
    return


}

exports.auth = auth
exports.getCookies=getCookies
