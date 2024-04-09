import * as yup from "yup";

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
    setSelectedCar: (id:number) => number
    selectedCar: number
    refetch: () => void
}