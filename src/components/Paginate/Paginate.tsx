import ReactPaginate from "react-paginate";
import React, {FC} from "react";
import s from './Paginate.module.scss'

type PaginateProps = {
    setPageChosen: (index: number) => void;
}

const Paginate: FC<PaginateProps> = ({setPageChosen}) => {
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
            />
        </div>
    )
}
export default Paginate;