import React, { useState } from 'react';
import Checkbox from './Components/Checkbox';
import style from './login.module.css';
import {useNavigate} from 'react-router-dom';

const LogIn = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate= useNavigate();

    const changeEmail = (event) =>{
        setEmail(event.target.value);
        console.log(event.target.value);
    }
    const changePassword = (event) =>{
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className={style.container}>
            
            <div className={style['body-wrapper']}>
                <div className={style.wrapper}>
                    <div className={style.title}>
                        <div className={style.heading}>
                            <div className={style.logo}>
                                <img src="./images/logo.png" alt="Logo" />
                            </div>
                            <h2 className={`${style['text-color']} ${style['font-family-header']} ${style['text-alignment']}`}>Welcome</h2>
                            <span className={`${style['text-color']} ${style['text-alignment']}`}>
                                To keep connected with us please Login
                            </span>
                        </div>
                        <p className={`${style['text-color']} ${style['text-alignment']}`}>Not have any account?</p>
                        <button className={style.button} onClick={()=>navigate(`Reg`)}>Sign up</button>
                    </div>
                    <form onSubmit={formSubmit} className={style.input}>
                        <h1 className={style['text-alignment']}>User Login</h1>
                        <div className={style.textboxes}>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                onChange={changeEmail}
                                value={email}
                            />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                onChange={changePassword}
                                value={password}
                            />
                            <Checkbox name="Remember me"/>
                        </div>
                        <div className={style.buttons}>
                            <button className={style.button}>Log in</button>
                            <button className={style.button}>Forget password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
