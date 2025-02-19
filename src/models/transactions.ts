import { db } from "@/libs/database/client"
import { Document, ObjectId } from "mongodb"

export interface ITransaction extends Document {
  _id: string | ObjectId
  items: string[] | ObjectId[]
  type: "in" | "out"
  quantity: number
  createdAt: Date
  updatedAt: Date
}

const transactions = db.collection<ITransaction>("transactions")

export default transactions
