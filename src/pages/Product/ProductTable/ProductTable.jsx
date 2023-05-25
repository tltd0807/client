import React, {useState, useEffect, useContext, useRef} from 'react'
import { Button, Image, Input, Modal, Space, Table, Tag } from "antd";
import { SearchOutlined,ExclamationCircleFilled } from '@ant-design/icons';
import { deleteProduct, getAllCategory, getAllProductAdmin,  updateProduct } from '../../../api/productAPI';
import UpdateProductForm from '../ProductForm/UpdateProductForm';
import AuthContext from '../../../store/authCtx';
import Highlighter from 'react-highlight-words';
import ExpendedProductReviewTable from './ExpendedProductReviewTable';
const { confirm } = Modal;
const success = (mes) => {
  Modal.success({
    title:'SUCCESS',
    content: mes,
    closable:true,
  });
};
const error = (mes) => {
  Modal.error({
    title: "ERROR",
    content: mes,
    closable:true,
  });
};
//   Thiếu category trong table
const ProductTable = (props) => {
const authCtx= useContext(AuthContext)
const [data, setData] = useState([])
const [category, setCategory] = useState([])
const [productUpdate, setProductUpdate] = useState()
const [reload, setReload] = useState(false)
const [open, setOpen] = useState(false);
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};
const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};
const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={searchInput}
        placeholder={`Tìm ${dataIndex==="customeId"?'mã sản phẩm':'tên sản phẩm'}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Tìm
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Lọc
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          Đóng
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});
const onCreate = (values) => {
  // cập nhật hình phải cập nhật luôn cả ảnh bìa
// console.log('Received values of form: ', values);

  const formData = new FormData();
   if(values.customeId &&values.customeId!==productUpdate.customeId) formData.append("customeId", values.customeId);

  //  if(values.name &&values.name!==productUpdate.name)formData.append("name", values.name);
   formData.append("name", values.name);

   if(values.description&&values.description!==productUpdate.description)formData.append("description", values.description);

   if(values.price &&values.price!==productUpdate.price)formData.append("price", values.price);

   if(values.discount&&values.discount!==productUpdate.discount)formData.append("discount",values.discount );

   formData.append("color", values.color);

    if(values.gender&&values.gender!==productUpdate.gender)formData.append("gender", values.gender);

    if(typeof values.category!=='object')formData.append("category", values.category);
    if(typeof values.category==='object')formData.append("category", values.category.value);

    formData.append('inventory',JSON.stringify(values.inventory))

    if(values.imageCover&&values.images){
      formData.append("imageCover", values.imageCover.file.originFileObj);

      values.images.fileList.forEach((item)=>{
        formData.append('images',item.originFileObj)
      })
}
  setOpen(false);
// gắn API ở đây
updateProduct(authCtx.token,formData, productUpdate.id).then((res) => {
  setReload(old=>!old)
  success("Cập nhật sản phẩm thành công");
})
.catch((err) => {
  error(err.response.data.message);
  console.log(err.response.data.message);
});
};

useEffect(() => {
  getAllCategory().then(res=>{
    setCategory(res.data.data)
  }).catch(err=>{
    console.log(err)
  })

}, [])
  const categoryOpt=[];
  for(let i=0; i<category.length;i++){
    categoryOpt.push({value:category[i]._id, text:category[i].name })
  }
  const showDeleteConfirm = (product) => {
    return confirm({
      title: `Bạn chắn chắn xóa ${product.name} với mã sản phẩm  ${product.customeId}?`,
      icon: <ExclamationCircleFilled />,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
   deleteProduct(authCtx.token,product.id).then(res=>{
    // console.log(res)
    setReload(old=>!old)
    success("Đã xóa thành công")
   }).catch(err=>{
    console.log(err)
    error(err.response.data.message)
   })

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
const columns = [
  {
    title: "Mã sản phẩm",
    dataIndex: "customeId",
    key: "customeId",
    fixed: "left",
    ...getColumnSearchProps('customeId'),
  },
  Table.EXPAND_COLUMN,
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps('name'),
  },
  {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
      filters:categoryOpt,
      onFilter: (value, record) => record.categoryId.indexOf(value) === 0
    },
  {
    title: "Tồn kho",
    children: [
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Số lượng trong kho",
        dataIndex: "stock",
        width: 100,
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.stock - b.stock,
      },
      {
        title: "Đã bán ",
        dataIndex: "soldAmount",
      }
    ]
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Giảm giá %",
    dataIndex: "discount",
    key: "discount",
  },
  {
    title: "Màu",
    dataIndex: "color",
    key: "color"
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",

      filters: [
      {
        text: 'Nam',
        value: 'male',
      },
      {
        text: 'Nữ',
        value: 'female',
      },
      {
        text: 'Khác',
        value: 'unisex',
      },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
    render: (text) => <p>{`${text==='male'?"Nam":text==='female'?"Nữ":"Khác"}`}</p>,
  },
  {
    title: "Trạng thái",
    dataIndex: "isShow",
    key: "isShow",
      filters: [
      {
        text: 'Đang hiển thị',
        value: true,
      },
      {
        text: 'Đã ẩn',
        value: false,
      },
    ],
    onFilter: (value, record) => record.isShow===value,
    render: (_,record) =>record.isShow?<Tag color="success">Đang hiển thị</Tag>:<Tag color="error">Đã ẩn</Tag>
    
  },
  
  {
    title: "Cập nhật",
    key: "update",
    render: (_, record) => (
      <Space size="middle">
        <Button
      type="primary"
      onClick={() => {
        setOpen(true);
        setProductUpdate(record)
      }}
      className='text-[#48cae4] border border-[#48cae4]'
    >
      Cập nhật thông tin
    </Button>
      </Space>
    ),
  },
  {
    title: "Xóa sản phẩm",
    key: "delete",
    render: (_, record) => (
      <Space size="middle">
        <Button
        danger
        onClick={()=>showDeleteConfirm(record)}
    >
      Xóa sản phẩm
    </Button>
      </Space>
    ),
  }
];
    // key= customeId+ size
    useEffect(() => {
      getAllProductAdmin(authCtx.token).then(res=>{
            // console.log(res.data.data)
            const processedData=[]
            res.data.data.forEach(product => {
                product.inventory.forEach(item=>{
                    processedData.push({
                        key:product.customeId+item.size,
                        id:product._id,
                        customeId:product.customeId,
                        name:product.name,
                        price:product.price,
                        description:product.description,
                        discount:product.discount,
                        color:product.color,
                        size:item.size,
                        stock: item.stock,
                        soldAmount: item.soldAmount,
                        gender:product.gender,
                        category:product.category.name,
                        categoryId: product.category.id,
                        imageCover: product.imageCover,
                        images:product.images,
                        isShow:product.isShow
                    })
                })
            });
            // console.log(processedData)
            setData(processedData)
            
        }).catch(err=>{
            console.log(err)
        })
    
    }, [reload,props.reload])
    
  return (
    <>
    {productUpdate&&<UpdateProductForm
    open={open}
    onCreate={onCreate}
    onCancel={() => {
      setOpen(false);
    }}
    product={productUpdate}
    />}
    
    
    <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    expandable={{
      expandedRowRender: (record) => (
        // Thêm reviews table ở đây được
        <>
          <div
            style={{
              margin: 0
            }}
          >
            <p className='font-bold'>Mô tả: </p>
            {record.description.split('\\n').map((text, index) => <p key={index}>{text}</p>)}
            {/* Hình ở đây */}
            <div className='flex space-x-5'>
              <div>
                <p className='font-bold'>Hình cover: </p>
                <Image
                  width={100}
                  src={record.imageCover} />
              </div>
              <div>
                <p className='font-bold'>Hình chi tiết: </p>
                {record.images.map((image, index) => (<Image
                  key={index}
                  width={100}
                  src={image} />))}
              </div>
            </div>
          </div>
          <p className='font-bold'>Các bình luận về sản phẩm </p>
          <ExpendedProductReviewTable productId={record.id}/>
          </>
      )
    }}
  />
  </>)
}

export default ProductTable