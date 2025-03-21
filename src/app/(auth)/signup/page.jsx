"use client";
import React from 'react'
import AuthWrapper from '@/components/auth/AuthWrapper'
import SignupForm from '@/components/auth/SignupForm'
import imgSrc from '../../../../public/signup.jpg'
import Link from 'next/link'
import GuestRoute from '@/components/GuestRoute'
const signupPage = () => {
  return (
    <GuestRoute>
      <AuthWrapper imgSrc={imgSrc} header="Signup" signup>
        <SignupForm />
        <h2 className="text-center mt-5 text-gray-600">
          Have an account?{" "}
          <Link href="/login"><span className="text-blue-600 hover:underline cursor-pointer">Login</span></Link>
        </h2>
      </AuthWrapper>
    </GuestRoute>
  )
}

export default signupPage