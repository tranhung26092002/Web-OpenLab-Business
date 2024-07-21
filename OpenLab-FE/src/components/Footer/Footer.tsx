import React, { Fragment } from 'react'
import styles from './Footer.module.scss'

type Props = {}

const Footer = (props: Props) => {
    return (
        <Fragment>
            <section className={styles.footer}>
                <div className={styles.info_footer}>
                    <div className={styles.container_footer}>
                        <div className={styles.row_footer}>
                            <div className={styles.footer_introduce}>
                                <div className={styles.footer_widget}>
                                    <div className={styles.footer_links}>
                                        <span>
                                            <img alt="logo" src={require("../../assets/img/Logo-01.png")} />
                                        </span>
                                        <a href="/">Công ty Cổ phần Công nghệ OpenLAB</a>
                                    </div>
                                    <p className={styles.mt}>Mục tiêu trở thành đơn vị cung cấp các giải pháp chuyển đổi số giáo dục hàng đầu trong khu vực.</p>
                                </div>
                            </div>
                            <div className={styles.footer_location}>
                                <div className={styles.footer_widget}>
                                    <h5 className={styles.widget_title}>Địa chỉ</h5>
                                    <ul className={styles.list_unstyled}>
                                        <li>
                                            <i className="fa fa-phone-alt me-2"></i>
                                            <a href="tel:+84856606961">(+84) 12 345 5679</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-envelope me-2"></i>
                                            <a href="mailto:vanhung.tran@openlab.com.vn">vanhung.tran@openlab.com.vn</a>
                                        </li>
                                        <li>
                                            <i className="fa fa-map-marker-alt me-2"></i>
                                            <a href="https://www.google.com/maps/place/H%E1%BB%8Dc+vi%E1%BB%87n+C%C3%B4ng+ngh%E1%BB%87+B%C6%B0u+ch%C3%ADnh+vi%E1%BB%85n+th%C3%B4ng/@20.9762126,105.7855274,15.75z/data=!4m14!1m7!3m6!1s0x3135adb12c98e4d1:0x8d63bd9b07d93b1e!2zQ8O0bmcgdHkgQ-G7lSBwaOG6p24gQ8O0bmcgbmdo4buHIEEuSS1TT0ZU!8m2!3d20.9763638!4d105.7893192!16s%2Fg%2F11jsk436km!3m5!1s0x3135accdd8a1ad71:0xa2f9b16036648187!8m2!3d20.9809035!4d105.7874379!16s%2Fg%2F12168p16?entry=ttu" target="_blank" rel="noreferrer">Tầng 8, tòa A2, Học viện Công nghệ Bưu chính Viễn thông, Văn Quán, Hà Đông, HN</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.footer_discover}>
                                <div className={styles.footer_widget}>
                                    <h5 className={styles.widget_title}>Khám phá</h5>
                                    <ul className={styles.list_unstyled}>
                                        <li>
                                            <a href="#">Giới thiệu</a>
                                        </li>
                                        <li>
                                            <a href="#">Blog</a>
                                        </li>
                                        <li>
                                            <a href="#">Liên hệ</a>
                                        </li>
                                        <li>
                                            <a href="#">Hỗ trợ</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.footer_project}>
                                <div className={styles.footer_widget}>
                                    <h5 className={styles.widget_title}>Sản phẩm</h5>
                                    <ul className={styles.list_unstyled}>
                                        <li>
                                            <a href="#">Super App SLink</a>
                                        </li>
                                        <li>
                                            <a href="#">Đại học số</a>
                                        </li>
                                        <li>
                                            <a href="#">Hệ thống Blockchain</a>
                                        </li>
                                        <li>
                                            <a href="#">Tất cả sản phẩm</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.btm_footer}>
                    <div className={styles.content}>
                        <p className={styles.text_center}>
                            © 2022 Bản quyền thuộc về
                            <a href="/"> OpenLAB</a>
                        </p>
                    </div>
                </div>
                <div className={styles.fixed_btm_top}>
                    <a href="#top-header" className={styles.croll_to_top}>
                        <i className="fa fa-angle-up"></i>
                    </a>
                </div>
            </section>
        </Fragment>
    )
}

export default Footer;