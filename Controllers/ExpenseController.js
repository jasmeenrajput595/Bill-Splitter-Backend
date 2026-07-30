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


// getBalance

export async function GetBalance(req, res) {
  try {
    const expenses = await Expense.find({
      groupId: req.params.groupId,
    });

    const balance = {};

    expenses.forEach((expense) => {

      const totalMembers = expense.splitBetween.length;

      const share = Number((expense.amount / totalMembers).toFixed(2));

      const distributedAmount = share * totalMembers;

      const remainingAmount = Number(
        (expense.amount - distributedAmount).toFixed(2)
      );

      if (!balance[expense.addedBy]) {
        balance[expense.addedBy] = 0;
      }

      balance[expense.addedBy] += expense.amount;

      expense.splitBetween.forEach((user, index) => {

        if (!balance[user]) {
          balance[user] = 0;
        }

        let userShare = share;

        if (index === totalMembers - 1) {
          userShare += remainingAmount;
        }

        balance[user] -= userShare;
      });

    });

    for (let user in balance) {
      balance[user] = Number(balance[user].toFixed(2));
    }

    res.status(200).json({
      message: "Balance Calculated Successfully",
      balance,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}



// settleUp

export async function GetSettleUp(req, res) {
  try {
    const expenses = await Expense.find({
      groupId: req.params.groupId,
    });

    const balance = {};

    expenses.forEach((expense) => {

      const totalMembers = expense.splitBetween.length;

      const share = Number(
        (expense.amount / totalMembers).toFixed(2)
      );

      const distributedAmount = share * totalMembers;

      const remainingAmount = Number(
        (expense.amount - distributedAmount).toFixed(2)
      );

      if (!balance[expense.addedBy]) {
        balance[expense.addedBy] = 0;
      }

      balance[expense.addedBy] += expense.amount;

      expense.splitBetween.forEach((user, index) => {

        if (!balance[user]) {
          balance[user] = 0;
        }

        let userShare = share;

        if (index === totalMembers - 1) {
          userShare += remainingAmount;
        }

        balance[user] -= userShare;
      });

    });

    for (let user in balance) {
      balance[user] = Number(balance[user].toFixed(2));
    }

    const transactions = [];

    while (true) {

      let debtor = null;
      let creditor = null;

      for (let user in balance) {
        if (balance[user] < 0) {
          if (
            debtor === null ||
            balance[user] < balance[debtor]
          ) {
            debtor = user;
          }
        }
      }

      for (let user in balance) {
        if (balance[user] > 0) {
          if (
            creditor === null ||
            balance[user] > balance[creditor]
          ) {
            creditor = user;
          }
        }
      }

      if (debtor === null || creditor === null) {
        break;
      }

      const amount = Math.min(
        Math.abs(balance[debtor]),
        balance[creditor]
      );

      transactions.push({
        from: debtor,
        to: creditor,
        amount: Number(amount.toFixed(2)),
      });

      balance[debtor] += amount;
      balance[creditor] -= amount;

      balance[debtor] = Number(balance[debtor].toFixed(2));
      balance[creditor] = Number(balance[creditor].toFixed(2));
    }

    res.status(200).json({
      message: "Settle Up Generated Successfully",
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}














// export async function GetSettleUp(req, res) {
//   try {
//     const expenses = await Expense.find({
//       groupId: req.params.groupId,
//     });

//     const balance = {};

//     expenses.forEach((expense) => {
//       const share = expense.amount / expense.splitBetween.length;

//       if (!balance[expense.addedBy]) {
//         balance[expense.addedBy] = 0;
//       }

//       balance[expense.addedBy] += expense.amount;

//       expense.splitBetween.forEach((user) => {
//         if (!balance[user]) {
//           balance[user] = 0;
//         }

//         balance[user] -= share;
//       });
//     });

//     const result = [];

//     for (let user in balance) {
//       if (balance[user] > 0) {
//         result.push({
//           user: user,
//           status: "Receive",
//           amount: balance[user],
//         });
//       } else if (balance[user] < 0) {
//         result.push({
//           user: user,
//           status: "Pay",
//           amount: Math.abs(balance[user]),
//         });
//       } else {
//         result.push({
//           user: user,
//           status: "Settled",
//           amount: 0,
//         });
//       }
//     }

//     res.status(200).json({
//       message: "Settle Up Calculated Successfully",
//       result,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// }
