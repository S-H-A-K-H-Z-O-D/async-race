// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Button from "../../common/Button.tsx";
import {useUpdateCarMutation} from "../../../api/api.ts";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {useState} from "react";
import {FormInputs, schema} from "../../common/data.ts";



const UpdateCar = ({refetch, selectedCar}) => {

    const [createCarFn] = useUpdateCarMutation()
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
        await createCarFn({body:formData, id:selectedCar})
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
                    className="w-48 px-3 py-2 bg-transparent outline-0
                    input-shadow input-focus-shadow rounded"
                    placeholder="Type car brand"
                    onChange={handleChange}
                    value={formData.name}
                />
                {errors.name &&
                    <p className="text-sm text-red-500">{selectedCar === 0 ? `${errors.name?.message} and car should be selected` : errors.name?.message}</p>}
            </div>
            <input
                name="color"
                className="bg-blue-200 text-black p-0 rounded w-7 h-10"
                type="color"
                value={formData.color}
                onChange={handleChange}
            />
            <Button text="UPDATE"/>
        </form>
    )
}
export default UpdateCar