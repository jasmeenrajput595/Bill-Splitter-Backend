import Payment from "../models/Payment.js";

export const payNow = async (req, res) => {
  try {
    const { group, toUser, amount } = req.body;

    if (!group || !toUser || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const payment = await Payment.create({
      group,
      fromUser: req.user._id,
      toUser,
      amount,
    });

    res.status(201).json({
      success: true,
      message: "Payment successful",
      payment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};