import mongoose from 'mongoose'

const LoginSchema = new mongoose.Schema({
      userId:{
        type:String,
        required: true
      },
      name:{
        type:String,
        required: true
      },
      email:{
        type:String,
        required: true
      },
      password:{
        type: String,
        required: true
      },
    })

const UserLogin = mongoose.model("login" ,LoginSchema)
export default UserLogin;