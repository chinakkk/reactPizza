import ReactPaginate from "react-paginate";
import React from "react";
import s from './Paginate.module.scss'

const Paginate = ({setPageChosen}) => {
  return (
      <div>
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={(event) => setPageChosen(event.selected)}
            pageRangeDisplayed={5}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
      </div>
  )
}
export default Paginate;