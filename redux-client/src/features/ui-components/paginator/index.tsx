import React from "react"
import ReactPaginate from "react-paginate"

function Pagination({ pageCount, onPageChange }: any) {
  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  )
}

export default Pagination
