import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {UserCollectionList} from '../components/userCollection/UserCollectionList'

function UserCollectionPage({getCollection}) {
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
               

            {flag && <h2>blank</h2>}
            {collection.length !== 0 && (
                <>
                    
                    <UserCollectionList/>
 
                </>
            )}
            </section>
           
        </>
    );
}
export default UserCollectionPage;