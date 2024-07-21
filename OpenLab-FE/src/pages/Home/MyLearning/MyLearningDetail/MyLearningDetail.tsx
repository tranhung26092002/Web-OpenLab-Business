import React, { useEffect, useState, Fragment } from 'react';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import styles from './MyLearningDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../../../redux/configStore';
import { fetchMyProductDetail } from '../../../../redux/MyLearningReducer/MyLearningReducer';
import { useLocation } from 'react-router-dom';

const MylearningDetailPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = Number(queryParams.get('productId'));
    const dispatch = useDispatch<DispatchType>();
    const data = useSelector((state: RootState) => state.MyLearningReducer.currentItem);
    const [videoUrl, setVideoUrl] = useState("");
    const [titleLesson, setTitleLesson] = useState("");

    // Fetch device details when the component mounts or when id changes
    useEffect(() => {
        if (id) {
            dispatch(fetchMyProductDetail(id));
        }
    }, [id, dispatch]);

    // Set default video URL when data is loaded
    useEffect(() => {
        if (data && data.lessons && data.lessons.length > 1) {
            setVideoUrl(data.lessons[0].urlVideo);
            setTitleLesson(data.lessons[0].titleLesson);
        }
    }, [data]);

    if (!data) {
        return <p>No data available</p>;
    }

    const handleLessonClick = (urlVideo: string, titleLesson: string) => {
        setVideoUrl(urlVideo);
        setTitleLesson(titleLesson);
    };

    return (
        <Fragment>
            <Header />
            <div className={styles.detail_container}>
                <div className={styles.title_course}>
                    <h1>{data.title}</h1>
                </div>
                <div className={styles.container_course}>
                    <div className={styles.video_course}>
                        <div className={styles.title_lesson}>
                            <h2>{titleLesson}</h2>
                        </div>
                        <div className={styles.aspect_video}>
                            <iframe
                                src={videoUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>

                    </div>

                    <div className={styles.process_course}>
                        <span>Tiến độ hoàn thành khoá học</span>
                        <div className={styles.content_course}>
                            <ul className={styles.list_content}>
                                {data.lessons && data.lessons.length > 0 ? (
                                    data.lessons.map((lesson, index) => (
                                        <li
                                            key={index}
                                            className={styles.item_list}
                                            onClick={() => handleLessonClick(lesson.urlVideo, lesson.titleLesson)}
                                        >
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
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default MylearningDetailPage;
