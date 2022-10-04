import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';
import { additionInfo } from '../repository/rep';

function DetailsPage({ dragon, mobileView }) {
    const additionParam = additionInfo(dragon);

    return (
        <>
            <section>
                <MainDragonSection
                    data={dragon}
                    additionParam={additionParam}
                    mobileView={mobileView}
                />
            </section>
        </>
    );
}
export default DetailsPage;
