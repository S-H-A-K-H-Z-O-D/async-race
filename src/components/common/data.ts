import * as yup from "yup";
import {Dispatch, SetStateAction} from "react";

export const schema = yup.object({
    name: yup.string().required('Car brand is required')
}).required();

export interface FormInputs {
    name: string;
    color: string;
}

// RacePlatform.tsx
export interface CarData {
    id: number;
    name: string;
    color: string;
    car_name?: string;

    map(element: (item: {id: number; color: string; name: string}) => React.JSX.Element): CarData;
}

export interface RacePlatformProps {
    data: CarData[]
    setSelectedCar: Dispatch<SetStateAction<number>>
    selectedCar: number
    refetch: () => void
    totalCount: number | undefined
    setCurrentPage: Dispatch<SetStateAction<number>>
    currentPage: number
}