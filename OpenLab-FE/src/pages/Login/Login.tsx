import React, { Fragment, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../redux/UserReducer/UserReducer';
import { DispatchType } from '../../redux/configStore';
import styles from './Login.module.scss';
import { notification } from 'antd';

type Props = {};

export const Login: React.FC<Props> = () => {
    const [username, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [remember, setRemember] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false); // State to toggle between login and register
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const dispatch: DispatchType = useDispatch();

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        };

        dispatch(loginUser(loginData)).then((action: any) => {
            if (action.payload.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Đăng nhập thành công!',
                    duration: 1,
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Đăng nhập thất bại. Vui lòng thử lại!',
                    duration: 1,
                });
            }
        }).catch((error) => {
            notification.error({
                message: 'Lỗi',
                description: 'Đăng nhập thất bại. Vui lòng thử lại!',
                duration: 1,
            });
        });
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            notification.error({
                message: 'Lỗi',
                description: 'Mật khẩu không khớp. Vui lòng thử lại!',
                duration: 1,
            });
            return;
        }
        const registerData = {
            name: username,
            email: email,
            password: password,
            role: "customer"
        };

        dispatch(registerUser(registerData)).then((action: any) => {
            if (action.payload && action.payload.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Đăng ký thành công!',
                    duration: 1,
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Đăng ký thất bại. Vui lòng thử lại!',
                    duration: 1,
                });
            }
        }).catch((error) => {
            notification.error({
                message: 'Lỗi',
                description: 'Đăng ký thất bại. Vui lòng thử lại!',
                duration: 1,
            });
        });
        setIsRegister(false);
    };

    return (
        <Fragment>
            <Header />
            <div className={styles.container}>
                <div className={styles.main_container}>
                    <div className={styles.bg_left}>
                        <img src={require('../../assets/img/login_left.png')} alt="logo_left" />
                    </div>

                    <div className={styles.login_container}>
                        <div className={styles.login_main}>
                            {/* <div className={styles.login_logo}>
                                <img src={require('../../assets/img/Logo-02.png')} alt="logo_main" />
                            </div> */}

                            <div className={styles.login_form}>
                                {!isRegister ? (
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className={styles.login_header}>
                                            <div className={styles.login_title}>
                                                <p>Login</p>
                                            </div>
                                        </div>

                                        <div className={styles.form_input}>
                                            <label>User:</label>
                                            <input
                                                className={styles.input}
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={styles.form_input}>
                                            <label>Password:</label>
                                            <input
                                                className={styles.input}
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={styles.form_control}>
                                            <div className={styles.checkbox_login}>
                                                <input
                                                    className={styles.remember}
                                                    type="checkbox"
                                                    // onClick={(e) => setRemember(true)}
                                                    
                                                />
                                                <label className={styles.cb_label}>Remember me</label>
                                            </div>
                                            <a href="/home/password/reset">
                                                Forgot your password?
                                            </a>
                                        </div>

                                        <div className={styles.register_link}>
                                            <button className={styles.bg_danger} type='submit'>Đăng nhập</button>
                                            <button
                                                type='button'
                                                className={styles.bg_secondary}
                                                onClick={() => setIsRegister(true)}
                                            >
                                                Đăng ký
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleRegisterSubmit}>
                                        <div className={styles.login_header}>
                                            <div className={styles.login_title}>
                                                <p>Register</p>
                                            </div>
                                        </div>

                                        <div className={styles.form_input}>
                                            <label>User Name:</label>
                                            <input
                                                className={styles.input}
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUserName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className={styles.form_input} >
                                            <label>Email:</label>
                                            <input
                                                className={styles.input}
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className={styles.form_input} >
                                            <label>Password:</label>
                                            <input
                                                className={styles.input}
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className={styles.form_input} >
                                            <label>Confirm Password:</label>
                                            <input
                                                className={styles.input}
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className={styles.register_link}>
                                            <button className={styles.bg_success} type='submit'>Đăng ký</button>
                                            <button
                                                type='button'
                                                className={styles.bg_secondary}
                                                onClick={() => setIsRegister(false)}
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.bg_right}>
                        <img src={require('../../assets/img/login_right.png')} alt="logo_right" />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};
