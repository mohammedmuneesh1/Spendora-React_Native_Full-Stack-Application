import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles'
import { COLORS } from '@/assets/styles/colors';
import { formatMoney } from '@/assets/styles/utils';


interface BalanceCardInterface{
    summary:{
        total:number;
        income:number;
        expense:number;
    }
}
const BalanceCard:React.FC<BalanceCardInterface> = ({summary}) => {


    console.log('this is the summary',summary);





  return (
    <View style={styles?.balanceCard}>
        <Text style={styles?.balanceTitle}>Total</Text>
        <Text style={styles?.balanceAmount}>
             {formatMoney(summary?.total)}
        </Text>

        

        <View style={styles?.balanceStats}>
        {/* ICOME */}
            <View style={styles?.balanceStatItem}>
                <Text style={styles?.balanceStatLabel}>Income</Text>
                <Text style={[styles?.balanceStatAmount,{color:COLORS?.income}]}>
                    {summary?.income > 0 && "+"}
                    {formatMoney(summary?.income)}
                </Text>
            </View>

            {/* EXPENSE  START */}
            <View style={[styles?.balanceStatItem,styles?.statDivider]}>
                <View style={styles?.balanceStatItem}>
                    <Text style={styles?.balanceStatLabel}>Expense</Text>
                    <Text
                     style={[styles?.balanceStatAmount,{color:COLORS?.expense}]}>
                    {summary?.income > 0 && "-"}
                    {formatMoney(summary?.expense)}
                    </Text>
                </View>
            </View>
            

        </View>

            {/* EXPENSE  END */}
    </View>
  )

}

export default BalanceCard