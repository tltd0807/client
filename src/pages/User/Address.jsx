import React from 'react'
import LayoutComponent from '../../layout/Layout'
import AccountNav from './AccountNav'

const Address = () => {
  return (
    <LayoutComponent>
      <main className='flex justify-center space-x-4'>
      <AccountNav />
      <section className='min-w-[900px] bg-slate-300'>
      Address
      </section>
      </main>
    </LayoutComponent>
  )
}

export default Address