import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import styles from './Products.module.scss';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../../redux/MyLearningReducer/MyLearningReducer';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../redux/configStore';
import { history } from "../../../util/config";
import { fetchAllCourse, searchCourse } from '../../../redux/ProductReducer/ProductReducer';
import { debounce } from 'lodash';
import { Card, Row, Col, Button, List, Pagination, AutoComplete } from 'antd';

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<DispatchType>();
    const data = useSelector((state: RootState) => state.ProductReducer.items)
    const [deviceId, setDeviceId] = useState<string>('');
    const userId = useSelector((state: RootState) => state.UserReducer.userId);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [searchTerm, setSearchTerm] = useState('');

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const searchResults = useSelector((state: RootState) => state.ProductReducer.searchResult) as any;
    const itemsToDisplay = useMemo(() => {
        return searchTerm ? (searchResults.data || []) : currentItems;
    }, [searchTerm, searchResults, currentItems]);

    const totalItemsToDisplay = searchTerm ? (searchResults.data ? searchResults.data.length : 0) : data.length;
    // console.log("searchResults", searchResults);
    const debouncedSearch = debounce((term) => {
        if (term) {
            dispatch(searchCourse(term));
        }
    }, 500)

    const handleSearch = (value: any) => {
        setSearchTerm(value);
        setCurrentPage(1);
        debouncedSearch(value);
    }

    const handleAddDevice = (e: React.FormEvent) => {
        e.preventDefault();

        if (deviceId.trim() === '') {
            alert('Vui lòng nhập ID thiết bị.');
            return;
        }

        const data = {
            deviceId: deviceId,
            userId: userId
        };

        dispatch(addCourse(data)).then((action: any) => {
            if (action.payload.status === 200) {
                notification.success({
                    message: 'Thành công',
                    description: 'Thêm thiết bị thành công!',
                    duration: 1,
                });

                setDeviceId('');
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Thêm thiết bị thất bại. Vui lòng thử lại!',
                    duration: 1,
                });
            }
            history.push("/my-learning");
        }).catch((error) => {
            console.error('Error:', error);
            notification.error({
                message: 'Lỗi',
                description: 'Thêm thiết bị thất bại. Vui lòng thử lại!',
                duration: 1,
            });
        });
    };



    const handleDetail = (ProductId: number) => {
        navigate(`/products/detail?productId=${ProductId}`);
    }

    useEffect(() => {
        dispatch(fetchAllCourse());
    }, [dispatch]);

    return (
        <Fragment>
            <Header />
            <div className={styles.banner_padding}>
                <div className={styles.grid_banner}>
                    <div className={styles.order_banner}>
                        <div className={styles.container_order}>
                            <h1 className={styles.header_order}>
                                Học bằng kit
                            </h1>

                            <p className={styles.main_order}>
                                Nhập mã bạn được cấp khi mua kit vào đây để nhận video khoá học tương ứng
                            </p>

                            <form action="" method=''>
                                <div className={styles.footer_order}>
                                    <div className={styles.input_footer}>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            placeholder='Nhập mã kit'
                                            value={deviceId}
                                            onChange={(e) => setDeviceId(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.button_footer}>
                                        <button
                                            className={styles.button}
                                            onClick={handleAddDevice}
                                        >
                                            Đăng ký
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={styles.sale_banner}>
                        <div className={styles.content_sale}>
                            <h2 className={styles.text_content}>
                                Flash sale
                            </h2>
                            <a href="/sale">
                                Xem thêm
                            </a>
                        </div>

                        <div className={styles.img_sale}>
                            <img src={require("../../../assets/img/sale_banner.webp")} alt="Sale Banner" />
                        </div>
                    </div>
                </div>
            </div >

            <div className={styles.products_padding}>
                <section className={styles.container_course}>
                    <div className={styles.header}>
                        <h2 className={styles.content_header}>
                            Khóa học lập trình nhúng IoT
                        </h2>
                        <a href="/products/course">
                            <button type='button' className={styles.btn_header}>
                                Xem thêm
                            </button>
                        </a>
                    </div>

                    <div className={styles.items}>
                        <Row gutter={16}>
                            <Col span={18}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={Array.isArray(itemsToDisplay) ? itemsToDisplay : []}
                                    renderItem={item => (
                                        <Card style={{ width: '100%', marginTop: 16 }}>
                                            <Row align="middle" gutter={16}>
                                                <Col span={6}>
                                                    <img src={(item.thumbnail)} alt={(item.title)} style={{ width: '100%' }} />
                                                </Col>
                                                <Col span={18}>
                                                    <div className={styles.desciption_item}>
                                                        <h3 className={styles.text_item}>
                                                            {item.title}
                                                        </h3>
                                                        <div className={styles.price_item}>
                                                            <strong>
                                                                {item.originalPrice.toLocaleString()}
                                                                <span> VND</span>
                                                            </strong>
                                                        </div>
                                                    </div>
                                                    <Button onClick={() => handleDetail(item.id)}>
                                                        Chi Tiết
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card>
                                    )}
                                />
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <h4>Tìm kiếm</h4>
                                    <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                        <AutoComplete
                                            style={{ flex: 1 }}
                                            placeholder="Tìm kiếm bài IoT..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className={styles.paginationContainer}>
                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={totalItemsToDisplay}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>

                </section>

                {/* <section className={styles.container_kit}>
                    <div className={styles.header}>
                        <h2 className={styles.content_header}>
                            Kit thực hành chuyên sâu
                        </h2>
                        <a href="/home/products/kit">
                            <button type='button' className={styles.btn_header}>
                                Xem thêm
                            </button>
                        </a>
                    </div>

                    <div className={styles.items}>
                        <div className={styles.item}>
                            <a href="/home/products/detail">
                                <div className={styles.img_item}>
                                    <img src={require("../../../assets/img/8051mcu_.webp")} alt="MCU 8051" />
                                    <button
                                        className={styles.view_more_btn}
                                    // onClick={() => handleDetail("ProductId")}
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                                <div className={styles.desciption_item}>
                                    <h3 className={styles.text_item}>
                                        Kit ABCD
                                    </h3>
                                    <div className={styles.price_item}>
                                        <strong>
                                            600,000
                                            <span>VND</span>
                                        </strong>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                <section className={styles.container_document}>
                    <div className={styles.header}>
                        <h2 className={styles.content_header}>
                            Tài liệu thực hành
                        </h2>
                        <a href="/home/products/document">
                            <button type='button' className={styles.btn_header}>
                                Xem thêm
                            </button>
                        </a>
                    </div>

                    <div className={styles.items}>
                        <div className={styles.item}>
                            <a href="/home/products/document/ABCD">
                                <div className={styles.img_item}>
                                    <img src={require("../../../assets/img/document.webp")} alt="document" />
                                    <button className={styles.view_more_btn}>Xem thêm</button>
                                </div>
                                <div className={styles.desciption_item}>
                                    <h3 className={styles.text_item}>
                                        Kit: ABCD
                                    </h3>
                                    <div className={styles.price_item}>
                                        <strong>
                                            600,000
                                            <span>VND</span>
                                        </strong>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className={styles.item}>
                            <a href="/home/products/document/ABCD">
                                <div className={styles.img_item}>
                                    <img src={require("../../../assets/img/document.webp")} alt="document" />
                                    <button className={styles.view_more_btn}>Xem thêm</button>
                                </div>
                                <div className={styles.desciption_item}>
                                    <h3 className={styles.text_item}>
                                        Kit: abcde
                                    </h3>
                                    <div className={styles.price_item}>
                                        <strong>
                                            700,000
                                            <span>VND</span>
                                        </strong>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className={styles.item}>
                            <a href="/home/products/document/hsjjdd">
                                <div className={styles.img_item}>
                                    <img src={require("../../../assets/img/document.webp")} alt="document" />
                                    <button className={styles.view_more_btn}>Xem thêm</button>
                                </div>
                                <div className={styles.desciption_item}>
                                    <h3 className={styles.text_item}>
                                        Kit: hsjjdd
                                    </h3>
                                    <div className={styles.price_item}>
                                        <strong>
                                            800,000
                                            <span>VND</span>
                                        </strong>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section> */}
            </div>
            <Footer />
        </Fragment >
    );
}

export default Products;
