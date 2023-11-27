import axios from 'axios';
import { useToastSuccessDispatch, useToastErrorDispatch } from '../hooks'
import { setLoadingGlobal } from '../Redux';
import { variables } from '../variabel'

const axiosPost = async ({dispatch, route, data, headers, timeout = 5000, isToast = false, isToastOnError = true }) => {
    const errorDispatcher = useToastErrorDispatch();
    const successDispatcher = useToastSuccessDispatch();

    try {
        let response = await axios.post(`${variables.baseApi}${route}`, 
            data,
            { 
                headers, 
                timeout 
            }, 
        );
        
        if(response?.data?.status == 1){
            if(isToast){
                successDispatcher(dispatch, response.data.message)
            }
            return {
                status: response.data.status,
                status_code: response.data.status_code,
                data: response.data.data,
                message: response.data.message,
                action: response.data.action,
            };
        } else {
            if(isToast || isToastOnError){
                errorDispatcher(dispatch, response.data.message);
            }
            console.log(`axiospost ${route}`, response.data)

            return {
                status: response.data.status,
                status_code: response.data.status_code,
                data: response.data.data,
                message: response.data.message,
                action: response.data.action,
            };
        }
    } catch (err){
        if(isToast || isToastOnError){
            if(err.response?.data){
                errorDispatcher(dispatch, err.response.data.message);
            } else {
                errorDispatcher(dispatch, err.message);
                // errorDispatcher(dispatch, 'Gagal memuat data');
            }
        }
        dispatch(setLoadingGlobal(false))
        // console.log('error axiospost', err.message)
        // console.log('error axiospost 2', err.response)
        // console.log('error axiospost 3', err.data)
        if(err.response?.data){
            return {
                status: err.response.data.status,
                status_code: err.response.data.status_code,
                data: err.response.data.data,
                message: err.response.data.message,
                action: err.response.data.action,
            }
        } else {
            return {
                status: 0,
                status_code: null,
                message: err.message
            }
        }

    }
}

export default axiosPost;