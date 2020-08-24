import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

const useForm = () => {
    
    const [tasksList, setTasksList] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(baseUrl);
        setTasksList(response.data)
    }
    
    useEffect( () => {
        fetchData();
    }, [])
    
    return { tasksList, fetchData };
};

export default useForm;