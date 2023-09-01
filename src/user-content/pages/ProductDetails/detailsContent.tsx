import { ProductRootModel } from "../../../models/rootModel/productRootModel"
import Carousel from "../../../components/Carousel"
import ProfileCard from "../../../components/ProfileCard"
import CommentBox from "../../../components/CommentBox/CommentsList"
import React, { useState } from "react"
import CloseIcon from "../../../components/CloseIcon"

interface DetailsContentProps {
    root :ProductRootModel
}

function DetailsContent( {root}:DetailsContentProps ) {
  
  const [ comment, setComment ] = useState<string>('')
  const handleComment = (event:React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }
  const handleSendComment = () => {
    comment !== ''? alert("send") : alert("no message")
  }
  return (
    <article className="ProductDetail">
        <section className="LeftSide">
          <Carousel imgs={root.product.imgs}/>
        </section>
        <section className="RightSide">
          <div className="Details">
            <p className="Title">{root.product.title}</p>
            <p className="Leyend">Descripción</p>
            <p>{root.product.description}</p>
            <p className="Leyend">Ubicación de la propiedad</p>
            <p className="Ubi">{root.product.province} - {root.product.region}</p>
            <p className="Leyend">Precio: </p>
            <p className="Price">S/.{root.product.price}.00</p>
          </div>
          <ProfileCard _id={root.customer._id} full_name={root.customer.full_name} profile_pic={root.customer.profile_pic} rate={root.customer.stars}/>
          <div className="CommentBoxBox">
            <CommentBox comments={root.comments}/>
          </div>
          <div className="MakeComment">
            <input onChange={handleComment} type="text" className="MakeCommentText"/>
            <button onClick={handleSendComment}>Comentar</button>
          </div>
        </section>
        <CloseIcon route="products"/>
    </article>
  )
}

export default DetailsContent