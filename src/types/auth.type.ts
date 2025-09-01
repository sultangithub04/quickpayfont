export interface ISendOtp {
    email:string
}

export interface ICashDUser {
    phone:string
    amount:number
}
export interface IVerifyOtp {
    email:string
    otp:string
}
export interface ILogin {
    email:string
    password:string
}
export interface ISendMoney {
    phone:string
    amount:number
}
export interface IStatus {
    status:string
    agentId: string
}