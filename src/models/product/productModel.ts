export enum PRODUCT_CATEGORIES {
    HOUSE = 'casa',
    MINI = 'minidepartamento',
    GARAGE = 'garaje',
    APARTMENT = 'departamento',
    DUPLEX = 'duplex',
    ROOM = 'habitación',
    ROOMIE = 'roomie'
}

export const CATEGORIES = ['casa','minidepartamento','garaje','departamento','duplex','habitación','roomie']

export type ProductModel = {
    _id:string,
    title:string,
    category:PRODUCT_CATEGORIES | string,
    imgs:string[],
    description:string,
    region:string,
    province:string
    price:number,
    able:boolean,
    stars:number
}

export type PostProductModel = {
    title:string,
    category:PRODUCT_CATEGORIES,
    imgs:File[],
    description:string,
    region:string,
    province:string
    price:number,
    token:string,
}
