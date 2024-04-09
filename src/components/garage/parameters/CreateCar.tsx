import Button from "../../common/Button.tsx";
import {useCreateCarMutation} from "../../../api/api.ts";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useState} from "react";
import {FormInputs, schema} from "../../common/data.ts";



const CreateCar = ({refetch}) => {

    const [createCarFn] = useCreateCarMutation()
    const [formData, setFormData] = useState({
        name: '',
        color: '#000'
    })

    const {
        setValue,
        clearErrors,
        formState: { errors },
        handleSubmit
    } = useForm<FormInputs>({
        resolver: yupResolver(schema),
        mode: 'all'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setValue(`${name}`, value)
        clearErrors(name);
    }

    const onCreate = async () => {
        await createCarFn(formData)
        setFormData((prevData) => ({
            ...prevData,
            name: ''
        }));
        refetch()
    }
    return (
        <form
            className="flex items-center space-x-2"
            onSubmit={handleSubmit(onCreate)}
        >
            <div >
                <input
                    type="text"
                    name="name"
                    className="bg-blue-200 text-black w-48 px-3 py-1 rounded"
                    placeholder="Type car brand"
                    onChange={handleChange}
                    value={formData.name}
                />
                <p className="text-sm text-red-500">{errors.name?.message}</p>
            </div>
            <input
                name="color"
                className="bg-blue-200 text-black p-0 rounded"
                type="color"
                value={formData.color}
                onChange={handleChange}
            />
            <Button text="Create"/>
        </form>
    )
}
export default CreateCar