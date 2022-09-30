import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';

export function MainPage({ data, mobileView }) {

    return (
        <>
            <h1 style={{ marginTop: '150px' }}>StartPage</h1>
         <MainDragonSection
            data={data}
            mobileView = {mobileView}
        />
        </>
       
    );
}