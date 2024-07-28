import React, { Fragment, useEffect } from "react";
import styles from ".//ProductsDetail.module.scss";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { DispatchType, RootState } from "../../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetail } from "../../../../redux/ProductReducer/ProductReducer";
import { DOMAIN_VIDEO } from '../../../../../src/util/config';


const ProductsDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch<DispatchType>();
    const queryParams = new URLSearchParams(location.search);
    const id = Number(queryParams.get('productId'));
    const data = useSelector((state: RootState) => state.ProductReducer.currentItem)
    const navigate = useNavigate();

    const handleDetail = (ProductId: number) => {
        navigate(`/my-learning/detail?productId=${ProductId}`);
    }

    useEffect(() => {
        dispatch(fetchCourseDetail(id));
    }, [dispatch, id])

    if (!data) {
        return <p>No data available</p>;
    }

    return (
        <Fragment>
            <Header />
            <div className={styles.detial_container}>
                <div className={styles.header_course}>
                    <div className={styles.title_course}>
                        <h1>
                            {data?.title}
                        </h1>
                    </div>
                    <div className={styles.introduce_course}>
                        <div className={styles.header_introduce}>
                            <h2>
                                Giới thiệu
                            </h2>
                        </div>
                        <p className={styles.text_introduce} dangerouslySetInnerHTML={{ __html: data.description }} />
                    </div>
                    <div className={styles.content_course}>
                        <div className={styles.header_content}>
                            <h2>
                                Nội dung khoá học
                            </h2>
                        </div>

                        <ul className={styles.list_content}>
                            {data.lessons && data.lessons.length > 0 ? (
                                data.lessons.map((lesson, index) => (
                                    <li key={index} className={styles.item_list}>
                                        <span className={styles.icon_item}>

                                        </span>
                                        <span className={styles.text_item}>
                                            {index + 1}. {lesson.titleLesson}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <p>No lessons available</p>
                            )}
                        </ul>
                    </div>
                    <div className={styles.assess_course}>
                        <div className={styles.hesder_assess}>

                        </div>
                        <p>
                            Đánh giá từ các học viên sau khi hoàn thành khoá học
                        </p>
                        <ul>
                            <li>

                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.video_course}>
                    {data?.lessons?.[0]?.urlVideo ? (
                        <div className={styles.videoContainer}>
                            <div className={styles.aspect_video}>
                                <video
                                    title="YouTube video player"
                                    controls
                                    src={`${DOMAIN_VIDEO}/api/upload/video/${data.lessons[0].urlVideo}`}
                                    style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    ) : (
                        'Chưa có video'
                    )}

                    <div className={styles.detail_video}>
                        <button onClick={() => handleDetail(id)}>
                            Học ngay
                        </button>
                    </div>
                    <div className={styles.content_video}>
                        <h3>Khoá học bao gồm</h3>
                        <ul>
                            <li>
                                <span>13 bài giảng</span>
                            </li>
                            <li>
                                <span>1 - 2 giờ mỗi bài học</span>
                            </li>
                            <li>
                                <span>Trợ giảng giải đáp mọi thắc mắc 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default ProductsDetail;