import{ createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi =createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints:builder => ({
        getAllProducts: builder.query({
            query: () => "products"
        })
    })
})
//getAllProducts will be used to create a custom hooks automatically
export const {useGetAllProductsQuery } = productsApi

//you can see here usesGetALlProductsQuery is a custom hook created automatically by getAllProducts
