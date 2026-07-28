import mongoose from 'mongoose'

const GroupSchema = new mongoose.Schema({
      groupName:{
        type:String,
        required: true
      },
      userIds:{
        type: Array,
        required: true
      },
    })

const GroupName = mongoose.model("groupName" ,GroupSchema)
export default GroupName ;