"use client"
import CardContent from "@/components/display/CardContent"
import InventoryData from "./components/InventoryData"
import LimitButton from "@/components/actions/button/LimitButton"
import PaginationButton from "@/components/actions/button/PaginationButton"
import useStock from "@/stores/useStock"

export default function Stock() {
  const { page, limit, setLimit, setPage, totalPages } = useStock()

  return (
    <>
      <CardContent
        title="Inventory"
        actions={
          <>
            <LimitButton current={limit} set={setLimit} />
            <PaginationButton
              page={page}
              set={setPage}
              totalPage={totalPages}
            />
            <a href="/pos/stock/input" className="btn">
              <i className="bx bx-message-square-add"></i>
            </a>
          </>
        }
      >
        <InventoryData />
      </CardContent>
    </>
  )
}
