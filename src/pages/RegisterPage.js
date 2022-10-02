import { Navigate } from 'react-router-dom';
import { Form } from '../components/comon/Form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/userSlice';
import { useAuth } from 'hooks/useAuth';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';


export function RegisterPage({ getUserData }) {
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    
    

       
    const handleRegister = (e, name, email, password) => {
        e.preventDefault();

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                
                    dispatch(
                    registerUser({
                        email: user.email,
                        token: user.accessToken,
                        id: user.uid,
                    })
                );
                Notify.success('You have successfully registered');
            })
            .then()
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Notify.failure(`${errorMessage}`);
            });
        document.querySelectorAll('input').forEach(el => (el.value = ''));
    };

    return (
        <>
            {isAuth && <Navigate to="/" />}

            <section>
                <Form
                    type={'submit'}
                    text={'push'}
                    title={'Register'}
                    handleClick={handleRegister}                   
                />
            </section>
        </>
    );
}
