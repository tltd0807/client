import React, { useContext, useState } from 'react'
import LayoutComponent from '../../layout/Layout'
import AccountNav from './AccountNav'

import AuthContext from '../../store/authCtx'
import { Button, Descriptions } from 'antd'
import ChangeInfo from './AccountView/ChangeInfo'

const Account = () => {
const authCtx= useContext(AuthContext)
const [userInfo, setUserInfo] = useState({
  firstName: authCtx.firstName,
  lastName: authCtx.lastName,
  photo: authCtx.photo,
  role: authCtx.role,
  email:authCtx.email
})
const [isShowChangeInfo, setIsShowChangeInfo] = useState(false)
  return (
    <LayoutComponent>
      <main className='flex justify-center space-x-4'>
      <AccountNav userInfo={userInfo}/>
      <section className='min-w-[900px] '>
      
      <Descriptions title="Thông tin tài khoản" layout="vertical" bordered column={2} className='text-left'>
      <Descriptions.Item label="Họ">{userInfo.lastName}</Descriptions.Item>
      <Descriptions.Item label="Tên">{userInfo.firstName}</Descriptions.Item>
      <Descriptions.Item label="Email" span={2}>
        {userInfo.email}
      </Descriptions.Item>
  </Descriptions>
  <Button onClick={()=>setIsShowChangeInfo(old=>!old)}>Sửa thông tin</Button>
  {isShowChangeInfo&&<ChangeInfo setUserInfo={setUserInfo} />}
  
      </section>
      </main>
    </LayoutComponent>
  )
}

export default Account