import { useCallback, useEffect, useReducer } from "react";
import dataReducer, { fetchDataFailure, fetchDataRequest, fetchDataSuccess, initialState } from "./DataReducer.js";

export default function useFetchData(service) {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    const fetchData = useCallback(async (arg) => {
        dispatch(fetchDataRequest());
        try {
            const response = await service(arg);
            dispatch(fetchDataSuccess(response.data));
        } catch (error) {
            console.log(error);
            dispatch(fetchDataFailure(error.message));
        }
    }, [service]);

    return [state, fetchData]
}