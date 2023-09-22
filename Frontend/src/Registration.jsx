import React, { useState } from 'react';
import "./Registration.css"

const Registration = ()=>{
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
    
    const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    };
    

    return (
        <>
            <div className="middle2">
                <div className="Middle">
                    <div className="left">
                        <img src="./images/shape.jpg" alt="" />
                        <h1>Welcome</h1>
                        <p>Join our largest Community</p>
                        <p>Already have an account?</p>
                        <button className='btn-primary'>LogIn</button>
                    </div>
                    <div className="right">
                    <h2>Register Now!</h2>
                    <p>Fill the information carefully</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <div className="leftForm">
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
                                        name='Email'
                                        placeholder='Email'
                                        type="text"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        name='Number'
                                        placeholder='Number'
                                        type="tel"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input 
                                        name='Area'
                                        placeholder='Area'
                                        type="text"
                                        value={formData.area}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="rightForm">
                                <div>
                                        <input 
                                            name='District'
                                            placeholder='District'
                                            type="text"
                                            value={formData.district}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name='Division'
                                            placeholder='Division'
                                            type="text"
                                            value={formData.division}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name='Password'
                                            placeholder='Password'
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <input 
                                            name='Confirm Password'
                                            placeholder='Confirm Password'
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <button type="submit" className='btn5'>Sign In</button>
                            </div>
                            
                        
                    </form>


                        </div>
                </div>
            </div>
        
        </>
    )
}
export default Registration;