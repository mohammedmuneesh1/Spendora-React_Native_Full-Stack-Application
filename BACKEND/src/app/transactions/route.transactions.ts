import express from 'express'
import { CREATE_USER_TRANSACTIONS, DELETE_TRANSACTION_BY_ID, GET_ALL_USER_TRANSACTIONS, GET_USER_TRANSACTIONS_SUMMARY } from './controller.transactions';
import tryCatch from '../../middleware/customMiddleware/tryCatch';
import expressValidator from '../../middleware/customMiddleware/expressValidator';
import { createTransactionValidation } from './validations/expressValidations.transaction';

export const router = express.Router();



router.route('/summary').get(tryCatch(GET_USER_TRANSACTIONS_SUMMARY));
router.route("/").post(createTransactionValidation ,expressValidator, tryCatch(CREATE_USER_TRANSACTIONS));
router.route('/all').get(tryCatch(GET_ALL_USER_TRANSACTIONS));
router.route('/:id').get(tryCatch(DELETE_TRANSACTION_BY_ID));




