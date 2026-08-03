const calculateBalance = (expenses, payments = []) => {
  const balance = {};

  expenses.forEach((expense) => {
    const paidBy = expense.paidBy.toString();

    if (!balance[paidBy]) balance[paidBy] = 0;

    balance[paidBy] += expense.amount;

    const totalMembers = expense.splitBetween.length;

const share = Math.floor((expense.amount / totalMembers) * 100) / 100;

const totalShared = share * totalMembers;

const remaining = Number((expense.amount - totalShared).toFixed(2));

expense.splitBetween.forEach((member, index) => {
  const memberId = member.toString();

  if (!balance[memberId]) balance[memberId] = 0;

  if (index === totalMembers - 1) {
    balance[memberId] -= share + remaining;
  } else {
    balance[memberId] -= share;
  }
});
  });


  payments.forEach((payment) => {
    const fromUser = payment.fromUser.toString();
    const toUser = payment.toUser.toString();

    if (!balance[fromUser]) balance[fromUser] = 0;
    if (!balance[toUser]) balance[toUser] = 0;

    balance[fromUser] += payment.amount;
    balance[toUser] -= payment.amount;
  });

  return balance;
};

export default calculateBalance;
















// const calculateBalance = (expenses) => {
//   const balance = {};

//   expenses.forEach((expense) => {
//     const totalMembers = expense.splitBetween.length;
//     const share = expense.amount / totalMembers;

//     // Person paid
//     if (!balance[expense.paidBy]) {
//       balance[expense.paidBy] = 0;
//     }

//     balance[expense.paidBy] += expense.amount;

//     // Members owe
//     expense.splitBetween.forEach((member) => {
//       if (!balance[member]) {
//         balance[member] = 0;
//       }

//       balance[member] -= share;
//     });
//   });

//   return balance;
// };

// export default calculateBalance;

