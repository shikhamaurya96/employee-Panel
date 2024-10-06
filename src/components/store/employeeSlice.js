import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id:"" ,
    update:true 
}
const employeeSlice = createSlice({
    name:"employee",
    initialState,
    reducers:{
        setEmployeeId:(state,action)=>{
               state.id = action.payload;
        },
        setUpdateStatus:(state,action)=>{
            state.update = action.payload
        }
    }
})
export const{setEmployeeId,setUpdateStatus} = employeeSlice.actions;
export default employeeSlice.reducer;