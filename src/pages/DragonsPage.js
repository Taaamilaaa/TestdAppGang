import { AllDragonsList } from '../components/allDragonsList/AllDragonsList';

export function DragonsPage({dragonReciving, detDrag }) {

    return (
        <>
            <AllDragonsList
                dragonReciving={dragonReciving}
                detDrag={detDrag}
            />
        </>
    );
}