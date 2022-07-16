import axios  from "axios";
import { GET_EMPLOYEE } from "../../api-helper/api-constant";
import { API_BASE_URL } from "../../constants";

export const  getEmployee = async() => {
    try {
        const response = await axios.get(API_BASE_URL + GET_EMPLOYEE);
        return response
    } catch (error) {
        console.error(error);
    }
   
}

