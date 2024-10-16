import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css'; // Import CSS Module
import requestUserAuthLogin from '../services/requestLogin';
// import requestUserAuthRegister from '../services/requestRegister';

export const Login = () => {
    useEffect(() => {
        document.body.classList.add(styles.loginBackground);
        return () => {
          document.body.classList.remove(styles.loginBackground);
        };
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize useRouter in the component

    const handleLogin = async (event) => {
      event.preventDefault(); 
    
      try {
        // Await the registration function
        const token = await requestUserAuthLogin(email, password);
        localStorage.setItem('authToken', token);
        console.log(`The r and t token for login is ${token}`);
                
        // Redirect after logging
        router.push('/forum'); // Redirect to the forum page on success
      } catch (error) {
          console.error('Login failed:', error);
          alert(`Login failed: ${error.message}`); // Show a popup with the error message
      }
    };

    return (
        <div className={styles.loginCard}>
          <MDBCard className='text-white'>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>
              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label=''
                  id='formControlLgEmail'
                  type='email'
                  size="lg"
                  className={styles.formControl}
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-4 w-100'
                  label=''
                  id='formControlLgPassword'
                  type='password'
                  size="lg"
                  className={styles.formControl}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.forgotPassword}>
                  <p><a className="text-white-50" href="#!">Forgot password?</a></p>
                </div>
                <div className={styles.btnWrapper}>
                  <MDBBtn className={`px-5 ${styles.btn}`} size='lg' type="submit">
                    Login
                  </MDBBtn>
                </div>
              </form>
              <div>
                <p className="mb-0"> Dont have an account? 
                  <a href="register" className="text-white-50 fw-bold"> Sign Up</a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
    );
}

export default Login;

