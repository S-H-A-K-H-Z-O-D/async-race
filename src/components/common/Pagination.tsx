// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import React from "react";

const Pagination = ({totalCount, currentPage, setCurrentPage, limit=7}) => {


    const totalPages = Math.ceil(totalCount / limit);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="flex justify-center items-center space-x-3 mt-5">
            <button className={`flex items-center ${currentPage === 1 && 'text-neutral-400'}`} onClick={handlePreviousPage} disabled={currentPage === 1}>
                <FaAngleLeft/>prev
            </button>
            <div className="bg-blue-500 p-1 rounded px-5"> {`Page ${currentPage} of ${totalPages}`}</div>
            <button className={`flex items-center ${currentPage === totalPages && 'text-neutral-400'}`} onClick={handleNextPage} disabled={currentPage === totalPages}>
                next<FaAngleRight/>
            </button>
        </div>
    )
}
export default Pagination