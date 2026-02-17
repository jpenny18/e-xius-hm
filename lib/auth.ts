import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendEmailVerification,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

// Admin email list from environment
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []

export const isAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  accountType: 'personal' | 'corporate',
  referralCode?: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Send email verification
    await sendEmailVerification(user)

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      firstName,
      lastName,
      accountType,
      referralCode: referralCode || null,
      isAdmin: isAdmin(email),
      createdAt: new Date().toISOString(),
      balance: {},
      totalEarned: {},
    })

    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const loginAdmin = async (email: string, password: string) => {
  try {
    // First check if email is in admin list
    if (!isAdmin(email)) {
      return { success: false, error: 'Access denied.' }
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Double check admin status from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (!userDoc.exists() || !userDoc.data()?.isAdmin) {
      await signOut(auth)
      return { success: false, error: 'Access denied. Not an admin account.' }
    }

    return { success: true, user }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() }
    }
    return { success: false, error: 'User not found' }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
