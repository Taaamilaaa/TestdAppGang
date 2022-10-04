import { useState } from 'react';
import styles from './MainDragonSection.module.css';
import { Description } from '../description/Description';
import { ImageSlider } from '../imageSlider/ImageSlider';
import { additionInfo } from '../../repository/rep';
import { GoBackBtn } from '../comon/GoBackBtn';
import { useLocation } from 'react-router-dom';

export function MainDragonSection({ data, mobileView }) {
    const [showSlider, setShowSlider] = useState(false);
    const location = useLocation();

    const onShowSliderClick = e => {
        if (showSlider === true) {
            setShowSlider(false);
        } else if (showSlider === false) {
            setShowSlider(true);
        }
    };

    const additionParam = additionInfo(data);

    const { name, description, flickr_images, wikipedia } = data;
    return (
        <>
            <div>
                <div>
                    {location.pathname === '/all/details' && <GoBackBtn />}
                    <h1>{name}</h1>

                    <div className={styles.contentContainer}>
                        <img className={styles.mainImg} src={flickr_images[1]} alt={name} />
                        {!mobileView && (
                            <Description
                                name={name}
                                descr={description}
                                link={wikipedia}
                                additionParam={additionParam}
                            />
                        )}
                    </div>
                    <p className={styles.text}>{description}</p>
                </div>
                {mobileView && (
                    <Description
                        name={name}
                        descr={description}
                        link={wikipedia}
                        additionParam={additionParam}
                    />
                )}
                <button className={styles.showSliderBtn} onClick={onShowSliderClick}>
                    ▼
                </button>
                {showSlider && <ImageSlider slides={flickr_images} />}
            </div>
        </>
    );
}
