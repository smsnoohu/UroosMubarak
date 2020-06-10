import React from 'react';
import { Link } from 'react-router-dom';

const DuaDetail = props => {
    const data = props.location.state;
    const duas = data.full;
    const dua = data.single;
    return(
        <div className="dua-container">
            <div className="sub-nav">
            <Link
                to={{
                    pathname: '/DuaList',
                    state: { full: duas, single: dua}
                }}
            >
                Back to {(duas.category === 'Daily' && 'Daily') || (duas.category === 'onDate' && 'Special Days') || (duas.category === 'General' && 'General') || (duas.category === 'Special' && 'Special')} Dua List
            </Link>
            </div>
            <div className="dua-details">
                {(dua.engTitle || dua.tamilTitle) && (<p>{dua.engTitle} {(dua.engTitle && dua.tamilTitle) && (<>-</>)} {dua.tamilTitle}</p>)}
                {dua.arabicText && (<p className="arabic-title">{dua.arabicText}</p>)}
                {dua.translation && (<p><strong>Translation</strong>{dua.translation}</p>)}
                {dua.additionalInfo && (<p>{dua.additionalInfo}</p>)}
            </div>
        </div>
    );
}

export default DuaDetail;