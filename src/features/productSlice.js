import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    items: [],
    status: null,
  
    // setSearchQuery: '',

};
export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    //payload creater function
   async ()=>{
   const response = await axios.get("http://localhost:8000/products")
   return response.data;
    } 
) //asyncthunk acceptes 3 parameteres
const productsSlice = createSlice({
    name: "prducts",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(productsFetch.pending, (state,action) =>{
          state.status = "pending"
        })
        .addCase(
            productsFetch.fulfilled,(state,action) =>{
                state.status = "success"
                state.items = action.payload
    })
    .addCase(
        productsFetch.rejected,(state,action) =>{
            state.status = "rejected";
          });
 },
});
// export const{ setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer // this is how to export reducer while using createSlice


// A slice is a logic containing reducers and actions
