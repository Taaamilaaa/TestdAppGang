import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';

 function HomePage({ data, mobileView }) {
    return (
        <>
            <MainDragonSection data={data} mobileView={mobileView} />
        </>
    );
}
export default HomePage;
