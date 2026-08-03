import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },

    amount:{
        type:Number,
        required:true
    },

    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
    },

    paidBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    // addMembers:[
    //     {
    //          type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // ],

    splitBetween:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},
{
    timestamps:true
});

export default mongoose.model("Expense",expenseSchema);