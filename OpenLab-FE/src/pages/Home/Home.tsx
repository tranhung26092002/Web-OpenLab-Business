import React, { Fragment } from 'react';
import styles from './Home.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

type Props = {}

export const Home = (props: Props) => {
    return (
        <Fragment>
            <Header />
            <section className={styles.banner_padding}>
                <div className={styles.container_banner}>
                    <div className={styles.content_banner}>
                        <div className={styles.text_banner}>
                            <span className={styles.sub_heading}>AI/IoT as service</span>
                            <h1 className={styles.heading}>
                                Nền tảng thực hành số,
                            </h1>
                            <h1 className={styles.heading}>
                                dịch dụ AI/IoT giá rẻ cho chuyển đổi số
                            </h1>
                            <p className={styles.description}>
                                Chúng tôi nỗ lực làm việc để hiểu khách hàng và mang đến các dịch vụ chất lượng có giá trị thực tiễn cao!
                            </p>
                            <a className={styles.btn} href="/home/products">
                                Các dịch vụ của chúng tôi
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.features_padding}>
                <div className={styles.container_features}>
                    <div className={styles.content_features}>
                        <div className={styles.text_features}>
                            <div className={styles.section_heading}>
                                <h2 className={styles.sub_heading}>Các dịch vụ chính</h2>
                                <p className={styles.heading}>Các dịch vụ chính OpenLAB đang tập trung phát triển và cung cấp cho khách hàng</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row_features}>
                        <div className={styles.feature_column} >
                            <div className={styles.feature_item} >
                                <div className={styles.feature_icon}>
                                    <i className="fa-solid fa-building-columns"></i>
                                </div>
                                <div className={styles.feature_text}>
                                    <h4>Thực hành số</h4>
                                    <p>Phát triển nền tảng thực hành trực tuyến AI/IoT</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.feature_column} >
                            <div className={styles.feature_item} >
                                <div className={styles.feature_icon}>
                                    <i className="fa-solid fa-layer-group"></i>
                                </div>
                                <div className={styles.feature_text}>
                                    <h4>Thiết bị thực hành chuyên sâu</h4>
                                    <p>Phát triển hệ sinh thái thiết bị thực hành thông minh gồm LAB và KIT</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.feature_column} >
                            <div className={styles.feature_item} >
                                <div className={styles.feature_icon}>
                                    <i className="fa-solid fa-video"></i>
                                </div>
                                <div className={styles.feature_text}>
                                    <h4>Khóa học thực hành chuyên sâu</h4>
                                    <p>Phát triển các khóa học thực hành chuyên sâu, thực chiến dự án AI/IoT</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.feature_column} >
                            <div className={styles.feature_item} >
                                <div className={styles.feature_icon}>
                                    <i className="fa-solid fa-chart-line"></i>
                                </div>
                                <div className={styles.feature_text}>
                                    <h4>Dịch vụ AI/IoT giá rẻ</h4>
                                    <p>Phát triển các giải pháp AI/IoT theo yêu cầu chuyển đổi số</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.project_padding}>
                <div className={styles.container_project}>
                    <div className={styles.content_project}>
                        <div className={styles.text_project}>
                            <div className={styles.section_heading}>
                                <h2 className={styles.sub_heading}>Sản phẩm phổ biến</h2>
                                <p className={styles.heading}>Các sản phẩm tiêu biểu của chúng tôi</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.row_project}>
                        <div className={styles.project_column}>
                            <div className={styles.project_grid}>
                                <div className={styles.project_header}>
                                    <span>
                                        <img src={require("../../assets/img/project1.webp")} alt="project 1" />
                                    </span>
                                </div>
                                <div className={styles.project_content}>
                                    <div className={styles.project_meta}>
                                        <span className={styles.category}>App</span>
                                        <span className={styles.label}>
                                            <i className="fas fa-signal me-2"></i>
                                            Có sẵn
                                        </span></div>
                                    <div className={styles.project_title}>
                                        <a href="/home/product">E-LAB: Thực hành trực tuyến AI/IoT</a>
                                    </div>
                                    <div className={styles.project_meta_info}>
                                        <i className="far fa-quote-left me-2"></i>
                                        Mô hình đại học số thu nhỏ giúp đẩy mạnh tương tác giữa nhà trường, giảng viên và sinh viên, giúp người dùng tra cứu thời khóa biểu, điểm thi, cập nhật tin tức một cách nhanh chóng
                                    </div>
                                    <div className={styles.project_footer}>
                                        <div className="project-price"></div>
                                        <a className={styles.btn} href="/home/product">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.project_column}>
                            <div className={styles.project_grid}>
                                <div className={styles.project_header}>
                                    <span>
                                        <img src={require("../../assets/img/project2.webp")} alt="project 2" />
                                    </span>
                                </div>
                                <div className={styles.project_content}>
                                    <div className={styles.project_meta}>
                                        <span className={styles.category}>App</span>
                                        <span className={styles.label}>
                                            <i className="fas fa-signal me-2"></i>
                                            Có sẵn
                                        </span></div>
                                    <div className={styles.project_title}>
                                        <a href="/home/product">E-KIT: Hệ thống KIT thực hành thông minh AI/Iot</a>
                                    </div>
                                    <div className={styles.project_meta_info}>
                                        <i className="far fa-quote-left me-2"></i>
                                        Đây là một nền tảng mở, cho phép liên kết, chia sẻ dữ liệu thông suốt với các hệ thống khác trong Trường mà không làm ảnh hưởng tới hoạt động của các trang web thành viên                                    </div>
                                    <div className={styles.project_footer}>
                                        <div className="project-price"></div>
                                        <a className={styles.btn} href="/home/product">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.project_column}>
                            <div className={styles.project_grid}>
                                <div className={styles.project_header}>
                                    <span>
                                        <img src={require("../../assets/img/project3.webp")} alt="project 3" />
                                    </span>
                                </div>
                                <div className={styles.project_content}>
                                    <div className={styles.project_meta}>
                                        <span className={styles.category}>App</span>
                                        <span className={styles.label}>
                                            <i className="fas fa-signal me-2"></i>
                                            Có sẵn
                                        </span></div>
                                    <div className={styles.project_title}>
                                        <a href="/home/product">E-Course: Khóa học thực hành chuyên sâu AI/IoT</a>
                                    </div>
                                    <div className={styles.project_meta_info}>
                                        <i className="far fa-quote-left me-2"></i>
                                        Trục liên thông là nền tảng kết nối, chia sẻ dữ liệu giữa các hệ thống thông tin phục vụ chỉ đạo, điều hành của toàn trường; Kết nối, chia sẻ dữ liệu giữa các hệ thống của Trường với Bộ                                    </div>
                                    <div className={styles.project_footer}>
                                        <div className={styles.project_price}></div>
                                        <a className={styles.btn} href="/home/product">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.project_column}>
                            <div className={styles.project_grid}>
                                <div className={styles.project_header}>
                                    <span>
                                        <img src={require("../../assets/img/project3.webp")} alt="project 3" />
                                    </span>
                                </div>
                                <div className={styles.project_content}>
                                    <div className={styles.project_meta}>
                                        <span className={styles.category}>App</span>
                                        <span className={styles.label}>
                                            <i className="fas fa-signal me-2"></i>
                                            Có sẵn
                                        </span></div>
                                    <div className={styles.project_title}>
                                        <a href="/home/product">E-Bot: Chatbot AI hỗ trợ thực hành trực tuyến</a>
                                    </div>
                                    <div className={styles.project_meta_info}>
                                        <i className="far fa-quote-left me-2"></i>
                                        Trục liên thông là nền tảng kết nối, chia sẻ dữ liệu giữa các hệ thống thông tin phục vụ chỉ đạo, điều hành của toàn trường; Kết nối, chia sẻ dữ liệu giữa các hệ thống của Trường với Bộ                                    </div>
                                    <div className={styles.project_footer}>
                                        <div className={styles.project_price}></div>
                                        <a className={styles.btn} href="/home/product">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.project_column}>
                            <div className={styles.project_grid}>
                                <div className={styles.project_header}>
                                    <span>
                                        <img src={require("../../assets/img/project3.webp")} alt="project 3" />
                                    </span>
                                </div>
                                <div className={styles.project_content}>
                                    <div className={styles.project_meta}>
                                        <span className={styles.category}>App</span>
                                        <span className={styles.label}>
                                            <i className="fas fa-signal me-2"></i>
                                            Có sẵn
                                        </span></div>
                                    <div className={styles.project_title}>
                                        <a href="/home/product">Dịch vụ nhà thông minh giá rẻ</a>
                                    </div>
                                    <div className={styles.project_meta_info}>
                                        <i className="far fa-quote-left me-2"></i>
                                        Trục liên thông là nền tảng kết nối, chia sẻ dữ liệu giữa các hệ thống thông tin phục vụ chỉ đạo, điều hành của toàn trường; Kết nối, chia sẻ dữ liệu giữa các hệ thống của Trường với Bộ                                    </div>
                                    <div className={styles.project_footer}>
                                        <div className={styles.project_price}></div>
                                        <a className={styles.btn} href="/home/product">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.project_column}>
                            <div className={styles.project_grid}>
                                <div className={styles.project_header}>
                                    <span>
                                        <img src={require("../../assets/img/project3.webp")} alt="project 3" />
                                    </span>
                                </div>
                                <div className={styles.project_content}>
                                    <div className={styles.project_meta}>
                                        <span className={styles.category}>App</span>
                                        <span className={styles.label}>
                                            <i className="fas fa-signal me-2"></i>
                                            Có sẵn
                                        </span></div>
                                    <div className={styles.project_title}>
                                        <a href="/home/product">Máy chấm công thông minh</a>
                                    </div>
                                    <div className={styles.project_meta_info}>
                                        <i className="far fa-quote-left me-2"></i>
                                        Trục liên thông là nền tảng kết nối, chia sẻ dữ liệu giữa các hệ thống thông tin phục vụ chỉ đạo, điều hành của toàn trường; Kết nối, chia sẻ dữ liệu giữa các hệ thống của Trường với Bộ                                    </div>
                                    <div className={styles.project_footer}>
                                        <div className={styles.project_price}></div>
                                        <a className={styles.btn} href="/home/product">
                                            Xem chi tiết
                                            <i className="fa fa-long-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer_project}>
                        <div className={styles.text_center}>
                            Bạn muốn tìm hiểu thêm về chúng tôi, về các dự án chúng tôi đang nghiên cứu?
                            <a className={styles.text_style} href="/project">Tất cả sản phẩm</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.about_padding}>
                <div className={styles.container_about}>
                    <div className={styles.row_about}>
                        <div className={styles.about_column_left}>
                            <div className={styles.about_img}>
                                <span>
                                    <img src={require("../../assets/img/about.webp")} alt="about" />
                                </span>
                            </div>
                        </div>
                        <div className={styles.about_column_right}>
                            <div className={styles.about_content}>
                                <div className={styles.about_heading}>
                                    <h2 className={styles.sub_heading}>Tại sao lại là OpenLAB</h2>
                                    <p className={styles.heading}>Một số lý do bạn nên hợp tác với chúng tôi</p>
                                </div>
                                <div className={styles.about_features}>
                                    <div className={styles.feature_item}>
                                        <div className={styles.feature_icon}>
                                            <i className="fa-solid fa-people-group"></i>
                                        </div>
                                        <div className={styles.feature_text}>
                                            <h4>Khách hàng là trung tâm</h4>
                                            <p>A.I-Soft luôn hướng tới việc đem lại những trải nghiệm tốt nhất cho khách hàng, tiếp thu mọi ý kiến đóng góp để cải thiện chất lượng sản phẩm.</p>
                                        </div>
                                    </div>

                                    <div className={styles.feature_item}>
                                        <div className={styles.feature_icon}>
                                            <i className="fa-solid fa-certificate"></i>
                                        </div>
                                        <div className={styles.feature_text}>
                                            <h4>Chất lượng dịch vụ</h4>
                                            <p>A.I-Soft luôn tiên phong trong việc ứng dụng những tiến bộ Khoa học vào việc phát triển ứng dụng, nhu cầu thị trường hướng tới hiệu quả người dùng.</p>
                                        </div>
                                    </div>

                                    <div className={styles.feature_item}>
                                        <div className={styles.feature_icon}>
                                            <i className="fa-solid fa-house-user"></i>
                                        </div>
                                        <div className={styles.feature_text}>
                                            <h4>Nhiệt huyết, trách nhiệm trong công việc</h4>
                                            <p>Đội ngũ A.I-Soft luôn khắt khe trong từng chi tiết nhỏ và lấy người dùng làm trung tâm.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.customer_padding}>
                <div className={styles.container_customer}>
                    <div className={styles.content_customer}>
                        <div className={styles.section_heading}>
                            <h2 className={styles.sub_heading}>Đối tác</h2>
                            <p className={styles.heading}>
                                Các đơn vị đang hợp tác cùng chúng tôi
                            </p>
                        </div>
                    </div>
                    <div className={styles.row_customer}>
                        <div className={styles.owl_customer}>
                            <div className={styles.owl_stage}>
                                <div className={styles.img_owl}>
                                    <div className={styles.img}>
                                        <img src={require("../../assets/img/apd.webp")} alt="apd" />
                                    </div>
                                    <div className={styles.img}>
                                        <img src={require("../../assets/img/dav.webp")} alt="dav" />
                                    </div>
                                    <div className={styles.img}>
                                        <img src={require("../../assets/img/hanu.webp")} alt="hanu" />
                                    </div>
                                    <div className={styles.img}>
                                        <img src={require("../../assets/img/vktbd.webp")} alt="vktbd" />
                                    </div>
                                    <div className={styles.img}>
                                        <img src={require("../../assets/img/vwa.webp")} alt="vwa" />
                                    </div><div className={styles.img}>
                                        <img src={require("../../assets/img/ft.webp")} alt="ft" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.owl_nav}>

                            </div>
                            <div className={styles.owl_dots}>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.contact_padding}>
                <div className={styles.container_contact}>
                    <div className={styles.image_contact}>
                        <span >
                            <img src={require("../../assets/img/contact.webp")} alt="contact" />
                        </span>
                    </div>
                    <div className={styles.info_contact}>
                        <div className={styles.content_contact}>
                            <h2 className={styles.header_content}>Liên hệ OpenLAB</h2>
                            <p className={styles.main_content}>Hãy liên hệ với chúng tôi bất cứ khi nào bạn cần. Chúng tôi sẽ phản hồi trong thời gian sớm nhất!</p>
                            <a className={styles.footer_content} href="/home/contact">Liên hệ</a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    )
}
