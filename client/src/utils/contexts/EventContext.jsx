import { createContext } from 'react';
// import { EVENT_DATA } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export const QueryContext = createContext("default text");

export const QueryContextProvider = ({children}) => {
    const { eventId } = useParams();


    const [{data, error, loading}] = useQuery(EVENT_DATA, {
            variables: { id: eventId },
          });
console.log("logging")

    return(
        <QueryContext.Provider value = {"fart"}>
            {console.log("logging")}
            {children}
        </QueryContext.Provider>
    )
}


  




