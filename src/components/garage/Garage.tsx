import Play from "./parameters/Play.tsx";
import CreateCar from "./parameters/CreateCar.tsx";
import UpdateCar from "./parameters/UpdateCar.tsx";
import GenerateCars from "./parameters/GenerateCars.tsx";
import RacePlatform from "./RacePlatform.tsx";
import {useGetCarsQuery} from "../../api/api.ts";
import {useState} from "react";

const Garage = () => {

    const {data, isLoading, refetch} = useGetCarsQuery()
    const [selectedCar, setSelectedCar] = useState(0)

    return (
        <div>
            <div className="flex justify-between items-center">
                <Play />
                <CreateCar refetch={refetch}/>
                <UpdateCar refetch={refetch} selectedCar={selectedCar} />
                <GenerateCars refetch={refetch}/>
            </div>
            <RacePlatform data={data} setSelectedCar={setSelectedCar} refetch={refetch}/>
        </div>
    )
}
export default Garage