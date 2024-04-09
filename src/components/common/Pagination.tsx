import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import React, {useEffect, useState} from "react";

const Pagination = ({data, setPaginatedData}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // const paginatedData = data?.slice(startIndex, endIndex);

    useEffect(() => {
        setPaginatedData(data?.slice(startIndex, endIndex))
    }, [startIndex, data]);

    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="flex justify-center items-center space-x-3 mt-5">
            <button className="flex items-center" onClick={handlePreviousPage} disabled={currentPage === 1}>
                <FaAngleLeft/>prev
            </button>
            <div className="bg-blue-500 p-1 rounded">{`Page ${currentPage} of ${totalPages}`}</div>
            <button className="flex items-center" onClick={handleNextPage} disabled={currentPage === totalPages}>
                next<FaAngleRight/>
            </button>
        </div>
    )
}
export default Pagination