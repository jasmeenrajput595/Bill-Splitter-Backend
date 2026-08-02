import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
{
   group: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Group",
  required: true,
},
    fromUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    toUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:"completed"
    }
},
{
    timestamps:true
});

export default mongoose.model("Payment",paymentSchema);