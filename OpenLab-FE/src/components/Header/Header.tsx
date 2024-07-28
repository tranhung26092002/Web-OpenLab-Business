import React, { Fragment, useEffect } from 'react';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { Dropdown, Menu, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { history } from '../../util/config';
import { logout } from '../../redux/UserReducer/UserReducer';

const Header: React.FC = () => {
    const dispatch: DispatchType = useDispatch();
    const name = useSelector((state: RootState) => state.UserReducer.name);
    // const email = useSelector((state: RootState) => state.UserReducer.email);
    const isLogin = useSelector((state: RootState) => state.UserReducer.isAuthenticated);

    useEffect(() => {

    }, [isLogin]);

    const handleMyCourse = () => {
        history.push("/my-learning");
    }

    const handleProfile = () => {
        history.push("/account");
    };

    const handleChangePass = () => {
        history.push("/account/change-password")
    };

    const handlePurchase = () => {
        history.push("/account/order-history");
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile">
                <span className="text-decoration-none" onClick={handleProfile}>Trang cá nhân</span>
            </Menu.Item>
            <Menu.Item key="change-password">
                <span className="text-decoration-none" onClick={handleChangePass}>Đổi mật khẩu</span>
            </Menu.Item>
            <Menu.Item key="purchase-history">
                <span className="text-decoration-none" onClick={handlePurchase}>Lịch sử mua hàng</span>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                <span className="text-decoration-none">Đăng xuất</span>
            </Menu.Item>
        </Menu>
    );

    const navMenu = (
        <Menu>
            <Menu.Item key="home">
                <NavLink to="/home">Trang chủ</NavLink>
            </Menu.Item>
            <Menu.Item key="about">
                <NavLink to="/about">Giới thiệu</NavLink>
            </Menu.Item>
            <Menu.Item key="products">
                <NavLink to="/products">Sản phẩm</NavLink>
            </Menu.Item>
            <Menu.Item key="price">
                <NavLink to="/price">Báo giá</NavLink>
            </Menu.Item>
            <Menu.Item key="blog">
                <NavLink to="/blog">Blog</NavLink>
            </Menu.Item>
            <Menu.Item key="contact">
                <NavLink to="/contact">Liên hệ</NavLink>
            </Menu.Item>
        </Menu>
    );

    return (
        <Fragment>
            <header className={styles.headerContainer} id="top-header">
                <div className={styles.topRow}>
                    <div className={styles.logoLeft}>
                        <img src={require('../../assets/img/Logo-02.png')} alt="logo_left" />
                    </div>

                    <div className={styles.navigation}>
                        <NavLink
                            to="/home"
                            end
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Trang chủ
                        </NavLink><br />
                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Giới thiệu
                        </NavLink><br />
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Sản phẩm
                        </NavLink><br />
                        <NavLink
                            to="/price"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Báo giá
                        </NavLink><br />
                        <NavLink
                            to="/blog"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Blog
                        </NavLink><br />
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            Liên hệ
                        </NavLink><br />
                    </div>

                    <Dropdown className={styles.dropdownNavigation} overlay={navMenu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Navigation <DownOutlined />
                        </a>
                    </Dropdown>

                    <div className={styles.cart}>
                        <i className="fa-solid fa-cart-plus"></i>
                    </div>

                    <div className={styles.device}>
                        <button onClick={handleMyCourse}>Khóa học của tôi</button>
                    </div>

                    <div className={styles.logoRight}>
                        {isLogin ? (
                            <Dropdown overlay={userMenu}>
                                <div className={styles.ant_dropdown_link} onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {name}
                                        <DownOutlined />
                                    </Space>
                                </div>
                            </Dropdown>
                        ) : (
                            <button onClick={() => history.push('/login')}>Đăng nhập</button>
                        )}
                    </div>
                </div>
            </header>
        </Fragment>
    );
};

export default Header;
