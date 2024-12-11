
import axios from 'axios';
import { DELETE_TOUR_PACKAGE_FAILURE, DELETE_TOUR_PACKAGE_REQUEST, DELETE_TOUR_PACKAGE_SUCCESS, FETCH_PACKAGES_FAILURE, FETCH_PACKAGES_SUCCESS, UPDATE_TOUR_PACKAGE_FAILURE, UPDATE_TOUR_PACKAGE_REQUEST, UPDATE_TOUR_PACKAGE_SUCCESS } from '../actionType/actionType';


export const fetchTourPackages = () => async (dispatch) => {
    dispatch({ type: 'FETCH_TOUR_PACKAGES_REQUEST' });
    try {
        const response = await axios.get('http://localhost:3000/api/package/getAllPackages');
        dispatch({ type: FETCH_PACKAGES_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type:  FETCH_PACKAGES_FAILURE, payload: error.message });
    }
};

export const addTourPackage = (tourPackageData) => async (dispatch) => {
    dispatch({ type: 'ADD_TOUR_PACKAGE_REQUEST' });

    try {
        const response = await axios.post('http://localhost:3000/api/package/addTourPackges', tourPackageData);
        dispatch({ type: 'ADD_TOUR_PACKAGE_SUCCESS', payload: response.data.data });
    } catch (error) {
        dispatch({ type: 'ADD_TOUR_PACKAGE_FAILURE', payload: error.message });
    }
};
export const deleteTourPackage = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TOUR_PACKAGE_REQUEST });
        await axios.delete(`http://localhost:3000/api/package/deletePackage/${id}`); 
        dispatch({ type: DELETE_TOUR_PACKAGE_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_TOUR_PACKAGE_FAILURE, payload: error.response?.data.message || error.message });
    }
};

export const updateTourPackage = (id, packageData) => async (dispatch) => {
    dispatch({ type: UPDATE_TOUR_PACKAGE_REQUEST });
    try {
        const { data } = await axios.put(`http://localhost:3000/api/package/updtePackge/${id}`, packageData); 
        dispatch({ type: UPDATE_TOUR_PACKAGE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_TOUR_PACKAGE_FAILURE, payload: error.message });
    }
};