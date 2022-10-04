import { Navigate } from 'react-router-dom';
import { Form } from '../components/comon/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from 'hooks/useAuth';
import { Notify } from 'notiflix';

function LoginPage() {
    const { isAuth } = useAuth();
    const dispatch = useDispatch();

    const handleLogin = (e, name, email, password) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                dispatch(
                    setUser({
                        email: user.email,
                        token: user.accessToken,
                        id: user.uid,
                    })
                );
                document.querySelectorAll('input').forEach(el => (el.value = ''));
            })
            .catch(error => {
                const errorMessage = error.message;
                Notify.failure(`${errorMessage}`);
            });
    };

    return (
        <>
            {isAuth && <Navigate to="/" />}

            <section>
                <Form title={'LOGIN'} type={'submit'} text={'click'} handleClick={handleLogin} />
            </section>
        </>
    );
}
export default LoginPage;
