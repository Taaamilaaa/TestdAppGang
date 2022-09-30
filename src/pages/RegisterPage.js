import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '../components/comon/Form';
// import { useDispatch } from 'react-redux';
// import { registerThunk } from '../store/thunk';
// import { app } from '../index';






import { getAuth } from "firebase/auth";

export function RegisterPage({ getUserData }) {
    // const navigate = useNavigate();
    const location = useLocation();
    

    const fromPage = location.state?.from?.pathname || '/';

    const user = obj => {
       
        // const { mail, password } = obj;
       
        

    };




    
    return (
        <section>
            {fromPage}
            <Form type={'submit'} text={'push'} getUser={user} title={'Register'} />
        </section>
    );
}
