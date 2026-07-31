import express from 'express'
import {CreateGroup,GetGroups} from "../Controllers/GroupController.js";
import { CreateExpense,GetExpenses ,GetBalance, GetSettleUp} from "../Controllers/ExpenseController.js";
import { Login , getLoginDetails} from '../Controllers/LoginController.js';


const router = express.Router();

router.post('/createGroup' , CreateGroup)
router.get("/groups", GetGroups);

router.post('/createExpense' , CreateExpense)
router.get("/expenses/:groupId", GetExpenses);


router.get("/balance/:groupId", GetBalance);
router.get("/settleup/:groupId", GetSettleUp);

router.post("/login", Login)
router.get("/loginDetails", getLoginDetails)

export default router;