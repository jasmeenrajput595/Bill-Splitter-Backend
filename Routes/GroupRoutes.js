import express from 'express'
import {CreateGroup} from '../Controllers/GroupController.js'
import {CreateExpense} from '../Controllers/ExpenseController.js'

const router = express.Router();

router.post('/createGroup' , CreateGroup)
router.post('/createExpense' , CreateExpense)


export default router;