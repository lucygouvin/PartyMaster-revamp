export const QueryContext = createContext("default text");

export const QueryContextProvider = ({children}) => {
    
    return(
        <QueryContext.Provider value = {"default"}>
            {children}
        </QueryContext.Provider>
    )
}


  




