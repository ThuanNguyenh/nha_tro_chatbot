import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { faFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Route, Routes, Link } from 'react-router-dom';
import LoginPage from '~/pages/Login/LoginPage';

const cx = classNames.bind(styles);

function Register() {
    const [error, setError] = useState([]);

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        address: '',
        phone: '',
    });
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:5001/postRegister`, formData);

            if (response.status === 200) {
                alert('Đăng ký thành công');
                navigate('/login');
            }
        } catch (error) {
            // console.error('Error: ', error);
            if (error.response && error.response.data) {
                const eData = await error.response.data;
                setError(eData.message);
            }
        }
    };

    return (
        <div className={cx('wrapper-register')}>
            <div className={cx('container')}>
                <div className={cx('caption')}>Đăng ký tài khoản</div>

                {error && error.length > 0 && ( 
                    <div>
                        <div className={cx('error')}>
                            <p className={cx('e')}>{error}</p>
                        </div>
                    </div>
                )}

                <div className={cx('name')}>
                    <input
                        placeholder="Tên đăng nhập"
                        name="username"
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className={cx('password')}>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className={cx('password')}>
                    <input
                        placeholder="Mật khẩu"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className={cx('password')}>
                    <input
                        placeholder="Địa chỉ"
                        name="address"
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className={cx('phone')}>
                    <input
                        placeholder="Số điện thoại"
                        name="phone"
                        type="text"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>

                <div className={cx('checked')}>
                    <input type="checkbox" />
                    <span className={cx('clause')}>Đồng ý với điều khoản và chính sách của DaNanghouse</span>
                </div>

                <div className={cx('btn-submit')}>
                    <button type="submit" onClick={handleSubmit}>
                        ĐĂNG KÝ
                    </button>
                </div>

                <div className={cx('or')}>
                    <hr />
                    <span>Hoặc đăng nhập bằng</span>
                    <hr />
                </div>

                <div className={cx('option')}>
                    <nav className={cx('navbar')}>
                        <div className={cx('container-fluid')}>
                            <ul className={cx('navbar-nav')}>
                                <li className={cx('nav-item')}>
                                    <button>
                                        <FontAwesomeIcon icon={faFacebook} className={cx('fb-icon')} />
                                        <span>Facebook</span>
                                    </button>
                                </li>
                                <li className={cx('nav-item')}>
                                    <button>
                                        <FontAwesomeIcon icon={faGoogle} className={cx('google-icon')} />
                                        <span>Google</span>
                                    </button>
                                </li>
                                <li className={cx('nav-item')}>
                                    <button>
                                        <FontAwesomeIcon icon={faApple} className={cx('apple-icon')} />
                                        <span> Apple ID</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className={cx('login-now')}>
                    <span>Đã có tài khoản? </span>
                    <Link to="/login">Đăng nhập ngay</Link>
                </div>

                <Routes>
                    <Route path="login" element={<LoginPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default Register;
