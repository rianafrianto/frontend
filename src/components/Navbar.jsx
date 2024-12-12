import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(DataContext);

    const dataToken = localStorage.getItem('token');

    const handleLogout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken("")
    };

    const handleBack = () => {
            navigate('/homepage');
    }

    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );


    return (
        <nav className="bg-white flex justify-between items-center p-5 text-black shadow-lg border-b-2 border-gray-200">
            <div className="flex items-center">
                <div className="text-xl font-bold cursor-pointer ml-3">
                    <img src={logo} className="w-14 h-auto" alt="Logo" onClick={handleBack} />
                </div>
            </div>

            <div className="flex items-center space-x-4 mr-5">
                {dataToken || token ? (
                    <Dropdown overlay={menu} trigger={['click', 'hover']}>
                        <div className="flex items-center cursor-pointer space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <UserOutlined className="text-xl" />
                            </div>
                        </div>
                    </Dropdown>
                 ) : null}
            </div>
        </nav>

    );
};

export default Navbar;