const calculateSettlement = (balance) => {
  const debtors = [];
  const creditors = [];
  const settlements = [];

  // Separate debtors & creditors
  Object.entries(balance).forEach(([userId, amount]) => {
    if (amount > 0) {
      creditors.push({ userId, amount });
    } else if (amount < 0) {
      debtors.push({ userId, amount: Math.abs(amount) });
    }
  });

  // Match payments
  while (debtors.length && creditors.length) {
    const debtor = debtors[0];
    const creditor = creditors[0];

    const payAmount = Math.min(debtor.amount, creditor.amount);

    settlements.push({
      from: debtor.userId,
      to: creditor.userId,
      amount: Number(payAmount.toFixed(2)),
    });

    debtor.amount -= payAmount;
    creditor.amount -= payAmount;

    if (debtor.amount === 0) debtors.shift();
    if (creditor.amount === 0) creditors.shift();
  }

  return settlements;
};

export default calculateSettlement;