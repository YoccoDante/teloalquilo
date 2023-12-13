import { CommentModel } from "../comment/commentModel"
import { UserModel } from "../user/userModel"
import { ProductModel } from "../product/productModel"

export type ProductRootModel = {
    comments:CommentModel[],
    user:UserModel,
    product:ProductModel
  }