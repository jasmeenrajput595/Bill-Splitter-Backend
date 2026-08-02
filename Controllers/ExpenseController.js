import Expense from "../models/Expense.js";
import calculateBalance from "../utils/calculateBalance.js";
import Payment from "../models/Payment.js";
import calculateSettlement from "../utils/calculateSettlement.js";

export const createExpense = async (req, res) => {
  try {
    const { title, description, amount, group, splitBetween } = req.body;

    if (!title || !amount || !group || !splitBetween?.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const expense = await Expense.create({
      title,
      description,
      amount,
      group,
      paidBy: req.user._id,
      splitBetween,
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// /getExpenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      group: req.params.groupId,
    })
      .populate("paidBy", "name")
      .populate("splitBetween", "name");

    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//  Getbalance
export const getBalance = async (req, res) => {
  try {
    const expenses = await Expense.find({
      group: req.params.groupId,
    });

    const payments = await Payment.find({
      group: req.params.groupId,
    });

    const balance = calculateBalance(expenses, payments);

    res.status(200).json({
      success: true,
      balance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// settleUp
export const getSettleUp = async (req, res) => {
  try {
    const expenses = await Expense.find({
      group: req.params.groupId,
    });

    const payments = await Payment.find({
      group: req.params.groupId,
    });

    const balance = calculateBalance(expenses, payments);

    const settlements = calculateSettlement(balance);

    res.status(200).json({
      success: true,
      settlements,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};