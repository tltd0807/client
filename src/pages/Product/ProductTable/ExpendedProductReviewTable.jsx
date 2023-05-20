import React, { useContext, useEffect, useState } from 'react'
import { Switch, Table, notification } from 'antd';
import { approveReview, getAllReviews } from '../../../api/reviewAPI';
import AuthContext from '../../../store/authCtx';

const ExpendedProductReviewTable =  ({productId}) => {
    const authCtx= useContext(AuthContext)
    const [productReviews, setProductReviews] = useState([]);
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(true)
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type,message,description) => {
      api[type]({
        message: message,
        description:description,
      });
    };
  
    useEffect(() => {
        getAllReviews(authCtx.token,productId).then(res=>{
            setProductReviews(res.data.data);
            setLoading(false)
        }).catch(err=>{
          openNotificationWithIcon('error',"Tải đánh giá sản phẩm thất bại",err.response.data.message)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])
    
  
    const data = [];
    productReviews.length>0&&productReviews.sort((a,b)=>a.createdAt>b.createdAt?-1:0).forEach((item, index)=>{
        data.push({
            key: index.toString(),
            _id:item._id,
            createdAt:(new Date(item.createdAt)).toLocaleString('en-GB'),
            lastName:item.user.lastName,
            firstName:item.user.firstName,
            rating:item.rating,
            comment:item.comment,
            isApproved:item.isApproved
        })
    })
    const onSwtichHandler=async (record)=>{
      // console.log(record)
      setLoading(true)
      approveReview(authCtx.token,productId,record._id,!record.isApproved ).then(res=>{
        // console.log(res.data.data);
        setLoading(false)
        setReload(old=>!old)
        openNotificationWithIcon('success',"Phê duyệt đánh giá sản phẩm thành công,","")
      }).catch(err=>{
        console.log(err.response.data.message);
        setLoading(false)
        openNotificationWithIcon('error',"Phê duyệt đánh giá sản phẩm thất bại",err.response.data.message)

      })
    }
    const columns = [
      {
        title: 'Ngày đánh giá',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Họ',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Tên',
        dataIndex: 'firstName',
        key: 'firstName',
      },    
      {
          title: 'Đánh giá',
          dataIndex: 'rating',
          key: 'rating',
      },
      {
          title: 'Bình luận',
          dataIndex: 'comment',
          key: 'comment',
      },
      {
        title: 'Hiển thị',
        key: 'isApproved',
        render: (_, record) => <Switch  checked={record.isApproved} onClick={()=>onSwtichHandler(record)}/>,
      },
    ];
    return<>
    {contextHolder}
    <Table columns={columns} dataSource={data}  loading={loading} bordered/>;
    </>
  };
export default ExpendedProductReviewTable