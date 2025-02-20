import inventories, { IInventory } from "@/models/inventories"
import transactions, { ITransaction } from "@/models/transactions"
import { IResponse } from "@/types/types"
import { NextRequest, NextResponse } from "next/server"

export default async function insertInventory(
  req: NextRequest
): Promise<NextResponse<IResponse<IInventory[]>>> {
  try {
    const inventory: IInventory[] = await req.json()
    if (inventory.length === 0) {
      return NextResponse.json(
        { message: "No inventory data provided", success: false },
        { status: 400 }
      )
    }
    const createdAt = new Date()
    const insert = inventory.map((inv) => ({
      ...inv,
      createdAt
    }))
    const quantity = insert.reduce((sum, inv) => sum + inv.current_quantity, 0)
    const insertedInventories = await inventories.insertMany(insert)
    if (insertedInventories.insertedCount === 0) {
      throw new Error("Failed to insert inventory data")
    }
    const inserted = Object.values(insertedInventories.insertedIds)
    await transactions.insertOne({
      items: inserted.map((id) => id.toString()) as string[],
      type: "in",
      quantity: quantity,
      createdAt
    } as ITransaction)
    return NextResponse.json(
      { success: true, message: "Success", data: inventory },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    )
  }
}
