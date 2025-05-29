import {createContext, useState} from "react";

export const CarritoContexto = createContext(null);

export function CarritoProvider ({children}){
    const [listaProductos, setLista] = useState([]);

    return (
        <CarritoContexto.Provider value={{listaProductos, setLista}}>
            {children}
        </CarritoContexto.Provider>
    );
}