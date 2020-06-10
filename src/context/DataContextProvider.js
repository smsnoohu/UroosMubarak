import React, { useState, useEffect, createContext } from 'react';
import PreLoad from '../main/PreLoad';

export const DataContext = createContext();

const DataContextProvider = props => {
    const [preLoad, setPreLoad] = useState(true);
    const [duas, setDuas] = useState([]);
    const [error, setError] = useState(null);

    const fetchDua = async () => {
        setError(false);
        try{
            const duaData = await fetch('https://quthbiyamanzil.org/new/mproForDua.php?table1=Dua')
            const dua = await duaData.json()
            setDuas(dua);
            setPreLoad(false);
        } catch(e) {
            if(e){
                console.log(e.message, 'Try updating the API');
                setPreLoad(false);
                setError(true);
            }
        }
    }

    useEffect(() => {
        fetchDua();
    }, []);



    return(
        <>
            { preLoad && <PreLoad /> }
            <DataContext.Provider
                value={{
                    duas,
                    error
                }}
            >
                {props.children}
            </DataContext.Provider>
        </>
    )
}

export default DataContextProvider;