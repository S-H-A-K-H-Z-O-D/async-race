import React, { useState } from "react";
import Button from "../common/Button.tsx";
import { RacePlatformProps } from "../common/data.ts";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import {useDriveCarMutation, useRemoveCarMutation} from "../../api/api.ts";
import SvgComponent from "../common/CarSvg.tsx";

const RacePlatform = ({ data, setSelectedCar, refetch }: RacePlatformProps) => {

    const [removeCarFn] = useRemoveCarMutation()
    const [driveCarFn] = useDriveCarMutation()
    const [singleStart, setSingleStart] = useState(0)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const onRemoveCar = async (id: number) => {
        await removeCarFn(id)
        refetch()
    }

    const onDriveCar = async (id: number) => {
        setSingleStart(id)
       await driveCarFn({body: {status: 'drive'}, id: id})
        refetch()
    }


    return (
        <div className="mt-10 space-y-3">
            {data && paginatedData.map((item: { id: number; color: string; name: string }) => (
                <div key={item.id} className="flex items-center space-x-4 relative">
                    <div className="">

                        <Button
                            text={"SELECT"}
                            className="text-[10px]"
                            onClick={() => setSelectedCar(item.id)}
                        />

                        <Button
                            onClick={() => onRemoveCar(item.id)}
                            text={"REMOVE"}
                            className="text-[10px]"
                        />
                    </div>
                    <div className="">
                        <Button text={"A"} className="text-[10px]" onClick={() => onDriveCar(item.id)}/>
                        <Button text={"B"} className="text-[10px]" onClick={() => setSingleStart(0)}/>
                    </div>
                    <div className={`transition-all rotate-90 absolute duration-[3000ms] ease-linear ${singleStart == item.id ? 'left-[90%]' : 'transition-none left-[12%]'}`}>
                        <SvgComponent color={item.color}/>
                    </div>
                    <div className="pl-24" style={{color: item.color}}>
                        {item.name}
                    </div>
                </div>
            ))}
            {/* Pagination controls */}
            <div className="flex justify-center items-center space-x-3 mt-5">
                <button className="flex items-center" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <FaAngleLeft/>prev
                </button>
                <div className="bg-blue-500 p-1 rounded">{`Page ${currentPage} of ${totalPages}`}</div>
                <button className="flex items-center" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    next<FaAngleRight/>
                </button>
            </div>
        </div>
    );
};

export default RacePlatform;
