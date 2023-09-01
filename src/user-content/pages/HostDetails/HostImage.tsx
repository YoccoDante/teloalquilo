import { UserModel } from '../../../models/user/userModel'
import './index.css'

function CustomerImage( {customer}:{customer:UserModel} ) {
  return (
    <div className='CustomerPageImage'>
        <p>{customer.full_name}</p>
        <img src={customer.profile_pic}/>
    </div>
  )
}

export default CustomerImage