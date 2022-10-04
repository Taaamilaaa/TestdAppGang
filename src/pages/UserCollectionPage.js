import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserCollectionList } from '../components/userCollection/UserCollectionList';
import { UserHaveNotCollection } from '../components/userCollection/UserHaveNotCollection';

function UserCollectionPage({ getCollection }) {
    const [flag, setFlag] = useState(false);
    const collection = useSelector(state => state.dragons.dragons);

    useEffect(() => {
        if (collection.length === 0) {
            setFlag(true);
        }
    }, [collection]);

    return (
        <>
            <section>
                <UserCollectionList />
                {flag && <UserHaveNotCollection />}
            </section>
        </>
    );
}
export default UserCollectionPage;
