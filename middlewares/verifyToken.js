import cookieParser  from "cookie-parser";
import jwt  from "jsonwebtoken";
export function verification (req, res, next) {
//token verification logic 

//1.get token from req(using cookie-parser) 
let signedToken=req.cookies.token;
if(!signedToken){
    return res.status(401).json({
        message:"Unauthorized : no token provided"
    });
}
//2verify token(decode)
let decodeToken = jwt.verify(signedToken,"secret");
console.log("decode token:", decodeToken);
next();

}