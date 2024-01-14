export type UserModel = {
    _id:string,
    email:string,
    name:string,
    last_name:string,
    profile_pic:string,
    stars:number,
    phone_number:string,
    gender:string ,
    range:'user'|'host'|'admin',
    last_activity:any
}

export type SetUserDataModel = {
    name:string,
    last_name:string,
    email:string,
    password:string,
    gender:string,
    profile_pic?:string,
    phone_number?:string,
}
export type EditableUserDataModel = {
    name:string,
    last_name:string,
    email:string,
    password?:string,
    gender:string,
    profile_pic?:string,
    phone_number:string,
}