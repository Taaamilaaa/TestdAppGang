import { useSelector, useDispatch } from 'react-redux';
import { removeDragon } from '../store/dragonSlice';
import { ImageSlider } from '../components/imageSlider/ImageSlider';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export function UserCollectionPage() {
    const collection = useSelector(state => state.dragons.dragons);

    const dispatch = useDispatch();

    const remove = (el)=>{
        dispatch(removeDragon(el.id));
        Notify.info('удалено из избранного');
    }

    return (
        <>
            <h1 style={{ marginTop: '150px' }}>UserCollectionPage </h1>

            {collection.length === 0 && <h2>blank</h2>}
            {collection.length !== 0 && (
                <>
                    {collection.map((el, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <h3>{el.name}</h3>

                                    <ImageSlider slides={el.flickr_images} />
                                    <button
                                        type="button"
                                        id={el.id}
                                        onClick={() => remove(el)}
                                    >
                                        -
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </>
            )}
        </>
    );
}
