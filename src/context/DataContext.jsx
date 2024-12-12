import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { API_URL } from '../helpers/api';
import Swal from 'sweetalert2';
import { Form, Button, Input, Select, Table, Modal, Spin, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const tokenInStorage = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const [token, setToken] = useState(tokenInStorage)
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeModal, setTypeModal] = useState("Create")
    const [selectedItem, setSelectedItem] = useState(null);
    const [loadingAddUpdate, setLoadingAddUpdate] = useState(false)
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate()
    console.log(API_URL)

    // login
    const login = async (values) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(API_URL + "/auth/login", values);
            if (response?.data?.success) {
                const { token } = response.data;
                localStorage.setItem("token", token);
                navigate("/homepage")
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || error.message
            });
        } finally {
            setLoading(false);
        }
    };

    // register
    const register = async (values) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.post(API_URL + "/auth/register", values);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
                navigate('/login');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || error.message
            });
        } finally {
            setLoading(false);
        }
    };

    // Fetch item data
    const fetchItem = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/items`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                setItemData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching item:', error);
            setError('Failed to fetch item. Please try again later.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    // Create new item
    const addCard = async (newCard) => {
        setLoadingAddUpdate(true);
        try {
            const response = await axios.post(`${API_URL}/items`, newCard, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                await fetchItem();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error adding card:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add card. Please try again later.',
            });
        } finally {
            setLoadingAddUpdate(false);
        }
    };

    // Update Item
    const updateCard = async (id, values) => {
        setLoadingAddUpdate(true);
        try {
            const response = await axios.put(`${API_URL}/items/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.success) {
                await fetchItem()
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error updating card:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update card. Please try again later.',
            });
        } finally {
            setLoadingAddUpdate(false);
        }
    };

    // Delete item
    const removeCard = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/items/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                await fetchItem()
                Swal.fire(
                    'Deleted!',
                    'Your card item has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error removing card:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to remove card. Please try again later.',
                });
            }
        }
    };

    const value = {
        Form, Button, Input, Select, navigate, login, register,
        loading, error, fetchItem, itemData, token, setToken, form,
        loadingAddUpdate, setLoadingAddUpdate, addCard, updateCard, removeCard,
        Table, Modal, Spin, typeModal, setTypeModal, selectedItem, setSelectedItem,
        Empty
    }


    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}