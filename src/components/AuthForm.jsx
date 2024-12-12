import { useContext } from 'react';;
import { DataContext } from '../context/DataContext';

const AuthForm = (props) => {
    const { Button, Form, Input, Select, login, navigate, register, loading } = useContext(DataContext);
    const { type } = props;

    const onFinish = async (values) => {
        try {
            if (type === "Login") {
                await login(values)
            } else {
                await register(values)
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg  w-96">
                    <h2 className="text-2xl font-bold mb-6">{type}</h2>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Please enter your username!" }]}
                        >
                            <Input placeholder="Enter your username" />
                        </Form.Item>
                        {type === "Register" && (
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: "Please enter your email!" }]}
                            >
                                <Input type="email" placeholder="Enter your email" />
                            </Form.Item>

                        )}

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter your password!" }]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" block disabled={loading}>
                            {type}
                        </Button>
                    </Form>
                    <div className="mt-4 text-center">
                        {type === "Register" ? (
                            <p className="text-sm">
                                Have an account?{' '}
                                <span onClick={() => navigate('/login')} className="text-blue-500 hover:underline cursor-pointer">
                                    Login
                                </span>
                            </p>
                        ) : (
                            <p className="text-sm">
                                Don’t have an account?{' '}
                                <span onClick={() => navigate('/register')} className="text-blue-500 hover:underline cursor-pointer">
                                    Create Account
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;