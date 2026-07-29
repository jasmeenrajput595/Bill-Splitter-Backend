import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
    expenseName:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    amount:{
        type: String,
        required:true,
    },
    groupId:{
        type: String,
        required:true,
    },
    addedBy:{
        type: String,
        required:true,
    },
})
const Expense = mongoose.model("expenses", ExpenseSchema)
export default Expense;