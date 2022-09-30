import { useState } from 'react';

import styles from './Form.module.css';
import { Button } from './Button';

export function Form({title, type, text, getUser}) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');


    const handleChange = e => {
        if (e.target.name === 'name') {
            setUserName(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }else if (e.target.name === 'mail') {
            setMail(e.target.value);
        }
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        const user = {
            name: userName,
            mail: mail,
            password: password,
        };
        getUser(user)
        // dispatch(registerThunk(user))
  
        reset();
    };
    const reset = () => {
        setUserName('');
        setPassword('');
        setMail('');
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <h1>{title}</h1>
            <div className={styles.inputContainer}>
                <label></label>
                <input
                    type="text"
                    name="name"
                    value = {userName}
                    placeholder="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    required
                    onChange={handleChange}
                />
                <label></label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    placeholder="password"
                    required
                    onChange={handleChange}
                />
                <label></label>
                <input
                    name="mail"
                    type="mail"
                    value = {mail}
                    placeholder="e-mail"
                    required
                    onChange={handleChange}
                />
            </div>
            <Button type={type} text = {text}/>
        </form>
    );
}
