import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';

function HomePage({ data, mobileView }) {
    return (
        <>
            <section>
                <MainDragonSection data={data} mobileView={mobileView} />
            </section>
        </>
    );
}
export default HomePage;
