import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { addLessonToCourse, deleteLesson, getAllLessonOfCourse, Lesson, updateLesson } from '../../redux/LessonReducer/LessonReducer';
import { Button, Modal, Input, List, Upload, Form, Popconfirm, UploadFile } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './UploadLesson.module.scss';
import { DOMAIN_VIDEO } from '../../../src/util/config';

interface UploadLessonProps {
    courseId: number;
    titleCourse: string
}

const UploadLesson: React.FC<UploadLessonProps> = ({ courseId, titleCourse }) => {
    const dispatch: DispatchType = useDispatch();

    useEffect(() => {
        if (courseId) {
            dispatch(getAllLessonOfCourse(courseId));
        }
    }, [dispatch, courseId]);

    const { lessons, loading } = useSelector((state: RootState) => state.LessonReducer);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [editMode, setEditMode] = useState(false);

    const handleAddLesson = async (values: any) => {
        const { title } = values;
        const file = fileList[0]; // Lấy file đầu tiên từ fileList
        if (file && file.originFileObj) {
            await dispatch(addLessonToCourse({ title, courseId, file: file.originFileObj }));
            setIsModalVisible(false);
        }
    };

    const handleUpdateLesson = async (values: any) => {
        if (currentLesson) {
            const { title } = values;
            const file = fileList[0]; // Lấy file đầu tiên từ fileList
            await dispatch(updateLesson({ title, lessonId: currentLesson.id, courseId, file: file ? file.originFileObj : undefined }));
            setIsModalVisible(false);
        }
    };

    const handleDeleteLesson = async (lessonId: number) => {
        await dispatch(deleteLesson({ lessonId}));
    };

    const showModal = (lesson?: Lesson) => {
        setCurrentLesson(lesson || null);
        setEditMode(!!lesson);
        form.resetFields();
        setFileList([]);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const renderVideo = (fileName: string) => {
        return (
            <video
                width="320"
                height="240"
                controls
                src={`${DOMAIN_VIDEO}/api/upload/video/${fileName}`}
                style={{ border: '1px solid #ddd', borderRadius: '4px' }}
            >
                Your browser does not support the video tag.
            </video>
        );
    };
    

    return (
        <Fragment>
            <div className={styles.container}>
                <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    onClick={() => showModal()}
                    className={styles.addButton}
                >
                    Thêm Bài Học
                </Button>

                <div className={styles.titleCourse}>
                    <h1>
                        {titleCourse}
                    </h1>
                </div> {/* Display title here */}

                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={lessons || []}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button
                                    key="edit"
                                    icon={<EditOutlined />}
                                    onClick={() => showModal(item)}
                                >
                                    Sửa
                                </Button>,
                                <Popconfirm
                                    title="Bạn có chắc chắn muốn xóa bài học này không?"
                                    onConfirm={() => handleDeleteLesson(item.id)}
                                    okText="Có"
                                    cancelText="Không"
                                >
                                    <Button
                                        key="delete"
                                        icon={<DeleteOutlined />}
                                    >
                                        Xóa
                                    </Button>
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                title={item.titleLesson}
                                description={
                                    item.urlVideo ? (
                                        <div className={styles.videoContainer}>
                                            {renderVideo(item.urlVideo)}
                                        </div>
                                    ) : 'Chưa có video'
                                }
                            />
                        </List.Item>
                    )}
                />

                <Modal
                    title={editMode ? "Sửa Bài Học" : "Thêm Bài Học"}
                    visible={isModalVisible}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Form
                        form={form}
                        onFinish={editMode ? handleUpdateLesson : handleAddLesson}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Tiêu Đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài học!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Video"
                            name="file"
                            rules={[{ required: !editMode, message: 'Vui lòng tải lên video!' }]}
                            valuePropName="fileList"
                            getValueFromEvent={(e: any) => e.fileList}
                        >
                            <Upload
                                beforeUpload={() => false} // Prevent auto upload
                                listType="text"
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                            >
                                <Button icon={<UploadOutlined />}>Chọn Video</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editMode ? 'Cập Nhật' : 'Thêm'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Fragment>
    );
};

export default UploadLesson;
