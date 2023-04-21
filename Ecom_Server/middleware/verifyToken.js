const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token= authHeader.split(" ")[1];
      jwt.verify(token, process.env.MY_SECRETE_KEY, (err, decode)=>{
        if(err){
          res.status(401);
          throw new Error("User is not Authorized")
        }
        req.user = decode.user;
        next()
      });

      if(!token){
        res.status(401);
        throw new Error("User is not Authorized ot token is missing")
      }
    }
  };

module.exports = validateToken

