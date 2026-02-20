'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function UserDashboardRedirect() {
  useEffect(() => {
    redirect('/dashboard/user')
  }, [])
  
  return null
}
