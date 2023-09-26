import React, { useState } from 'react';
import axios from 'axios';
import style from "./Registration.module.css"; // Import your CSS module
import Button from './Components/Button';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        area: '',
        district: '',
        division: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send the registration data to the server for processing
          
          const response = await axios.post('http://localhost:3000/register', formData, {
          headers: {
                'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            // Registration was successful, you can redirect the user to another page.
            // Example: window.location.href = '/login';
            console.log('Registration successful');
          } else {
            // Handle registration error, show an error message, etc.
            console.log(formData);
            console.error('Registration failed(Frontend)');
          }
        } catch (error) {
          console.error('Error:', error);
          console.error('Registration failed(catch)');
        }
      };

    return (
        <>
            <div className={style.middle2}>
                <div className={style.Middle}>
                    <div className={style.left}>
                        <img src="./images/shape.jpg" alt="" />
                        <h1>Welcome</h1>
                        <p>Join our largest Community</p>
                        <p>Already have an account?</p>
                        {/* <button className={style['btn-primary']}>LogIn</button> */}
                        <Button text="Login"/>
                    </div>
                    <div className={style.right}>
                        <h2>Register Now!</h2>
                        <p>Fill the information carefully</p>
                        <form onSubmit={handleSubmit}>
                            <div className={style.form}>
                                <div className={style.leftForm}>
                                    <div>
                                        <input
                                            name='name'
                                            placeholder='Name'
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='email'
                                            placeholder='Email'
                                            type="text"
                                            value={formData.email}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='mobileNumber'
                                            placeholder='Number'
                                            type="text"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                           
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='area'
                                            placeholder='Area'
                                            type="text"
                                            value={formData.area}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                </div>
                                <div className={style.rightForm}>
                                    <div>
                                        <input
                                            name='district'
                                            placeholder='District'
                                            type="text"
                                            value={formData.district}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='division'
                                            placeholder='Division'
                                            type="text"
                                            value={formData.division}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='password'
                                            placeholder='Password'
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                    <div>
                                        <input
                                            name='confirmPassword'
                                            placeholder='Confirm Password'
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {/* <button type="submit" className={style.btn5}>Sign In</button> */}
                                <Button text="Sign in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration;
