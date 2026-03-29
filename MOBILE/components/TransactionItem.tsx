
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createHomeStyles,  } from "../assets/styles/home.styles";
import { formatDate, formatMoney } from "@/assets/styles/utils";
import { useTheme } from "@/context/ThemeContext";

// Map categories to their respective icons
const CATEGORY_ICONS: Record<string, string> = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Other: "ellipsis-horizontal",
};


interface ItemInterface{
    amount:number | string;
    category:string;
    id:number;
    title:string;
    type:"expense" | "income";
    created_at:string; 
}



export const TransactionItem = ({ item, onDelete }:{item:ItemInterface, onDelete: (id: number) => void}) => {
    
//   const isIncome = parseFloat(item.amount) > 0;
//eslint-disable-next-line
  const iconName = CATEGORY_ICONS[item.category as any] || "pricetag-outline";


        const { theme } = useTheme();
      const styles = createHomeStyles(theme);
      



  const handleItemDeletionFn = ()=>{
            Alert.alert("Delete",`Are you sure you want to delete ${item?.title}?`,
                [
                    {text:"Cancel",style:"cancel"},
                    {text:"Yes",style:"destructive",onPress:()=>onDelete(item?.id)}
                ]);

  }

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>

          <Ionicons name={iconName as any} size={22}
           color={item.type === "income" ? theme.income : theme.expense} />
        </View>
        <View style={styles.transactionLeft}>
          <Text 
          style={styles.transactionTitle}>
            {item?.title  ?? "N/A"}
          </Text>
          <Text style={styles.transactionCategory}>
            {item.category}
          </Text>
        </View>
        <View
         style={styles.transactionRight}>
          <Text
            style={[styles.transactionAmount, { color: item?.type === "income" ? theme.income : theme.expense }]}
          >
            {item?.type === "income" ? "+" : "-"}${formatMoney(item?.amount)}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() =>handleItemDeletionFn()}>
        <Ionicons name="trash-outline" size={20} color={theme.expense} />
      </TouchableOpacity>
    </View>
  );
};
