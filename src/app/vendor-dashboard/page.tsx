'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function VendorDashboardRedirect() {
  useEffect(() => {
    redirect('/dashboard/vendor')
  }, [])
  
  return null
}
