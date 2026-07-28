import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
      groupName:{
        type:String,
        required: true
      },
      members:{
        type: String,
        required: true
      },
    })

const users = mongoose.model("Users" ,UserSchema)
export default users;