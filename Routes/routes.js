import express from "express";

import { register, login, getUsers } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createGroup,
  getGroups,
  addMembers
} from "../Controllers/GroupController.js";

import {
  createExpense,
  getExpenses,
  getBalance,
  getSettleUp,
} from "../controllers/expenseController.js";
import { payNow } from "../Controllers/PaymentController.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, getUsers);


router.post("/groups", authMiddleware, createGroup);
router.get("/groups", authMiddleware, getGroups);
router.put("/groups/:groupId/add-member", authMiddleware, addMembers);


router.post("/expenses", authMiddleware, createExpense);
router.get("/expenses/:groupId", authMiddleware, getExpenses);

router.get("/balance/:groupId", authMiddleware, getBalance);


router.get("/settle-up/:groupId", authMiddleware, getSettleUp);

router.post("/payment", authMiddleware, payNow);

export default router;