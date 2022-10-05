import { useSelector } from 'react-redux';
import { UserCollectionListItem } from './UserCollectionListItem';
import styles from './UserCollection.module.css';

export function UserCollectionList() {
    const collection = useSelector(state => state.dragons.dragons);

    return (
        <>
            <h1>Favorites</h1>
            <ul className={styles.wrap}>
                {collection.map((el, index) => {
                    const { data } = el.data;
                    return <UserCollectionListItem key={index} data={data} />;
                })}
            </ul>
        </>
    );
}
