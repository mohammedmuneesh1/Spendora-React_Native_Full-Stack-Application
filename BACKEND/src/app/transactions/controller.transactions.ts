import { Request, Response } from "express";
import ResponseHandler from "../../utils/Response-Error-Handler/responseHandler";
import { sql } from "../../configs/dbConnectFn";



export const CREATE_USER_TRANSACTIONS  = async (req:Request, res:Response):Promise<Response> => {
    const {title,amount,category,userId,type} = req.body;
    console.log('body',req.body);
    // const userId = req?.userId;
    if(!userId || typeof userId !== 'string') return ResponseHandler(res,200,false,null,"Invalid user id");
    const transactions =  await sql `INSERT INTO transactions(userd_id,title,amount,category,type)
     VALUES(${userId},${title},${amount},${category},${type}) 
     RETURNING *
     `;
    return ResponseHandler(res,201,true,transactions, "transactions has been registered successfully")
}



export const GET_ALL_USER_TRANSACTIONS_BY_PAGINATION = async (req:Request, res:Response):Promise<Response> => {
    // const userId = req?.userId;

    const {userId} = req.params;
    const page = req.query.page || 1;
    const limit = Number(req.query.limit) && Number(req.query.limit) !== 0 ? Number(req.query.limit) :   10;
    const offset = (Number(page) - 1) * limit;
    if(!userId || typeof userId !== 'string') return ResponseHandler(res,200,false,null,"Invalid user id");
    const transactions =  await sql `SELECT * FROM transactions WHERE userd_id = ${userId} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset} `;
    const totalDoc  = await sql `SELECT COUNT(*) FROM transactions WHERE userd_id = ${userId}`
    const totalPages = Number(totalDoc[0].count) === 0 ? 1 : Math.ceil(Number(totalDoc[0].count) / limit);
    return ResponseHandler(res,200,true,{
        totalPages,
        currentpage: Number(page),
        data:transactions,
        totalDoc:Number(totalDoc[0].count),
    }, "transactions has been registered successfully")
}

export const GET_ALL_USER_TRANSACTIONS = async (req:Request, res:Response):Promise<Response> => {
    // const userId = req?.userId;
    const {userId} = req.params;
    console.log('erquest herre',userId);
    if(!userId || typeof userId !== 'string') return ResponseHandler(res,200,false,null,"Invalid user id");
    const transactions =  await sql `SELECT * FROM transactions WHERE userd_id = ${userId} ORDER BY created_at DESC `;
    
    // const totalDoc  = await sql `SELECT COUNT(*) FROM transactions WHERE userd_id = ${userId}`
    return ResponseHandler(res,200,true,transactions, "transactions has been registered successfully")
}




export const DELETE_TRANSACTION_BY_ID=async(req:Request, res:Response):Promise<Response>=>{
    const id = req.params.id;
    console.log('id',id);
    if(!id || typeof id !== 'string' ) return ResponseHandler(res,200,false,null,"Invalid transaction id");
    const result = await  sql `DELETE FROM transactions WHERE id = ${id}`
    console.log("result",result);
    if(!result) return ResponseHandler(res,200,false,null,"transaction not found");
    return ResponseHandler(res,200,true,result,"transactions has been deleted successfully")
}



export const GET_USER_TRANSACTIONS_SUMMARY = async (req:Request, res:Response):Promise<Response> => {
    const {userId} = req.params;

    if(!userId || typeof userId !== 'string') return ResponseHandler(res,200,false,null,"Invalid user id");
    // const balanceResult = await sql `SELECT SUM(amount) AS balance FROM transactions WHERE userd_id = ${userId}`;
    const balanceResult = await sql `SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE userd_id = ${userId}`; //EXPENSE + INCOME
    const expenseResult = await sql `SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE userd_id = ${userId} AND type = 'expense'`; //EXPENSE
    const incomeResult = await sql `SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE userd_id = ${userId} AND type = 'income'`; //INCOME
    const data = {
        total:balanceResult[0].balance,
        expense:expenseResult[0].expense,
        income:incomeResult[0].income
    };
    return ResponseHandler(res,200,true,data,'transactions summary has been fetched successfully.')
}