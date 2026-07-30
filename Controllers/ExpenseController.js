import Expense from '../models/ExpenseSchema.js'

export async function CreateExpense(req , res){
    try{
        // console.log(error)
        const {expenseName,description ,amount , groupId ,addedBy , splitBetween} = req.body;
        const expense = new Expense({
            expenseName,
            description,
            amount,
            groupId,
            addedBy,
            splitBetween
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
// all expenses get

export async function GetExpenses(req, res) {
  try {
    const expenses = await Expense.find({
      groupId: req.params.groupId,
    });

    res.status(200).json({
       message : "Expense Created successfully",
        expenses,
    });
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: "Something went wrong",
    error: error.message,
  });
}
}

export async function GetBalance(req, res) {
  try {
    const expenses = await Expense.find({
      groupId: req.params.groupId,
    });

    //  each user balance
    const balance = {};

    // Loop every expense
    expenses.forEach((expense) => {

      // Calculate share
      const share = expense.amount / expense.splitBetween.length;


      if (!balance[expense.addedBy]) {
        balance[expense.addedBy] = 0;
      }

      // amount paid 
      balance[expense.addedBy] += expense.amount;

      // Subtract share from others
      expense.splitBetween.forEach((user) => {

        
        if (!balance[user]) {
          balance[user] = 0;
        }

        balance[user] -= share;
      });

    });

    res.status(200).json({
      message: "Balance calculated successfully",
      balance,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
}



export async function GetSettleUp(req, res) {
  try {
    // Get all expenses 
    const expenses = await Expense.find({
      groupId: req.params.groupId,
    });

    // Store balance 
    const balance = {};

    // Calculate balance
    expenses.forEach((expense) => {
      const share = expense.amount / expense.splitBetween.length;

      // Add amount
      if (!balance[expense.addedBy]) {
        balance[expense.addedBy] = 0;
      }

      balance[expense.addedBy] += expense.amount;

      // minus share
      expense.splitBetween.forEach((user) => {
        if (!balance[user]) {
          balance[user] = 0;
        }

        balance[user] -= share;
      });
    });

    // Prepare result
    const result = [];

    for (let user in balance) {
      if (balance[user] > 0) {
        result.push({
          user: user,
          status: "Receive",
          amount: balance[user],
        });
      } else if (balance[user] < 0) {
        result.push({
          user: user,
          status: "Pay",
          amount: Math.abs(balance[user]),
        });
      } else {
        result.push({
          user: user,
          status: "Settled",
          amount: 0,
        });
      }
    }

    res.status(200).json({
      message: "Settle Up Calculated Successfully",
      result,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}


// // delete the expense
// export async function DeleteExpense(req, res) {
//   try {
//     const expense = await Expense.findByIdAndDelete(req.params.id);

//     if (!expense) {
//       return res.status(404).json({
//         message: "Expense not found",
//       });
//     }

//     res.status(200).json({
//       message: "Expense deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// }