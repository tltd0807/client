import React, { useContext, useEffect, useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import AccountNav from './AccountNav'
import { getCurrentUser } from '../../api/userAPI'
import AuthContext from '../../store/authCtx'
import { Button, Descriptions } from 'antd'

const Account = () => {
const [email, setEmail] = useState('')
const authCtx= useContext(AuthContext)

  useEffect(() => {
    getCurrentUser(authCtx.token).then(res=>{
      setEmail(res.data.data.email)
    }).catch(err=>{
      console.log(err)
    })
  }, [])
  
  return (
    <LayoutComponent>
      <main className='flex justify-center space-x-4'>
      <AccountNav />
      <section className='min-w-[900px] '>
      
        <Descriptions title="Thông tin tài khoản" layout="vertical" bordered column={2} className='text-left'>
    <Descriptions.Item label="Họ">{authCtx.lastName}</Descriptions.Item>
    <Descriptions.Item label="Tên">{authCtx.firstName}</Descriptions.Item>
    <Descriptions.Item label="Email" span={2}>
      {email}
    </Descriptions.Item>
  </Descriptions>
  <Button>Sửa thông tin</Button>
      </section>
      </main>
    </LayoutComponent>
  )
}

export default Account