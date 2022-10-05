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

    const handleLogin = (e, email, password) => {
        e.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = {
                    email: userCredential.user.email,
                    token: userCredential.user.accessToken,
                    id: userCredential.user.uid,
                };
                dispatch(setUser(user));
                Notify.success('Login is successful!!!');
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode);
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
