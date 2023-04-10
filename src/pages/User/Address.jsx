import React, { useContext, useEffect, useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import AccountNav from './AccountNav'
import AuthContext from '../../store/authCtx'
import { getAllAddress } from '../../api/userAPI'
import AddressItem from './AccountView/AddressItem'


const Address = () => {
  const authCtx= useContext(AuthContext)
const [userInfo, setUserInfo] = useState({
  firstName: authCtx.firstName,
  lastName: authCtx.lastName,
  photo: authCtx.photo,
  role: authCtx.role,
  email:authCtx.email
})
const editAddress=(addressId)=>{
  console.log('editAddress: ',addressId)
}
const removeAddress=(addressId)=>{
  console.log('removeAddress: ',addressId)
}
const [addressArr, setAddressArr] = useState([])
useEffect(() => {
  getAllAddress(authCtx.token).then(res=>{
    setAddressArr(res.data.data)
    console.log(res.data.data)
  })
}, [])

  return (
    <LayoutComponent>
      <main className='flex justify-center space-x-4'>
      <AccountNav userInfo={userInfo}/>
      <section className='min-w-[900px] bg-slate-300'>
      <div className='w-1/2 bg-slate-200 min-h-8 flex flex-col space-y-1'>
{addressArr.length>0&&addressArr.map((item, index)=>(<AddressItem editAddress={editAddress} removeAddress={removeAddress} className='w-[450px]' key={item._id} item={item}/>))}
      </div>
      <div></div>
      </section>
      </main>
    </LayoutComponent>
  )
}

export default Address