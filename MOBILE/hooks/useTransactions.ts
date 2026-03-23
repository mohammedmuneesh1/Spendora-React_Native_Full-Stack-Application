//react custom hook file 

import { useCallback, useState } from "react"
import { Alert } from "react-native";



const API_URL = "http://10.102.157.107:8080";


export const useTransactions = (userId:string) => {
    const [transactions,setTransactions] = useState([]);
    const [summary,setSummary] = useState({
        balance:0,
        income:0,
        expenses:0
    });
    const [isLoading,setIsLoading] = useState(false);

const fetchTransactions = useCallback(async ()=>{
        try {
    const response = await fetch(`${API_URL}/api/transactions/all/${userId}`,{
        method:'GET'
    });
    const data = await response.json();
    setTransactions(data?.data);
} catch (error) {
    console.error("Error fetching transactions:", error);
        }
    },[userId]);
    
const fetchSummary= useCallback(async ()=>{
        try {
    const response = await fetch(`${API_URL}/api/transactions/summary/${userId}`);
    const data = await response.json();
    setSummary(data?.data);
} catch (error) {
    console.error("Error fetching transactions:", error);
        }
    },[userId]);



const loadData = useCallback(
    async()=>{
    if(!userId) return;
    setIsLoading(true);
        try {

            await Promise.all([
                fetchTransactions(),
                fetchSummary()
            ]);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
        finally{
            setIsLoading(false);
        }
    },[userId,fetchTransactions,fetchSummary]); 

//⚠️⚠️⚠️====================== Why add fetchTransactions and fetchSummary to dependencies?======================⚠️⚠️⚠️

// Because of closures. This is where React stops being friendly and starts being a programming language.

// The real reason:
// useCallback basically says:
// Only recreate this function if dependencies change.
// Your loadData function uses:

// userId
// fetchTransactions
// fetchSummary
//So React must recreate loadData if any of those change. Otherwise loadData will keep using old versions of those functions.




const deleteTransactions = async (id:string)=>{
    try {
        const response = await fetch(`${API_URL}/api/transactions/${id}`,{
            method:"DELETE"
        });
        if(!response.ok) throw new Error("Failed to delete transaction");
        loadData();
        Alert.alert("Success","Transaction has been deleted successfully");
    } catch (error) {
        console.error("Error deleting transaction:", error);
        Alert.alert("Error","Failed to delete transaction");
    }
}

return {
    transactions,
    summary,
    isLoading,
    deleteTransactions,
    loadData
}

}

