import { useSelector } from 'react-redux';
import styles from './UserCollection.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getDatabase, get, child, ref, update, onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { getDragonsCollection } from 'store/dragonSlice';
import { ImageSlider } from 'components/imageSlider/ImageSlider';
import { Description } from 'components/description/Description';
import { additionInfo } from '../../repository/rep';

export function UserCollectionList() {
    const collection = useSelector(state => state.dragons.dragons);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    function updateCollection(key) {
        console.log(key);
        const db = getDatabase();

        const newData = null;
        const updates = {};
        // eslint-disable-next-line
        updates['users/' + `${user.id}/` + 'collection/' + key] = newData;

        return update(ref(db), updates);
    }

    const getCollection = () => {
        let data = [];
        const db = getDatabase();
        // eslint-disable-next-line
        const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

        onValue(collectionRef, snapshot => {
            if (snapshot.val()) {
                const collection = Object.values(snapshot.val());

                dispatch(getDragonsCollection(collection));
            } else if (!snapshot.val()) {
                dispatch(getDragonsCollection(data));
            }
        });
    };
    const remove = e => {
        if (e.target.nodeName === 'BUTTON') {
            const id = e.target.id;
            const dbRef = ref(getDatabase());
            // eslint-disable-next-line
            get(child(dbRef, 'users/' + `${user.id}/` + 'collection'))
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const collection = snapshot.val();
                        for (const key in collection) {
                            if (collection[key].data.data.id === id) {
                                updateCollection(key);
                                getCollection();
                                Notify.success(
                                    `${collection[key].data.data.name} удален из избранные`,
                                    {
                                        timeout: 1500,
                                    }
                                );
                            }
                        }
                    }
                })
                .catch(error => {});
        }
    };

    return (
        <>
            <ul>
                {collection.map((el, index) => {
                    const { data } = el.data;
                    const additionParam = additionInfo(data);
                    return (
                        <>
                            <li key={index} className={styles.container}>
                                <div>
                                    <h2>{data.name}</h2>
                                    <div>
                                        <Description
                                        name={data.name}
                                        link={data.wikipedia}
                                        additionParam={additionParam}
                                    />
                                    <div className={styles.imgContainer}>
                                        <img className={styles.img} alt = {data.name} src={data.flickr_images[1]} />
                                        <button
                                            className={styles.delBtn}
                                            type="button"
                                            id={data.id}
                                            onClick={remove}
                                        >
                                            -
                                        </button>
                                    </div>
                                    </div>
                                    
                                </div>
                                <ImageSlider slides={data.flickr_images} />
                            </li>
                        </>
                    );
                })}
            </ul>
        </>
    );
}
