export type OrderModel = {
    id: string
    ref: string
    amount: number
    customer: {
      name: string
    }
    createdAt: number
    status:'pending'|'delivered'|'refunded'
}