import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';
// import { Button } from '../components/comon/Button';
import { additionInfo } from '../repository/rep';

export function DetailsPage({ dragon, mobileView }) {
    const navigate = useNavigate();
    const additionParam = additionInfo(dragon);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(dragon).length === 0) {
            setIsLoading(true);
        } else if (Object.keys(dragon).length !== 0) {
            setIsLoading(false);
        }
    }, [dragon]);

    const goBack = () => {
        return navigate(-2);
    };

    return (
        <>
            {isLoading && <h1>ЗАГРУЗКА</h1>}
            {Object.keys(dragon).length === 0 && <Navigate to="/all" replase />}
            {Object.keys(dragon).length !== 0 && (
                <>
                    <button style={{ marginTop: '150px' }} type="button" onClick={goBack}>
                        Go back
                    </button>

                    <MainDragonSection
                        data={dragon}
                        additionParam={additionParam}
                        mobileView={mobileView}
                    />
                </>
            )}
        </>
    );
}
