import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000"
});

export const carApi = createApi({
    reducerPath: 'carApi',
    baseQuery,
    endpoints: (builder) => ({
        getCars: builder.query({
            query: ({page}) => `/garage?_page=${page}&_limit=7`,
            transformResponse(baseQueryReturnValue, meta) {
                console.log(baseQueryReturnValue)
                const totalCount = (meta?.response?.headers.get("X-Total-Count"));
                return {
                    totalCount: totalCount ? Number(totalCount) : 0,
                    data: baseQueryReturnValue
                };
            }
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
            query: ({status, id}) => ({
                url: `/engine?id=${id}&status=${status}`,
                method: 'PATCH'
            })
        }),
        getWinners: builder.query({
            query: ({page}) => `/winners?_page=${page}&_limit=10`,
            transformResponse(baseQueryReturnValue, meta) {
                const totalCount = (meta?.response?.headers.get("X-Total-Count"));
                return {
                    totalCount: totalCount ? Number(totalCount) : 0,
                    data: baseQueryReturnValue
                };
            }
        }),
        getSingleWinner: builder.query({
            query: ({id}) => `/winners/${id}`,
        }),
        createWinner: builder.mutation({
            query: body => ({
                url: '/winners',
                method: 'POST',
                body
            })
        }),
        removeWinner: builder.mutation({
            query: (id) => ({
                url: `/winners/${id}`,
                method: 'DELETE'
            })
        }),
    }),
})

export const {
    useGetSingleWinnerQuery,
    useGetCarsQuery,
    useGetWinnersQuery,
    useRemoveWinnerMutation,
    useCreateWinnerMutation,
    useCreateCarMutation,
    useUpdateCarMutation,
    useRemoveCarMutation,
    useDriveCarMutation
} = carApi;