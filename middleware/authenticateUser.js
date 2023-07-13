const {userModel} =  require("../models/user")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const authenticateUser = async(req,res,next) => {

    try {
        const token = req.headers.authorization

        const decodedToken = jwt.verify(token,process.env.secret)

         const {userId} = decodedToken;

         const user =  await UserModel.findOne({_id : userId})
        next();
    }catch(err){
        console.log(err)
        return res.status(401).json({message : "Unauthorised to go further" ,err : err.message})
    }
}

module.exports= { authenticateUser }