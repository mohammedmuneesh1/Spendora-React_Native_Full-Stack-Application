import { useAuth, useSignUp } from '@clerk/expo'
import { type Href, Link, useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '@/assets/styles/auth.styles'
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from '@/assets/styles/colors'

export default function Page() {
  const { signUp, errors, fetchStatus } = useSignUp()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('')

  const handleSubmit = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (!error) await signUp.verifications.sendEmailCode()
  }

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    })
    if (signUp.status === 'complete') {
      await signUp.finalize({
        // Redirect the user to the home page after signing up
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask)
            return
          }

          const url = decorateUrl('/')
          if (url.startsWith('http')) {
            window.location.href = url
          } else {
            router.push(url as Href)
          }
        },
      })
    } else {
      // Check why the sign-up is not complete
      console.error('Sign-up attempt not complete:', signUp)
    }
  }

  if (signUp.status === 'complete' || isSignedIn) {
    return null
  }

  //================================================ VERIFICATION  PART START ================================================

  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
     <View style={styles.verificationContainer}>
        <Text
        //  style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}
          style={styles.verificationTitle}
         >
          Verify your account
        </Text>
        <TextInput
          style={styles.verificationInput}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9a8478"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS?.expense} />
            <Text 
            style={styles.errorText}>
              {errors.fields.code.message}
            </Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            // fetchStatus === 'fetching' && styles.disabledButton,
            // pressed && styles.bt,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
        <Pressable
          // style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={() => signUp.verifications.sendEmailCode()}
        >
          <Text style={styles.linkText}>I need a new code</Text>
        </Pressable>
      </View>
    )
  }

  //================================================ VERIFICATION  PART END ================================================





  return (
    <View
    //  style={styles.container}
    style={{flex:1, alignItems:'center',
      justifyContent:"center",
      "width":"100%",
      "height":"100%"
    }}
    >
      <View style={styles?.container}>
        <Image 
        source={
          require("../../assets/custom/revenue-i2.png")
        }
        style={styles.illustration}
        />

        <Text
        style={styles?.title}
        >
          Create Account
        </Text>

{/*ERROR CONTAINER HERE IN THE FUTURE START  */}
{/* */}
{/* */}
{/* */}
{/* */}
{/*ERROR CONTAINER HERE IN THE FUTURE END */}

     {errors.fields.emailAddress && (
        <Text style={styles.errorBox}>{errors.fields.emailAddress.message}</Text>
      )}
<TextInput
autoCapitalize='none'
value={emailAddress}
style={[styles?.input, errors.fields.code  && styles.errorInput ]}
placeholder='Enter Email'
placeholderTextColor={"#9A8478"}
onChangeText={(email)=>setEmailAddress(email)}
/>

{errors.fields.password && <Text style={styles.errorBox}>{errors.fields.password.message}</Text>}
<TextInput
autoCapitalize='none'
value={password}
placeholder='Enter Password'
placeholderTextColor={"#9A8478"}
style={[styles?.input, errors.fields.code && styles.errorInput]}
onChangeText={(password)=>setPassword(password)}
/>


<TouchableOpacity 
style={styles.button}
onPress={handleSubmit}>
  <Text style={styles?.buttonText}>Sign Up</Text>
</TouchableOpacity>



<View style={styles?.footerContainer}>
  <Text style={styles?.footerText}>Already have an account?</Text>
  <TouchableOpacity onPress={() => router.push('/sign-in')}>
    <Text style={styles?.linkText}>Sign In</Text>
  </TouchableOpacity>
</View>





       {/* Required for sign-up flows. Clerk's bot sign-up protection is enabled by default */}
       <View nativeID="clerk-captcha" />


      </View>
    </View>
  )
}







  //  <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>Sign up</Text>
  //     <Text style={styles.title}>Email address</Text>
  //     <TextInput
  //       style={styles.input}
  //       autoCapitalize="none"
  //       value={emailAddress}
  //       placeholder="Enter email"
  //       placeholderTextColor="#666666"
  //       onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
  //       keyboardType="email-address"
  //     />
      // {errors.fields.emailAddress && (
      //   <Text style={styles.errorBox}>{errors.fields.emailAddress.message}</Text>
      // )}
  //     <Text style={styles.title}>Password</Text>
  //     <TextInput
  //       style={styles.input}
  //       value={password}
  //       placeholder="Enter password"
  //       placeholderTextColor="#666666"
  //       secureTextEntry={true}
  //       onChangeText={(password) => setPassword(password)}
  //     />
  //     {errors.fields.password && <Text style={styles.errorBox}>{errors.fields.password.message}</Text>}
  //     {/* <Pressable
  //       style={({ pressed }) => [
  //         styles.button,
  //         (!emailAddress || !password || fetchStatus === 'fetching') && styles.buttonDisabled,
  //         pressed && styles.buttonPressed,
  //       ]}
  //       onPress={handleSubmit}
  //       disabled={!emailAddress || !password || fetchStatus === 'fetching'}
  //     >
  //       <Text style={styles.buttonText}>Sign up</Text>
  //     </Pressable> */}
  //     {/* For your debugging purposes. You can just console.log errors, but we put them in the UI for convenience */}
  //     {errors && <Text style={styles.errorBox}>{JSON.stringify(errors, null, 2)}</Text>}

  //     <View
  //     //  style={styles.linkText}
  //      >
  //       <Text>Already have an account? </Text>
  //       <Link href="/sign-in">
  //         <Text style={{ color: '#0a7ea4' }}>Sign in</Text>
  //       </Link>
  //     </View>




//CUSTOM CLERIC STYLE 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 12,
//   },
//   title: {
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#0a7ea4',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonPressed: {
//     opacity: 0.7,
//   },
//   buttonDisabled: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   secondaryButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   secondaryButtonText: {
//     color: '#0a7ea4',
//     fontWeight: '600',
//   },
//   linkContainer: {
//     flexDirection: 'row',
//     gap: 4,
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   error: {
//     color: '#d32f2f',
//     fontSize: 12,
//     marginTop: -8,
//   },
//   debug: {
//     fontSize: 10,
//     opacity: 0.5,
//     marginTop: 8,
//   },
// })