export type UserStatus = 'deptor' | 'formal';

export interface UserModel {
    _id:string,
    name:string,
    email:string,
    stars:string,
    status:UserStatus
}
