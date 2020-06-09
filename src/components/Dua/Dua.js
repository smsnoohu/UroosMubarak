import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../../context/EventContextProvider';
import { DataContext } from '../../context/DataContextProvider';
import { DUA_DATA } from './DuaConst';

const Dua = () => {
    const { duas } = useContext(DataContext);

    console.log('dataContext: ', duas);

    return(
        <>
            <h1>Dua Content</h1>
            {/* <ul className="dua-list">
                {duas.map((dua, index) => (
                    <li key={dua.id}>
                        <h2>{dua.category}</h2>
                        <ul className="dua-sub-list">
                            <li>
                                <Link
                                    to={{
                                        pathname: '/DuaDetail',
                                        state: { data: dua}
                                    }}
                                >
                                    {dua.engTitle} - {dua.tamilTitle}
                                </Link>
                            </li>
                        </ul>
                    </li>
                ))}
                    
            </ul> */}
        </>
    );
}

export default Dua;