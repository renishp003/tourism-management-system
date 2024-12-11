import axios from "axios";
import Swal from "sweetalert2";
import {  ADD_USER, DELETE_USER_FAILURE, DELETE_USER_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, LOGIN } from "../actionType/actionType";

const addus = () => ({
    type: ADD_USER
})

const login =()=>({
    type:LOGIN
})

export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
});

export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
});

export const addUSer =(data,navigate)=>{
   return(dispatch)=>{
    axios.post("http://localhost:3000/api/user/addUser",data).then((res)=>{
        dispatch(addus())
        // dispatch(getManagers())
        if(res.data.isSuccess === true){
            Swal.fire({
                position: 'center',
                    icon: 'success',
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
            })
            navigate('/login')
        }else{
            Swal.fire({
                n: 'error',
                title: 'Oops...',
                text: res.data.message,
                timer : 2500
            })
        }
    }).catch((err)=>{
console.log(err)
    })
   }
}


export const loginUserr =(data,navigate)=>{
    return(dispatch)=>{
     axios.post("http://localhost:3000/api/user/loginUser",data).then((res)=>{
         dispatch(login())
         // dispatch(getManagers())
         
         let token = res.data.token
         let role = res.data.role
         localStorage.setItem('token',token)
         localStorage.setItem('role',role)
         console.log(token)
         if(res.data.isSuccess === true){
             Swal.fire({
                 position: 'center',
                     icon: 'success',
                     title: res.data.message,
                     showConfirmButton: false,
                     timer: 2500
             })
             if(res.data.role==="admin"){
                navigate('/main/manageUser')
             }else{
                navigate('/');
             }
             
         }else{
            
             Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
                 text: res.data.message,
                 timer : 2500
             })
         }
     }).catch((err)=>{
 console.log(err)
     })
    }
 }

 export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('http://localhost:3000/api/user/getUsers'); 
        const users = response.data.data;
   console.log("huui",users)
        dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    // dispatch({ type: DELETE_USER_REQUEST });
    try {
        await axios.delete(`http://localhost:3000/api/user/deleteUser/${userId}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
        // Optionally, fetch the users list again
        dispatch(fetchUsers());
    } catch (error) {
        dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
};