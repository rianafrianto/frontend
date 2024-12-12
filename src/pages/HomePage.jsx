import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { DataContext } from '../context/DataContext'
import ItemModal from '../components/ItemModal'

const HomePage = () => {

    const { 
        Button, Input, Select, Table, itemData, navigate, Form,
        setTypeModal, setSelectedItem, removeCard, token, fetchItem
     } = useContext(DataContext)

    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(null);
    const [filterItem, setFilterItem] = useState(itemData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (token) {
            fetchItem()
        }
    }, [token])

    useEffect(() => {
        setFilterItem(
            itemData?.filter(data => {
                const matchesStatus = statusFilter
                    ? data.category === statusFilter
                    : true;
                const matchesSearch = data.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesStatus && matchesSearch;
            })
        );
    }, [searchTerm, statusFilter, itemData]);

    const handleNavigate = (record) => {
        navigate(`/detail/${record?.id}`, { state: { record } });
      };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
                <span className="capitalize font-semibold text-gray-700">{text}</span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <span className="capitalize font-semibold text-gray-700">{text}</span>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => (
                <span className="capitalize font-semibold text-gray-700">{text}</span>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => (
                <span className="capitalize font-semibold text-gray-700">{Number(text).toLocaleString()}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 justify-center">
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleNavigate(record)}
                        className="text-gray-600"
                        size="small"
                    >
                        Detail Item
                    </Button>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setTypeModal("Edit")
                            setSelectedItem(record);
                            setIsModalVisible(true);
                        }}
                        className="mr-2"
                        size="small"
                    >
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                          onClick={() => removeCard(record.id)}
                        size="small"
                    >
                        Delete
                    </Button>

                </div>
            ),
        },

    ];

    return (
        <>
            <Navbar />
            <div className='container mx-auto p-10 bg-white shadow-lg rounded-lg max-w-full'>
                {/* Filter & Table Section */}
                <div className="shadow-sm rounded-lg p-4 bg-white">
                    <div className="flex flex-col sm:flex-row items-center mb-4 gap-4 sm:gap-6">
                        <Button
                            type="primary"
                            className="w-full sm:w-auto lg:w-auto"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                        >
                            Create New Item
                        </Button>
                        <Input
                            placeholder="Search Item Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-1/3 lg:w-1/4"
                            allowClear
                            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                        />
                        <Select
                            placeholder="Filter by Category"
                            value={statusFilter}
                            onChange={(value) => setStatusFilter(value)}
                            className="w-full sm:w-1/3 lg:w-1/4"
                            allowClear
                        >
                            <Select.Option value="Spesial">Spesial</Select.Option>
                            <Select.Option value="Pedas">Pedas</Select.Option>
                            <Select.Option value="Biasa">Biasa</Select.Option>
                        </Select>
                    </div>

                    <div className="overflow-x-auto">
                        <Table
                            columns={columns}
                            dataSource={filterItem}
                            rowKey="id"
                            className="shadow-md rounded-lg overflow-hidden"
                            pagination={{
                                pageSize: pageSize,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20'],
                                onShowSizeChange: (current, size) => setPageSize(size),
                            }}
                        />
                    </div>
                </div>
            </div>
            <ItemModal visible={isModalVisible} onClose={closeModal} form={form}  />
        </>
    )
}

export default HomePage
