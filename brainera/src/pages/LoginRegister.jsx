import React, { useState, useContext } from 'react'; // Import useContext
import { useNavigate } from 'react-router-dom';
import styles from './LoginRegister.module.css';
import PageHeader from '../components/PageHeader';
import AuthContext from '../context/AuthContext.jsx'; // Import AuthContext

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // New state for registration name
    const [role, setRole] = useState('student'); // New state for role selection
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Consume login from AuthContext

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Clear form fields when toggling
        setEmail('');
        setPassword('');
        setName('');
        setRole('student'); // Reset role when toggling forms
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://learnsphere-zwzg.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.user); // Assuming backend sends { token, user }
                if (data.user.role === 'admin') {
                    navigate('/admin');
                } else if (data.user.role === 'instructor') {
                    navigate('/instructor');
                }
                else {
                    navigate('/courses'); // Default for students and other roles
                }
            } else {
                // Handle login errors (e.g., display message to user)
                console.error('Login failed:', data.msg);
                alert(data.msg || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Network error during login:', error);
            alert('Network error. Please try again later.');
        }
    };

    const handleRegisterSubmit = async (e) => { // Made async
        e.preventDefault();
        try {
            const response = await fetch('https://learnsphere-zwzg.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email: email.trim().toLowerCase(), password, role }), // Use selected role
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please log in.');
                setIsLogin(true); // Switch to login form
                setEmail('');
                setPassword('');
                setName('');
                setRole('student'); // Reset role after successful registration
            } else {
                console.error('Registration failed:', data.msg);
                alert(data.msg || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Network error during registration:', error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <div className={styles.loginRegisterPage}>
            <PageHeader title={isLogin ? "Login" : "Register"} breadcrumb={isLogin ? "Home / Login" : "Home / Register"} />

            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.formContainer}>
                        <h2>{isLogin ? "Login to Your Account" : "Create New Account"}</h2>
                        <p>{isLogin ? "Welcome back! Please login to your account." : "Join us today! Create your account."}</p>

                        {isLogin ? (
                            <form className={styles.form} onSubmit={handleLoginSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="loginEmail">Email Address</label>
                                    <input type="email" id="loginEmail" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="loginPassword">Password</label>
                                    <input type="password" id="loginPassword" placeholder="Your Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className={styles.submitButton}>Login</button>
                            </form>
                        ) : (
                            <form className={styles.form} onSubmit={handleRegisterSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="registerName">Full Name</label>
                                    <input type="text" id="registerName" placeholder="Your Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="registerEmail">Email Address</label>
                                    <input type="email" id="registerEmail" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="registerPassword">Password</label>
                                    <input type="password" id="registerPassword" placeholder="Create Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {/* Role Selection */}
                                <div className={styles.formGroup}>
                                    <label>Register as:</label>
                                    <div className={styles.roleSelection}>
                                        <label>
                                            <input
                                                type="radio"
                                                value="student"
                                                checked={role === 'student'}
                                                onChange={() => setRole('student')}
                                            />
                                            Student
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="instructor"
                                                checked={role === 'instructor'}
                                                onChange={() => setRole('instructor')}
                                            />
                                            Instructor
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className={styles.submitButton}>Register</button>
                            </form>
                        )}

                        <p className={styles.toggleText}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span onClick={toggleForm} className={styles.toggleLink}>
                                {isLogin ? "Register here" : "Login here"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
