import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/expo';
import { styles } from '@/assets/styles/create.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/assets/styles/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];


const CreateScreen = () => {
    const router = useRouter();
    const {user} = useUser();
    const [formData,setFormData] = useState({
        title:'',
        amount:0,
        type:'expense',
        category:'',
    });
    const [isLoading,setIsLoading] = useState(false);


    const handleCreate = async ()=>{
        if(!formData.title ) return Alert.alert("Error","Please enter transaction title");
        if(!formData.amount) return Alert.alert("Error","Please enter transaction amount");
        if(!formData.category) return Alert.alert("Error","Please select transaction category");
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/transactions`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                ...formData,
                userId:user?.id
            })
        });
        const result = await response.json();
        if(result.success){
            Alert.alert("Success","Transaction created successfully");
            return router.back();
        }
        else{
            return Alert.alert("Error","Failed to create transaction");
        }
        } catch (error) {
            console.error("Error creating transaction:", error instanceof Error ? error.message : error);
            Alert.alert("Error","Failed to create transaction");
        }
        finally{
            setIsLoading(true);
        }
    }


  return (
            <KeyboardAwareScrollView
            style={{flex:1}}
            contentContainerStyle={{flexGrow:1}}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps={"handled"}
            // style={{flex:1, alignItems:'center',
            //   justifyContent:"center",
            //   "width":"100%",
            //   "height":"100%"
            // }}
            >

    <View style={styles.container}>

      {/* HEADER START */}
      <View style={styles.header}>
        <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
        >
          <Ionicons 
          name="arrow-back"
           size={24} color={COLORS.text} 
        />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
          {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>
      {/* HEADER END */}

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* EXPENSE SELECTOR */}
          <TouchableOpacity
            style={[styles.typeButton, formData?.type === "expense" && styles.typeButtonActive]}
            onPress={() => setFormData((val) => ({ ...val, type: "expense" }))}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={formData?.type === "expense" ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, formData?.type === "expense"  && styles.typeButtonTextActive]}>
              Expense
            </Text>
          </TouchableOpacity>

          {/* INCOME SELECTOR */}
          <TouchableOpacity
            style={[styles.typeButton, formData?.type !== "expense"  && styles.typeButtonActive]}
            onPress={() => setFormData((val) => ({ ...val, type: "income" }))}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={formData?.type === "expense" ?COLORS.income : COLORS.white  }
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, formData?.type !== "expense" && styles.typeButtonTextActive]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* AMOUNT CONTAINER */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={String(formData.amount  ?? "")}
            onChangeText={(data) => setFormData((val) => ({ ...val, amount: Number(data) }))}
            keyboardType="numeric"
          />
        </View>

        {/* INPUT CONTAINER */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={formData.title}
            onChangeText={(data) => setFormData((val) => ({ ...val, title: data }))}
          />
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                formData?.category === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => 
                setFormData((val) => ({ ...val, category: category.name }))
              }
            >
              <Ionicons
                name={(category.icon ?? "at-outline") as any}
                size={20}
                color={formData?.category === category.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  formData?.category === category.name && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
            </KeyboardAwareScrollView>

  )
}
export default CreateScreen;