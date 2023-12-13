import { useParams } from "react-router-dom"
import { CustomerRootModel } from "../../../models/rootModel/UserRootModel"
import './index.css'
import { useState, useEffect } from "react"
import WedgesLoader from "../../../commons/WedgesLoader"
import UserDetails from "./UserPage"
import { BACKEND_TOOLS } from "../../../models/BACKEND_TOOLS"


function CustomerDetails() {
  const {user_id} = useParams()
  const [ root, setRoot ] = useState<CustomerRootModel | null>()
  const API=BACKEND_TOOLS.API_URI+"/root/user/"+user_id
  
  useEffect(() => {
    fetch(API,{
      headers:{
        'Enterprise-Id':BACKEND_TOOLS.ENTERPRISE_ID
      }
    })
    .then(res => res.json())
    .then(data => {
      setRoot(data.root)
    })
  },[])
  
  return (
    <>
    {root?
      <UserDetails root={root}/>
    :
      <WedgesLoader/>}
    </>
  )
}

export default CustomerDetails