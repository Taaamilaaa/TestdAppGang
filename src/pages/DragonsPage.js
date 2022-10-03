import { AllDragonsList } from '../components/allDragonsList/AllDragonsList';

function DragonsPage({dragonReciving, detDrag }) {

    return (
        <>
            <AllDragonsList
                dragonReciving={dragonReciving}
                detDrag={detDrag}
            />
        </>
    );
}
export default DragonsPage;