import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../main/Shared/FormComponents/Button';

const DuaDetail = props => {
    const data = props.location.state;
    const duas = data.full;
    const duaIdx = data.duaIdx;

    let [currentDua, setCurrentDua] = useState([]);

    let [duaIndex, setDuaIndex] = useState(duaIdx);

    const loadDua = useCallback((idx) => {
        let dua = duas.dua.filter((dua, index) => index === idx);
        setCurrentDua(dua[0]);
    }, [duas]);

    const getPrevDua = () => {
        setDuaIndex(duaIndex - 1);
        loadDua(duaIndex)
    }

    const getNextDua = () => {
        setDuaIndex(duaIndex + 1);
        loadDua(duaIndex)
    }
    
    useEffect(() => {
        loadDua(duaIndex);
    }, [loadDua, duaIndex]);
    return(
        <div className="dua-container">
            <div className="sub-nav">
            <Link
                to={{
                    pathname: '/DuaList',
                    state: { full: duas, duaIdx: null}
                }}
            >
                Back to {(duas.category === 'Daily' && 'Daily') || (duas.category === 'onDate' && 'Special Days') || (duas.category === 'General' && 'General') || (duas.category === 'Special' && 'Special')} Dua List
            </Link>
            </div>
            <div className="dua-details">
                {(currentDua.engTitle || currentDua.tamilTitle) && (<p>{currentDua.engTitle} {(currentDua.engTitle && currentDua.tamilTitle) && (<>-</>)} {currentDua.tamilTitle}</p>)}
                {currentDua.arabicText && (<p className="arabic-title">{currentDua.arabicText}</p>)}
                {currentDua.translation && (<p><strong className="display-block">Translation</strong>{currentDua.translation}</p>)}
                {currentDua.additionalInfo && (<p>{currentDua.additionalInfo}</p>)}
            </div>
            <div className="dua-nav">
                <Button className="primary" icon="chevron-left" iconPlace="prefix" value="Previous" handleClick={getPrevDua} disabled={duaIndex === 0} />
                <Button className="primary " icon="chevron-right"  value="Next" handleClick={getNextDua} disabled={duaIndex === duas.dua.length - 1} />
            </div>
        </div>
    );
}

export default DuaDetail;