import { MainDragonSection } from '../components/mainDragonSection/MainDragonSection';

export function HomePage({ data, mobileView }) {
    return (
        <>
            <MainDragonSection data={data} mobileView={mobileView} />
        </>
    );
}
