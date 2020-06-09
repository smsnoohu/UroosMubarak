import React, { useContext, useState, useEffect, createContext } from 'react';
import { EventContext } from './EventContextProvider';

export const DataContext = createContext();

const DataContextProvider = props => {
    const { setLoader } = useContext(EventContext);
    const [duas, setDuas] = useState([]);
    const [error, setError] = useState(null);

    const fetchDua = async () => {
        setLoader(true);
        try{
            const duaData = await fetch('https://quthbiyamanzil.org/new/mproForDua.php?table1=Dua')
            const dua = await duaData.json()
            setDuas(dua.data);
            setLoader(false);
        } catch(e) {
            if(e){
                console.log(e.message, 'Try updating the API');
                setLoader(false);
            }
        }
    }

    useEffect(() => {
        fetchDua();
    }, []);



    return(
        <DataContext.Provider
            value={{
                duas
            }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;