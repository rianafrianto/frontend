import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <ExclamationCircleOutlined className="icon" />
            <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
            <Button type="primary" onClick={() => navigate('/homepage')}>
                Go Back Home
            </Button>
        </div>
    );
};

export default NotFound;