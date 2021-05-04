const jwt=require('jsonwebtoken')
module.exports={
  isAuthenticated:function(req,res,next){
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function(err, decodedToken) {
     console.log(decodedToken)
    if(err) { return res.status(401).json({msg:"not authorized"}); }
    else {
     req.id = decodedToken.id;   // Add to req object
     next();
    }
  }) 
}
}
// const jwt=require('jsonwebtoken')

// module.exports= {
//   isAuthenticated:(req, res, next) => {
//     const token = req.header('x-auth-token');
  
//     // Check for token
//     if (!token)
//       return res.status(401).json({ msg: 'No token, authorization denied' });
  
    
//       // Verify token
//       const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
//       // Add user from payload
//       req.id = decoded.id;
//       next();
// }
// };