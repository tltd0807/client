import { Card, Descriptions } from "antd"
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
const AddressItem=({item, className,editAddress,removeAddress})=>{

    return <Card className={`${className}`} 
    actions={[
        <EditOutlined key="edit" onClick={()=>editAddress(item._id)}/>,
        <CloseOutlined key="delete" onClick={()=>removeAddress(item._id)} />,
      ]}
      ><Descriptions column={2}>
    <Descriptions.Item label="Tên người nhận">{item.fullName}</Descriptions.Item>
    <Descriptions.Item label="SĐT">{item.phoneNo}</Descriptions.Item>
    <Descriptions.Item span={2} label="Address">
      {item.address}
    </Descriptions.Item>
  </Descriptions></Card>
  }

  export default AddressItem