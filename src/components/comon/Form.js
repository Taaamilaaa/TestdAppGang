import { useState } from 'react';

import styles from './Form.module.css';
import { Button } from './Button';

export function Form({title, type, text, handleClick}) {
   
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
   
    return (
        <form onSubmit={(e) =>handleClick(e,email,password)}>
            <h1>{title}</h1>
            <div className={styles.inputContainer}>               
               
                <input
                    name="email"
                    type="email"                   
                    placeholder="e-mail"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                />
                
                <input
                    name="password"
                    type="password"                    
                    placeholder="password"
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                />
                
            </div>
            <Button type={type} text = {text}/>
        </form>
    );
}
