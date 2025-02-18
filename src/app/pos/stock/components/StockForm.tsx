"use client"

import TextField from "@/components/form/input/TextField"

export default function StockForm() {
  return (
    <form>
      <TextField label="Item name"/>
      <TextField label="Minimum quantity" min={0} step={1} type="number"/>
      <TextField label="Cost"  min={0} type="number"/>
      <TextField label="Quantity"/>
    </form>
  )
}
