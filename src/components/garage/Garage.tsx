// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import CreateCar from "./parameters/CreateCar.tsx";
import UpdateCar from "./parameters/UpdateCar.tsx";
import GenerateCars from "./parameters/GenerateCars.tsx";
import RacePlatform from "./RacePlatform.tsx";
import {useGetCarsQuery} from "../../api/api.ts";
import {useState} from "react";

const Garage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const {data: allData, refetch} = useGetCarsQuery({page: currentPage})
    const [selectedCar, setSelectedCar] = useState(0)
    const data = allData?.data
    const totalCount = allData?.totalCount
    console.log(data)
    console.log(totalCount)

    return (
        <div>
            <div className="flex space-x-20 items-center">
                {/*<Play />*/}
                <CreateCar refetch={refetch}/>
                <UpdateCar refetch={refetch} selectedCar={selectedCar} />
                <GenerateCars refetch={refetch}/>
            </div>
            <RacePlatform
                data={data}
                setSelectedCar={setSelectedCar}
                refetch={refetch}
                totalCount={totalCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default Garage