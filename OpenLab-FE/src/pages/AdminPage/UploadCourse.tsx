import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table, Upload, UploadFile, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { UploadOutlined } from '@ant-design/icons';
import { createCourse, deleteCourse, fetchAllCourse, updateCourse } from '../../redux/ProductReducer/ProductReducer';

interface UploadCourseProps {
    onAddLesson: (id: number, titleCourse: string) => void; // Nhận tham số id
}

const UploadCourse: React.FC<UploadCourseProps> = ({ onAddLesson }) => {
    const dispatch = useDispatch<DispatchType>();
    const courseData = useSelector((state: RootState) => Array.isArray(state.ProductReducer.items) ? state.ProductReducer.items : []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<number | null>(null);

    const courseStatus = useSelector((state: RootState) => state.ProductReducer.status);
    const courseError = useSelector((state: RootState) => state.ProductReducer.error);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    useEffect(() => {
        if (courseStatus === 'succeeded') {
            notification.success({
                message: 'Success',
                description: 'Operation completed successfully!'
            });
        } else if (courseStatus === 'failed' && courseError) {
            notification.error({
                message: 'Error',
                description: courseError
            });
        }
    }, [courseStatus, courseError]);

    useEffect(() => {
        dispatch(fetchAllCourse());
    }, [dispatch]);

    const handleAddOrEdit = (values: any) => {
        const thumbnailFile = values.thumbnail && values.thumbnail[0] && values.thumbnail[0].originFileObj;

        if (thumbnailFile) {
            const data = {
                subId: values.subId,
                title: values.title,
                thumbnail: thumbnailFile,
                createdBy: values.createdBy,
                typeCourse: values.typeCourse,
                isPublish: values.isPublish,
                description: values.description,
                originalPrice: values.originalPrice
            };

            if (editingId) {
                dispatch(updateCourse({ id: String(editingId), data: data }))
                    .then(() => {
                        notification.success({
                            message: 'Success',
                            description: 'Updated Successfully'
                        });
                    }).catch(() => {
                        notification.error({
                            message: 'Error',
                            description: 'Failed to Update Course'
                        });
                    });
            } else {
                dispatch(createCourse(data))
                    .then(() => {
                        notification.success({
                            message: 'Success',
                            description: 'Created Successfully'
                        });
                    }).catch(() => {
                        notification.error({
                            message: 'Error',
                            description: 'Failed to Create Course'
                        });
                    });
            }
            setIsModalVisible(false);
            form.resetFields();
        } else {
            notification.error({
                message: 'Error',
                description: 'Please upload the thumbnail image'
            });
        }
    };

    const handleDelete = (id: string) => {
        dispatch(deleteCourse(id))
            .then(() => {
                notification.success({
                    message: 'Deleted',
                    description: 'Deleted successfully!',
                });
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Failed to delete!',
                });
            });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleAddLesson = (courseId: number, titleCourse: string) => {
        onAddLesson(courseId, titleCourse);
    };

    const paginatedData = courseData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>Add New</Button>
            <Table
                dataSource={paginatedData.map(item => ({ ...item, key: item.id }))}
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    {
                        title: 'Thumbnail', dataIndex: 'thumbnail', key: 'thumbnail',
                        render: (thumbnailUrl: string) => (
                            <img src={thumbnailUrl} alt="Thumbnail" style={{ width: '80px', height: '80px' }} />
                        )
                    },
                    { title: 'Title', dataIndex: 'title', key: 'title' },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    onClick={() => {
                                        setEditingId(record.id);
                                        form.setFieldsValue({
                                            id: record.id,
                                            title: record.title,
                                            createdBy: record.createdBy,
                                            typeProduct: record.typeCourse,
                                            isPublish: record.isPublish,
                                            description: record.description,
                                            originalPrice: record.originalPrice,
                                            thumbnail: [{
                                                uid: record.id,
                                                name: 'thumbnail.png',
                                                status: 'done',
                                                url: record.thumbnail
                                            }]
                                        });
                                        setIsModalVisible(true);
                                    }}>Update</Button>
                                <Button
                                    type="default"
                                    style={{ marginRight: '10px' }}
                                    onClick={() => handleAddLesson(record.id, record.title)}>Add Lesson</Button>
                                <Popconfirm
                                    title="Are you sure you want to delete this entry?"
                                    onConfirm={() => handleDelete(String(record.id))}
                                    onCancel={() => console.log('Cancelled delete for:', record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            </>
                        ),
                    },
                ]}
                pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: courseData.length,
                    onChange: handlePageChange
                }}
            />
            <Modal
                title={editingId ? "Edit" : "Add New"}
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddOrEdit}
                >
                    <Form.Item
                        label="Sub ID"
                        name="subId"
                        rules={[{ required: true, message: 'Please input the sub ID!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thumbnail"
                        name="thumbnail"
                        rules={[{ required: true, message: 'Please upload a thumbnail image!' }]}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="thumbnail"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={(file: UploadFile) => {
                                return false; // Prevent automatic upload
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Created By"
                        name="createdBy"
                        rules={[{ required: true, message: 'Please input the creator!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Type Product"
                        name="typeProduct"
                        rules={[{ required: true, message: 'Please input the type of product!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Is Publish"
                        name="isPublish"
                        valuePropName="checked"
                    >
                        <Input type="checkbox" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Original Price"
                        name="originalPrice"
                        rules={[{ required: true, message: 'Please input the original price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

function normFile(e: any) {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
}

export default UploadCourse;
