import { useState } from 'react';

import styles from './Form.module.css';
import { Button } from './Button';

export function Form({title, type, text, handleClick}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
   
    return (
        <form onSubmit={(e) =>handleClick(e,name,email,password)}>
            <h1>{title}</h1>
            <div className={styles.inputContainer}>
                {/* <input
                    type="text"
                    name="name"
                    value = {name}
                    placeholder="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    required
                    onChange={(e)=> setName(e.target.value)}
                /> */}
               
                <input
                    name="email"
                    type="email"
                    // value = {email}
                    placeholder="e-mail"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                />
                
                <input
                    name="password"
                    type="password"
                    // value={password}
                    placeholder="password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />
                
            </div>
            <Button type={type} text = {text}/>
        </form>
    );
}
