import { useNavigate} from 'react-router-dom';
import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';
// import { Button } from '../components/comon/Button';
import { additionInfo } from '../repository/rep';

 function DetailsPage({ dragon, mobileView }) {
    const navigate = useNavigate();
    const additionParam = additionInfo(dragon);

    const goBack = () => {
        return navigate(-2);
    };

    return (      
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
    );
}
export default DetailsPage;