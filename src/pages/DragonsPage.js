import { AllDragonsList } from '../components/allDragonsList/AllDragonsList';

function DragonsPage({ dragonReciving, detDrag }) {
    return (
        <>
            <section>
                <AllDragonsList dragonReciving={dragonReciving} detDrag={detDrag} />
            </section>
        </>
    );
}
export default DragonsPage;
