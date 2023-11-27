import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './loadingSlice'
import userSlice from './userSlice'
// import sesiSlice from './sesiSlice'


export default configureStore({
    reducer: {
        loadingGlobal: loadingSlice,
        // toast: toastSlice,
        user: userSlice,
        // voucherUser:voucherUsrerSlice,
        // invoice : invoiceSlice,
        // sesi: sesiSlice
    }
})