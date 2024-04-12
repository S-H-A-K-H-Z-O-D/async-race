// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, {useEffect, useState} from "react";
import Button from "../common/Button.tsx";
import { RacePlatformProps } from "../common/data.ts";
import {
    useCreateWinnerMutation,
    useDriveCarMutation,
    useRemoveCarMutation,
    useRemoveWinnerMutation
} from "../../api/api.ts";
import SvgComponent from "../common/CarSvg.tsx";
import Play from "./parameters/Play.tsx";
import Pagination from "../common/Pagination.tsx";
import finish from "../../assets/finish.jpg"
import WinModal from "../common/WinModal.tsx";

const RacePlatform = ({ data, setSelectedCar, refetch, totalCount, setCurrentPage, currentPage }: RacePlatformProps) => {

    const raceTime = [
        {id: 0, time: 3000},
        {id: 0, time: 4000},
        {id: 0, time: 3000},
        {id: 0, time: 5000},
        {id: 0, time: 2000},
        {id: 0, time: 3000},
        {id: 0, time: 6000}
    ]
    const beforeRaceTime = [
        {id: 0, time: 3000, name: '', color: '', wins: 1},
        {id: 0, time: 4000, name: '', color: '', wins: 1},
        {id: 0, time: 3000, name: '', color: '', wins: 1},
        {id: 0, time: 5000, name: '', color: '', wins: 1},
        {id: 0, time: 2000, name: '', color: '', wins: 1},
        {id: 0, time: 3000, name: '', color: '', wins: 1},
        {id: 0, time: 6000, name: '', color: '', wins: 1}
    ]
    const [removeCarFn] = useRemoveCarMutation()
    const [driveCarFn] = useDriveCarMutation()
    const [createWinnerFn] = useCreateWinnerMutation()
    const [removeWinnerFn] = useRemoveWinnerMutation()
    const [beforeRace, setBeforeRace] = useState(beforeRaceTime)
    const [racingCars, setRacingCars] = useState(raceTime)
    const [isOpen, setIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState('')

    const onClose = () => setIsOpen(false)


    const onRemoveCar = async (id: number) => {
        await removeCarFn(id)
        refetch()
    }

    const onDriveCar = async (i:number) => {

        raceTime[i].id = beforeRace[i].id
        raceTime[i].time = beforeRace[i].time
        setRacingCars(raceTime)
    }

    useEffect(() => {
        if(data){
            console.log(data)
            for(let i=0; i<data.length; i++) {
                driveCarFn({status: 'started', id: data[i].id}).then((res) => {
                    beforeRaceTime[i].id = data[i].id
                    beforeRaceTime[i].name = data[i].name
                    beforeRaceTime[i].color = data[i].color
                    beforeRaceTime[i].time = res.data.distance/res.data.velocity
                })
                driveCarFn({status: 'drive', id: data[i].id})
            }
            setBeforeRace(beforeRaceTime)
        }
    }, [data]);

    const onRace = () => {

        setRacingCars(beforeRace);
        const sortedBeforeRace = beforeRace.slice()
            .sort((a, b) => a.time - b.time);

        sortedBeforeRace.forEach((item, index) => {

            const firstWinner = {
                id: item.id,
                name: item.name,
                color: item.color,
                time: item.time / 1000,
                wins: index + 1
            };

            createWinnerFn(firstWinner);
        });
        setModalInfo(sortedBeforeRace[0])
        setTimeout(() => setIsOpen(true), sortedBeforeRace[beforeRace.length-1].time);
        removeWinnerFn(1)
    };


    const onReset = () => {
        setRacingCars([].fill(7))
    }

    return (
        <div className="mt-6">
            <div className="flex justify-center">
                <Play onRace={onRace} onReset={onReset}/>
            </div>
            {data && data?.map((item: { id: number; color: string; name: string }, i) => {
                return (
                    <div key={item.id} className={`flex items-center space-x-3 relative border-b border-x 
                    overflow-hidden ${i===0 ? 'border-t mt-10' : ''}`}>
                        <div>
                            <Button
                                text={"SELECT"}
                                className="text-[10px] w-20 bg-transparent border-2 px-0 py-[5px]"
                                onClick={() => setSelectedCar(item.id)}
                            />

                            <Button
                                onClick={() => onRemoveCar(item.id)}
                                text={"REMOVE"}
                                className="text-[10px] w-20 py-[5px] px-0 mt-1"
                            />
                        </div>
                        <div className="">
                            <Button text={"A"} className="text-[10px] py-[5px] px-3" onClick={() => onDriveCar(i)}/>
                            <Button text={"B"} className="text-[10px] py-[5px] px-3 mt-1" onClick={onReset}/>
                        </div>
                        <div
                            style={{transitionDuration: `${racingCars[i]?.time}ms`}}
                            className={`transition-all rotate-90 absolute ease-linear z-50 ${racingCars[i]?.id === item.id ? 
                                `left-[91.5%]` : 'transition-none left-[8.5%]'}`}>
                            <SvgComponent color={item.color}/>
                        </div>
                        <div className="pl-28 " style={{color: item.color}}>
                            {item.name}
                        </div>
                        <div className="rotate-90 absolute right-[-20px]">
                            <img src={finish} width={70}/>
                        </div>
                    </div>
                )
            })}
            {/* Pagination controls */}
            <Pagination
                totalCount={totalCount}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
            <WinModal isOpen={isOpen} onClose={onClose} modalInfo={modalInfo}/>
        </div>
    );
};

export default RacePlatform;
