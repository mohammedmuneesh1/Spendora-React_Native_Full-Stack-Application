import express from 'express'
import { CREATE_USER_TRANSACTIONS, DELETE_TRANSACTION_BY_ID,  GET_ALL_USER_TRANSACTIONS, GET_USER_TRANSACTIONS_SUMMARY } from './controller.transactions';
import tryCatch from '../../middleware/customMiddleware/tryCatch';
import expressValidator from '../../middleware/customMiddleware/expressValidator';
import { createTransactionValidation } from './validations/expressValidations.transaction';

export const router = express.Router();



router.route("/").post(createTransactionValidation ,expressValidator, tryCatch(CREATE_USER_TRANSACTIONS));
router.route('/summary/:userId').get(tryCatch(GET_USER_TRANSACTIONS_SUMMARY));
router.route('/all/:userId').get(tryCatch(GET_ALL_USER_TRANSACTIONS));
router.route('/:id').delete(tryCatch(DELETE_TRANSACTION_BY_ID));




