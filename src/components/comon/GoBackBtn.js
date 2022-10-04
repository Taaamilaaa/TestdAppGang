import { useNavigate } from 'react-router-dom';
import styles from './GoBackBtn.module.css';

export function GoBackBtn() {
    const navigate = useNavigate();
    const goBack = () => {
        return navigate(-2);
    };

    return (
        <button className={styles.GoBackBtn} type="button" onClick={goBack}>
            ᐊ Back
        </button>
    );
}
