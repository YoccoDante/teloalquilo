import { CommentModel } from "../comment/commentModel"
import { UserModel } from "../user/userModel"
import { ProductModel } from "../product/productModel"

export type CustomerRootModel = {
    comments:CommentModel[],
    user:UserModel,
    products:ProductModel[]
  }