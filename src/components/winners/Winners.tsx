import React, {useState} from 'react';
import Pagination from "../common/Pagination.tsx";
import {useGetSingleWinnerQuery, useGetWinnersQuery} from "../../api/api.ts";
import SvgComponent from "../common/CarSvg.tsx";

const Winners = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const {data: allData, refetch} = useGetWinnersQuery({page: currentPage})
    const {data: singleCar} = useGetSingleWinnerQuery({id: 2})
    const data = allData?.data
    const totalCount = allData?.totalCount
    console.log(singleCar)

    return (
        <>
            <div className="winners text-center text-xl font-bold py-4 bg-blue-500 text-white">Winners in Progress</div>
            <div className="w-full mt-10">
                <table className="table-auto w-full shadow-md rounded-lg">
                    <thead >
                        <tr className="border text-left">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Car</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Wins</th>
                            <th className="px-4 py-2">Best Time (seconds)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && data?.map((item, i) => (
                        <tr>
                            <td className="px-4 py-2">{i+1}</td>
                            <td className="py-10 relative px-4">
                                <div  className="rotate-90 absolute top-1 left-0">
                                    <SvgComponent color={"#fff"}/>
                                </div>
                            </td>
                            <td className=" px-4 py-2">{item.id}</td>
                            <td className=" px-4 py-2">{item.wins}</td>
                            <td className=" px-4 py-2">{item.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalCount}/>
        </>
    );
};

export default Winners;
