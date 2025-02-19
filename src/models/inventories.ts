import { db } from "@/libs/database/client"
import { Document, ObjectId } from "mongodb"
import { ISupplier } from "./suppliers"

export interface IInventory extends Document {
  _id: string | ObjectId
  supplier: ObjectId | ISupplier | string
  item_name: string
  current_quantity: number
  minimum_quantity: number
  cost_per_unit: number
  status: string
  createdAt: Date
  updatedAt: Date
}

const inventories = db.collection<IInventory>("inventories")

export default inventories
