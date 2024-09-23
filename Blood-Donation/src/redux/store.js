import {configureStore} from '@reduxjs/toolkit';
import donorReducer from "./slices/donorSlice";
import organizationReducer from "./slices/organizationSlice";
// import projectSlice from './slice/projectSlice';
// import clientSlice from './slice/clientSlice';

export const store = configureStore({
    reducer: {
       donor: donorReducer,   
       organization: organizationReducer,
    },
}); 