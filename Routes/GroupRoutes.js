import express from 'express'
import {CreateGroup} from '../Controllers/GroupController.js'

const router = express.Router();

router.post('/create' , CreateGroup)


export default router;