import axios from 'axios';
import { useToastErrorDispatch, useToastSuccessDispatch } from '../hooks';
import { variables } from '../variabel';
import { setLoadingGlobal } from '../Redux';

const axiosGet = async ({dispatch, route, config, isToast = false, isToastOnError = true }) => {
    const errorDispatcher = useToastErrorDispatch();
    const successDispatcher = useToastSuccessDispatch();
    const source = axios.CancelToken.source();

    try {
        let response = await axios.get(`${variables.baseApi}${route}`, {
            ...config,
            cancelToken: source.token,
        });
        if(response.data.status == 1){
            if(isToast){
                successDispatcher(dispatch, response.data.message)
            }

            return {
                status: response.data.status,
                status_code: response.data.status_code,
                data: response.data.data,
                message: response.data.message,
                action: response.data.action,
                source
            };
        } else {
            if(isToast || isToastOnError){
                errorDispatcher(dispatch, response.data.message);
            }

            return {
                status: response.data.status,
                status_code: response.data.status_code,
                data: response.data.data,
                message: response.data.message,
                action: response.data.action,
                source
            };
        }
    } catch(err){
        if(err.response?.data){
            return {
                status: err.response.data.status,
                status_code: err.response.data.status_code,
                data: err.response.data.data,
                message: err.response.data.message,
                action: err.response.data.action
            }
        }

        if(isToast || isToastOnError){
            if(err.response?.data){
                errorDispatcher(dispatch, err.response.data.message);
            } else {
                errorDispatcher(dispatch, JSON.stringify(err));
            }
        }
        dispatch(setLoadingGlobal(false))
        console.log(err);
    }
}

export default axiosGet;