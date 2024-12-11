import { DELETE_TOUR_PACKAGE_FAILURE, DELETE_TOUR_PACKAGE_REQUEST, DELETE_TOUR_PACKAGE_SUCCESS, FETCH_PACKAGES_FAILURE, FETCH_PACKAGES_REQUEST, FETCH_PACKAGES_SUCCESS } from "../actionType/actionType";

const initialState = {
    loading: false,
    tourPackages: [],
    error: null,
    successMessage: null
};

export const tourPackageReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_TOUR_PACKAGE_REQUEST':
            return { ...state, loading: true, error: null, successMessage: null };

        case 'ADD_TOUR_PACKAGE_SUCCESS':
            return {
                ...state,
                loading: false,
                tourPackages: [...state.tourPackages, action.payload],
                successMessage: 'Tour package added successfully!'
            };
        case 'ADD_TOUR_PACKAGE_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case FETCH_PACKAGES_REQUEST:
            return { ...state, loading: true };
        case FETCH_PACKAGES_SUCCESS:
            console.log(action.payload)
            return { ...state, loading: false, tourPackages: action.payload };
        case FETCH_PACKAGES_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case DELETE_TOUR_PACKAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_TOUR_PACKAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                tourPackages: state.tourPackages.filter(pkg => pkg._id !== action.payload),
                successMessage: 'Tour package deleted successfully!',
            };
        case DELETE_TOUR_PACKAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case 'UPDATE_TOUR_PACKAGE_REQUEST':
            return { ...state, loading: true, error: null, successMessage: null };

            case 'UPDATE_TOUR_PACKAGE_SUCCESS':
                { const updatedPackages = state.tourPackages.map(pkg =>
                    pkg._id === action.payload._id ? action.payload : pkg
                );
                return { ...state, loading: false, tourPackages: updatedPackages, successMessage: 'Package updated successfully!' }; }

                case 'UPDATE_TOUR_PACKAGE_FAILURE':
                    return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
