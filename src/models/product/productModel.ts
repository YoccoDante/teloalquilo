export type ProductCategory = "habitación" | "mini departamento" | "departamento" | "casa"

export type ProductModel = {
    _id:string,
    title:string,
    category:ProductCategory,
    imgs:string[],
    description:string,
    region:string,
    province:string
    price:number,
    able:boolean
    stars:number
}
