import React, { useContext, useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import AccountNav from './AccountNav'
import AuthContext from '../../store/authCtx'

const Address = () => {
  const authCtx= useContext(AuthContext)
const [userInfo, setUserInfo] = useState({
  firstName: authCtx.firstName,
  lastName: authCtx.lastName,
  photo: authCtx.photo,
  role: authCtx.role,
  email:authCtx.email
})
  return (
    <LayoutComponent>
      <main className='flex justify-center space-x-4'>
      <AccountNav userInfo={userInfo}/>
      <section className='min-w-[900px] bg-slate-300'>
      Address
      </section>
      </main>
    </LayoutComponent>
  )
}

export default Address