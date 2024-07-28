import React, { Fragment } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import styles from './About.module.scss';

const About = () => {
    return (
        <Fragment>
            <Header />
            <div className={styles.container}>
                <div className={styles.intro}>
                    <h1>Giới thiệu công ty</h1>
                    <h3><span><a href="#">Trang chủ</a></span> / Giới thiệu </h3>
                </div>

                <div className={styles.intro_detail}>
                    <h1>CÔNG TY CỔ PHẦN CÔNG NGHỆ A.I-SOFT</h1>
                    <p>Được thành lập năm 2019, A.I-Soft là một Start-up với mục tiêu trở thành đơn vị cung cấp các giải pháp chuyển đổi số giáo dục hàng đầu tại Việt Nam và trong khu vực nhằm xoá nhoà khoảng cách trong giáo dục, nâng cao chất lượng thông qua cá nhân hoá quá trình đạo tạo, đào tạo mọi lúc mọi nơi, phục vụ đa dạng nhu cầu đào tạo của mọi người trên môi trường số.</p>
                    <p>A.I-Soft đã và đang xây dựng, triển khai những sản phẩm thiết thực nhằm tối ưu các quy trình/nghiệp vụ trong các trường Đại học từ khâu tuyển sinh, đào tạo đến xét duyệt tốt nghiệp và quản lý văn bằng chứng chỉ dựa trên công nghệ Blockchain.</p>
                </div>

                <div className={styles.field_active}>
                    <h2>Lĩnh vực hoạt động</h2>
                    <p>A.I-Soft cung cấp các nền tảng Đại học số nhằm đáp ứng mục tiêu cá nhân hoá quá trình đào tạo, đào tạo mọi lúc mọi nơi, đào tạo đồng thời quy mô lớn, phục vụ đa dạng nhu cầu đào tạo (đào tạo lại, đào tạo nâng cao, đào tạo suốt đời…)</p>
                    <ol>
                        <li>Phát triển nền tảng Đại học số</li>
                        <li>Phát triển và xây dựng Học liệu số</li>
                        <li>Phát triển phần mềm theo yêu cầu</li>
                        <li>Tư vấn giải pháp CĐS Giáo dục</li>
                    </ol>
                    <h2>Profile A.I-Soft</h2>
                    <p><a href="https://translate.google.com/?hl=vi&tab=TT&sl=vi&tl=en&op=translate" target="_blank">Tham khảo Profile - Công ty Cổ phần A.I-Soft</a></p>
                </div>

                <div className={styles.whyAISOFT}>
                    <div className={styles.img_left}>
                        <img src="photos/reasons_img.png" width="464px" height="357px" alt="reasons" />
                    </div>
                    <div className={styles.reasons_right}>
                        <h1>Tại sao lại là A.I-Soft</h1>
                        <p>Một số lý do bạn nên hợp tác với chúng tôi</p>
                        <div className={styles.reason1}>
                            <div className={styles.icon_left}>
                                <img src="./photos/users.png" alt="users" />
                            </div>
                            <div className={styles.text_reason_right}>
                                <h4>Khách hàng là trung tâm</h4>
                                <p>A.I-Soft luôn hướng tới việc đem lại những trải nghiệm tốt nhất cho khách hàng, tiếp thu mọi ý kiến đóng góp để cải thiện chất lượng sản phẩm.</p>
                            </div>
                        </div>
                        <div className={styles.reason2}>
                            <div className={styles.icon_left}>
                                <img src="./photos/certificate_file.png" alt="certificate" />
                            </div>
                            <div className={styles.text_reason_right}>
                                <h4>Chất lượng dịch vụ</h4>
                                <p>A.I-Soft luôn tiên phong trong việc ứng dụng những tiến bộ Khoa học vào việc phát triển ứng dụng, nhu cầu thị trường hướng tới hiệu quả người dùng.</p>
                            </div>
                        </div>
                        <div className={styles.reason3}>
                            <div className={styles.icon_left}>
                                <img src="./photos/headsetusers.png" alt="headset" />
                            </div>
                            <div className={styles.text_reason_right}>
                                <h4>Nhiệt huyết, trách nhiệm trong công việc</h4>
                                <p>Đội ngũ A.I-Soft luôn khắt khe trong từng chi tiết nhỏ và lấy người dùng làm trung tâm.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.giai_phap}>
                    <div className={styles.content_left}>
                        <h2>Các giải pháp tiên phong</h2>
                        <p>Các gói giải pháp được lựa chọn riêng theo từng nhu cầu, quy mô. <br /> Tiêu chuẩn khẳng định vị thế tiên phong của A.I-Soft</p>
                        <ul>
                            <li><i className="fas fa-check"></i> Phát triển nền tảng Đại học số</li>
                            <li><i className="fas fa-check"></i> Phát triển và xây dựng Học liệu số</li>
                            <li><i className="fas fa-check"></i> Phát triển phần mềm theo yêu cầu</li>
                            <li><i className="fas fa-check"></i> Tư vấn giải pháp CĐS Giáo dục</li>
                        </ul>
                    </div>
                    <div className={styles.img_right}>
                        <img src="photos/solutions_img.png" width="570px" height="410px" alt="solutions" />
                    </div>
                </div>

                <div className={styles.so_lieu}>
                    <ul>
                        <li>
                            <h3>10+</h3>
                            <p>Năm kinh nghiệm</p>
                        </li>
                        <li>
                            <h3>50+</h3>
                            <p>Khách hàng</p>
                        </li>
                        <li>
                            <h3>20+</h3>
                            <p>Dự án</p>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default About;
