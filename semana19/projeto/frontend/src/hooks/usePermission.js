import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const usePermission = () => {
    const history = useHistory();
    const [permission, setPermission] = useState("");
    
    useEffect(() => {
        const role = window.localStorage.getItem("role");
        
        if(role === "ADMIN") {
            setPermission(getPermission);
        } else {
            setPermission("NORMAL");
        }
        
    }, [history]);
      
    return permission;
};

export default usePermission;