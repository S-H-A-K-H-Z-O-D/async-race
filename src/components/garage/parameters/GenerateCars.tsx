import Button from "../../common/Button.tsx";
import {useCreateCarMutation} from "../../../api/api.ts";

const GenerateCars = ({refetch}) => {

    const [generateCarsFn] = useCreateCarMutation()
    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16); // Generates a random hex color
    };

    const generateRandomName = () => {
        const names = [
            'Ali', 'Nexia', 'Tesla', 'BMW', 'Mercedes', 'Ford',
            'Audi', 'Chevrolet', 'Toyota', 'Honda', 'Volkswagen',
            'Lexus', 'Subaru', 'Hyundai', 'Kia', 'Nissan',
            'Mazda', 'Volvo', 'Porsche', 'Jaguar', 'Ferrari',
            'Lamborghini', 'Jeep', 'Land Rover', 'Chrysler', 'Dodge',
            'Buick', 'Cadillac', 'Infiniti', 'Acura', 'Lincoln'
        ];

        return names[Math.floor(Math.random() * names.length)]; // Picks a random name from the array
    };

    const generateCars = () => {
        const cars = [];
        for (let i = 0; i < 100; i++) {
            const car = {

                name: generateRandomName(),
                color: generateRandomColor()
            };
            cars.push(car);
        }
        return cars;
    };

    const onGenerate = () => {
        const cars = generateCars();
        cars.forEach(car => {
            generateCarsFn(car);
        });
        refetch()
    };

    return (
        <div>
            <Button text={"GENERATE CARS"} onClick={onGenerate} type="button"/>
        </div>
    )
}
export default GenerateCars