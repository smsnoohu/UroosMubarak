import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataContextProvider';
import './dua.scss';

const Dua = () => {
    const { duas } = useContext(DataContext);

    return(
        <div className="dua-container" id="dua-dashboard">
            <ul className="dua-list">
                {duas.map((dua, index) => (
                    <li key={dua.categoryID}>
                        <h2>{(dua.category === 'Daily' && 'Daily') || (dua.category === 'onDate' && 'Special Days') || (dua.category === 'General' && 'General') || (dua.category === 'Special' && 'Special')} Duas</h2>
                        <ul className="dua-sub-list">
                            {dua.dua.filter((d, idx) => idx < 3).map(s => (
                                <li key={`${dua.categoryID}_${s.id}`}>
                                    <Link
                                        to={{
                                            pathname: '/DuaDetail',
                                            state: { full: dua, single: s}
                                        }}
                                    >
                                        {s.engTitle} - {s.tamilTitle}
                                    </Link>
                                </li>
                            ))}
                            <li className="more">
                                <Link
                                    to={{
                                        pathname: '/DuaList',
                                        state: { full: dua, single: null}
                                    }}
                                >more {(dua.category === 'Daily' && 'Daily') || (dua.category === 'onDate' && 'Special Days') || (dua.category === 'General' && 'General') || (dua.category === 'Special' && 'Special')} Duas</Link>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dua;