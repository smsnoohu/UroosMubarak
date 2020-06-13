import React from 'react';
import { Link } from 'react-router-dom';
import './dua.scss';

const DuaList = props => {
    const data = props.location.state;
    const duas = data.full;
    return(
        <div className="dua-container">
            <div className="sub-nav">
                <Link to="/Dua">Back to Dua Dashboard</Link>
            </div>
            <h1>{(duas.category === 'Daily' && 'Daily') || (duas.category === 'onDate' && 'Special Days') || (duas.category === 'General' && 'General') || (duas.category === 'Special' && 'Special')} Duas</h1>

            <ul className="dua-sub-list">
                {duas.dua.map((s, index) => (
                        <li key={s.id}>
                            <Link
                                to={{
                                    pathname: '/DuaDetail',
                                    state: { full: duas, duaIdx: index}
                                }}
                            >
                                {s.engTitle} - {s.tamilTitle}
                            </Link>
                        </li>
                ))}
            </ul>
        </div>
    );
}

export default DuaList;