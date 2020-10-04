import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const usePermission = () => {
    const history = useHistory();
    const [permission, setPermission] = useState("");
    
    useEffect(() => {
        const getPermission = window.localStorage.getItem("permission");
        
        if(getPermission === "ADMIN") {
            setPermission(getPermission);
        } else {
            setPermission("NORMAL");
        }
    }, [history]);
      
    return permission;
};

export default usePermission;