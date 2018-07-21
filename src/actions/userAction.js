import { LOGIN_SUCCESS } from './actionTypes';
import Axios from '../../node_modules/axios';

export const loginUserSuccess = () => {
    return ({
        type: 'LOGIN_SUCCESS',
        userdetal
    })
}
export const loginUser = (credentials) => {
return dispatch => Axios.post('https://unilever-track-it.herokuapp.com/api/v1/login', credentials ).then((response)=>{
    console.log(response)
})
}
