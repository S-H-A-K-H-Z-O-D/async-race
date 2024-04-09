import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/",
});

export const carApi = createApi({
    reducerPath: 'carApi',
    baseQuery,
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => `garage`,
        }),
        createCar: builder.mutation({
            query: body => ({
                url: '/garage',
                method: 'POST',
                body
            })
        }),
        updateCar: builder.mutation({
            query: ({body, id}) => ({
                url: `/garage/${id}`,
                method: 'PATCH',
                body
            })
        }),
        removeCar: builder.mutation({
            query: (id) => ({
                url: `/garage/${id}`,
                method: 'DELETE'
            })
        }),
        driveCar: builder.mutation({
            query: ({body, id}) => ({
                url: `/engine/${id}`,
                method: 'PATCH',
                body
            })
        }),
    }),
})

export const {
    useGetCarsQuery,
    useCreateCarMutation,
    useUpdateCarMutation,
    useRemoveCarMutation,
    useDriveCarMutation
} = carApi;