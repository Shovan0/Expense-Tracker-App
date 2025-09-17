import React from "react"
import {useState} from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {styles} from "../../assets/styles/auth.style.js"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../../constants/colors.js"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState("")

const onSignUpPress = async () => {
  if (!isLoaded) return

  try {
    await signUp.create({
      emailAddress,
      password,
    })

    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

    setPendingVerification(true)
  } catch (err) {
    // Clerk returns structured error JSON
    if (err.errors && err.errors.length > 0) {
      setError(err.errors[0].message || "Something went wrong, please try again.")
    } else {
      setError("An unexpected error occurred. Please try again.")
    }
  }
}

const onVerifyPress = async () => {
  if (!isLoaded) return

  try {
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code,
    })

    if (signUpAttempt.status === 'complete') {
      await setActive({ session: signUpAttempt.createdSessionId })
      router.replace('/')
    } else {
      setError("Verification failed. Please try again.")
    }
  } catch (err) {
    if (err.errors && err.errors.length > 0) {
      setError(err.errors[0].message || "Verification error. Please try again.")
    } else {
      setError("An unexpected error occurred during verification.")
    }
  }
}


  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>
        
        {
            error ? (
                <View style={styles.errorBox}>
                    <Ionicons name="alert-circlr" size={20} color={COLORS.expense} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={()=> setError("")}>
                        <Ionicons name="close" size={20} color={COLORS.textLight} />
                    </TouchableOpacity>
                </ View>
            ):null
        }
        <TextInput
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView
    style={{flex:1}}
    contentContainerStyle={{flexGrow:1}}
    enableOnAndroid={true}
    enableAutomaticScroll={true}
    extraScrollHeight={150}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i2.png")} style={styles.illustration}/>

        <Text style={styles.title}>Create Account</Text>

        {
            error ? (
                <View style={styles.errorBox}>
                    <Ionicons name="alert-circlr" size={20} color={COLORS.expense} />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={()=> setError("")}>
                        <Ionicons name="close" size={20} color={COLORS.textLight} />
                    </TouchableOpacity>
                </ View>
            ):null
        }
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}