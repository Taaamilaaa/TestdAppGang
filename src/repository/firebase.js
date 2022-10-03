import { getDatabase, ref, onValue } from 'firebase/database';
import { getDragonsCollection } from '../store/dragonSlice';
// import { useDispatch } from 'react-redux';


export const getCollection = (user, dispatch) => {
    // const dispatch = useDispatch();    
           const db = getDatabase();

        const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

        onValue(collectionRef, snapshot => {
            if (snapshot.val()) {
                let data = [];
                for (const key in snapshot.val()) {
                    if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                        const element = snapshot.val()[key];
                        for (const key in element) {
                            if (Object.hasOwnProperty.call(element, key)) {
                                const dataElement = element[key];
                               
                                data.push(dataElement);
                            }
                        }
                    }
                }

                dispatch(getDragonsCollection(data));
            } else if (!snapshot.val()) {
               
                return null;
            }
        });
    }
