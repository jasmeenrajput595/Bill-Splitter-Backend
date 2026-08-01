import express from 'express'
import {CreateGroup,GetGroups} from "../Controllers/GroupController.js";
import { CreateExpense,GetExpenses ,GetBalance, GetSettleUp} from "../Controllers/ExpenseController.js";
import { Register , GetUsers , Login} from '../Controllers/AuthController.js'


const router = express.Router();

router.post('/createGroup' , CreateGroup)
router.get("/groups/:userId", GetGroups);

router.post('/createExpense' , CreateExpense)
router.get("/expenses/:groupId", GetExpenses);


router.get("/balance/:groupId", GetBalance);
router.get("/settleup/:groupId", GetSettleUp);

router.post("/register", Register)
router.post("/Login", Login)
router.get("/users", GetUsers)

export default router;