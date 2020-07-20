import { useState, useEffect } from "react";
import axios from "axios";

const useRequestData = (url, initialState) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
      axios
      .get(url)
      .then( response => {
          setData(response.data.trips);
      })
      .catch( err => {
          console.log(err.message)
      })
  }, [url])
  return data;
};

export default useRequestData;
