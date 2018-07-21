import { LOGIN_SUCCESS } from './actionTypes';
import Axios from '../../node_modules/axios';
import decodedToken from '../helper/decodeToken'

export const loginUserSuccess = () => {
    return ({
        type: 'LOGIN_SUCCESS',
        userdetal
    })
}
export const loginUser = (credentials) => {
return dispatch => Axios.post('https://unilever-track-it.herokuapp.com/api/v1/login', credentials ).then((response)=>{
    if(response==='unauthorize'){
        localStorage.setItem('error', 'unauthorize')   
    }
    localStorage.setItem('token', response.data.auth_token)    
    dispatch(decodedToken(response))
    return true;
})
}
