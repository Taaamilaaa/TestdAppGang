import { useLocation, useNavigate } from 'react-router-dom';
import { Form } from '../components/comon/Form';

export function LoginPage({getUserData}) {
    // const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';



    return (
        <section>            
            {fromPage}
            <Form title = {"LOGIN"} type = {'submit'} text = {'click'} getUserData={getUserData} />
        </section>
    );
}
