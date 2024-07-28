import React, { useState } from 'react';
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/UserReducer/UserReducer';
import UserManage from './UserManage';
import UploadLesson from './UploadLesson';
import UploadCourse from './UploadCourse';

const { Header, Content, Sider } = Layout;

const AdminPage: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedContent, setSelectedContent] = useState('UploadCourse'); // Set default content to UploadCourse
    const [courseId, setCourseId] = useState<number | null>(null);
    const [courseTitle, setCourseTitle] = React.useState<string>('');
    const dispatch: DispatchType = useDispatch();

    // Handle menu item click
    const handleMenuClick = (item: any) => {
        setSelectedContent(item.key);
    }

    // Handle adding a lesson
    const handleAddLesson = (id: number, titleCourse: string) => {
        setCourseTitle(titleCourse);
        setCourseId(id);
        setSelectedContent('UploadLesson');
    }

    // Content map for rendering
    const contentMap: { [key: string]: React.ReactNode } = {
        UploadCourse: <UploadCourse onAddLesson={handleAddLesson} />,
        ManageUser: <UserManage />,
        UploadLesson: courseId ? <UploadLesson courseId={courseId} titleCourse={courseTitle} /> : <div>No Lesson ID</div>,
    }

    // Get user email from the Redux store
    const email = useSelector((state: RootState) => state.UserReducer.email);

    // Logout function
    const handLogout = () => {
        dispatch(logout());
    }

    // Dropdown menu
    const menu = (
        <Menu>
            <Menu.Item key="home">
                <NavLink to="/home" className="text-decoration-none">Trang Home</NavLink>
            </Menu.Item>
            <Menu.Item key="chat">
                <NavLink to="/boxchat" className="text-decoration-none">Trợ giảng lab</NavLink>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handLogout}>
                <span className="text-decoration-none">Đăng xuất</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedContent]} 
                    onClick={handleMenuClick}
                >
                    <Menu.Item key="UploadCourse" icon={<UploadOutlined />}>
                        Upload Course
                    </Menu.Item>

                    <Menu.Item key="UploadLesson" icon={<UploadOutlined />}>
                        Upload Video
                    </Menu.Item>

                    <Menu.Item key="ManageUser" icon={<UserOutlined />}>
                        Quản lý sinh viên
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            <Space>
                                {email}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, minHeight: '100vh', background: colorBgContainer }}>
                        {contentMap[selectedContent]}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
