import { styles } from '@/assets/styles/auth.styles'
import { useSignIn } from '@clerk/expo'
import { type Href,  useFocusEffect,  useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { Image, Pressable,  Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn()
  const router = useRouter();
  
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [code, setCode] = React.useState('');


//   React.useEffect(() => {
//   setEmailAddress('')
//   setPassword('')
//   // Reset the signIn attempt to clear stale errors
//   signIn.create({ identifier: '' }).catch(() => {})
// }, []);





  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    })
    if (error) {
      console.error(JSON.stringify(error, null, 2))
      return
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
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
    } else if (signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust') {
      // Handle second factor or client trust verification
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/client-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === 'email_code',
      )

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode()
      }
    } else {
      // Check why the sign-in is not complete
      console.error('Sign-in attempt not complete:', signIn)
    }
  }

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code })

    if (signIn.status === 'complete') {
      await signIn.finalize({
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
      // Check why the sign-in is not complete
      console.error('Sign-in attempt not complete:', signIn)
    }
  }

  if (signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust') {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 24, fontWeight: 'bold' }]}>
          Verify your account
        </Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#666666"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        {errors.fields.code && <Text style={styles.errorBox}>{errors.fields.code.message}</Text>}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            // fetchStatus === 'fetching' && styles.buttonDisabled,
            // pressed && styles.buttonPressed,
          ]}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>
        <Pressable
          // style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          onPress={() => signIn.mfa.sendEmailCode()}
        >
          <Text style={styles.linkText}>I need a new code</Text>
        </Pressable>
      </View>
    )
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
          <View style={styles?.container}>
            <Image 
            source={
              require("../../assets/custom/revenue-i4.png")
            }
            style={styles.illustration}
            />
    
            <Text
            style={styles?.title}
            >
            Welcome Back
            </Text>

       {errors?.fields?.identifier && (
         <Text style={styles.errorBox}>{errors?.fields?.identifier?.message}</Text>
       )}

    <TextInput
    autoCapitalize='none'
    value={emailAddress}
    style={[styles?.input, errors.fields.code  && styles.errorInput ]}
    placeholder='Enter Email'
    placeholderTextColor={"#9A8478"}
    onChangeText={(email)=>setEmailAddress(email)}
    />
    
    {errors?.fields?.password && <Text style={styles?.errorBox}>{errors.fields.password.message}</Text>}

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
      <Text style={styles?.buttonText}>Sign In</Text>
    </TouchableOpacity>
    
    <View style={styles?.footerContainer}>
      <Text style={styles?.footerText}>Don&apos;t have an account?</Text>
      <TouchableOpacity onPress={() => router.push('/sign-up')}>
        <Text style={styles?.linkText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
          </View>
        </KeyboardAwareScrollView>

  )
}

