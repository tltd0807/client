import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Popover } from 'antd';
import { ShoppingCartOutlined ,UserOutlined  } from '@ant-design/icons';
import AuthContext from '../store/authCtx';
const { Search } = Input;

const HeaderComponent = (props) => {
  const authCtx=useContext( AuthContext);
  const navigate= useNavigate()
const logout=()=>{
  authCtx.logout();
    navigate('/')
}
  const content = authCtx.isLoggedIn?(
    <div>
      <p className='font-bold'>{`${authCtx.firstName||'A'} ${authCtx.lastName||'A'}`}</p>
      <br />
      <ul className='list-disc ml-[10px]' >
        <li><Link to={'/account'}>Tài khoản của tôi</Link> </li>
        <li><Link to={'/account/address'}>Danh sách địa chỉ</Link> </li>
        <li className='hover:cursor-pointer hover:text-[#48cae4]' onClick={logout}>Đăng xuất</li>
      </ul>
    </div>
  ):(<div>
    <p>Chưa có tài khoản ? <Link to={"/signup"}><span className=' font-bold hover:text-[#48cae4]'>Đăng ký ngay</span> </Link>
    <br />
    hoặc <Link to={"/login"}> <span className=' font-bold hover:text-[#48cae4]'>đăng nhập</span></Link>
    </p>
  </div>);
const cartContent=(  
<div>
  <p >cartItem1</p>
  <p>cartItem2</p>
</div>);

  return (
    <header className='flex justify-between px-12 py-5 bg-[#03045e] text-white'>
      <div>
        <Link to={'/'}>
        <span className=" font-bold text-lg w-[120px] h-8 inline-block px-[20px] cursor-pointer hover:text-[#48cae4]">HOPE</span>
        </Link>
        </div>
      <nav className='flex space-x-10 text-[18px]'>
        <div className='hover:text-[#48cae4] hover:cursor-pointer'>Sản phẩm</div>
        <div className='hover:text-[#48cae4] hover:cursor-pointer'>Nam</div>
        <div className='hover:text-[#48cae4] hover:cursor-pointer'>Nữ</div>
        <div className='hover:text-[#48cae4] hover:cursor-pointer'>Giảm giá</div>
      </nav>
      <div className='flex space-x-4'>
        <div>
         <Search placeholder="Tìm kiếm hi vọng cho đôi chân của bạn" loading={false} enterButton  className='w-[350px]'/>
        </div>
        <Popover content={content} title={authCtx.isLoggedIn?"Thông tin tài khoản":""}>
          <div>
            <UserOutlined className='text-white text-[25px] hover:text-[#48cae4] hover:cursor-pointer'/>
          </div>
  </Popover>
  <Popover content={cartContent} title="GIỎ HÀNG">
          <div>
            <ShoppingCartOutlined style={{fontSize: '28px'}}  className='text-white text-[25px] hover:text-[#48cae4] hover:cursor-pointer' />
          </div>
  </Popover>
          <div> 
           
          </div>

      </div>
    </header>
  )
}

export default HeaderComponent