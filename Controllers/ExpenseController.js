import Expense from '../models/ExpenseSchema.js'

export async function CreateExpense(req , res){
    try{
        // console.log(error)
        const {description ,amount , groupId ,addedBy} = req.body;
        const expense = new Expense({
            expenseName,
            description,
            amount,
            groupId,
            addedBy
        });
        await expense.save();
        res.status(201).json({
            message : "Expense Created successfully",
            expense
        });
    }catch(error){
        res.status(500).json({
            message: "Expense not created..",
            error
        });
    }

}  