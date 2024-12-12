import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { EditOutlined } from "@ant-design/icons";


const ItemModal = (props) => {
    const { visible, onClose, form } = props;
    const {
        Modal, Button, Input, Select, Form,
        typeModal, setTypeModal, selectedItem, setSelectedItem,
        addCard, updateCard, loadingAddUpdate
    } = useContext(DataContext);

    const handleFormSubmit = async (values) => {
        typeModal === "Create" ? await addCard(values) : await updateCard(selectedItem?.id, values);
        form.resetFields();
        setSelectedItem(null)
        onClose();
    };

    const handleClose = () => {
        if (typeModal === "Edit") {
            setTypeModal("Create");
            setSelectedItem(null)
            form.resetFields();
            onClose()
        } else {
            onClose();
        }
    }

    useEffect(() => {
        // Autofill the form
        if (selectedItem) {
            form.setFieldsValue({
                name: selectedItem.name,
                description: selectedItem.description,
                category: selectedItem.category,
                price: selectedItem.price,
            });
        }
    }, [selectedItem, form]);

    return (
        <>
            <Modal
                title={`${typeModal} Item`}
                visible={visible}
                onCancel={handleClose}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    initialValues={{
                        name: "",
                        description: "",
                        price: null,
                        category: ""
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                    >
                        <Input
                            placeholder='Input Name'
                            prefix={<EditOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea
                            placeholder='Input Description'
                            prefix={<EditOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select placeholder="Select a category" allowClear>
                            <Select.Option value="Spesial">Spesial</Select.Option>
                            <Select.Option value="Pedas">Pedas</Select.Option>
                            <Select.Option value="Biasa">Biasa</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input
                            placeholder='Input Price'
                            prefix={<EditOutlined />}
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full" disabled={loadingAddUpdate}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    )
}

export default ItemModal
