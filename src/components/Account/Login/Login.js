import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from '~/pages/Register/RegisterPage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '~/redux/userSlice'; // action

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const handelOnchangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handelOnchangePassword = (e) => {
        setPassword(e.target.value);
    };

    // bấm enter sẽ bắt được hàm handleSubmit
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5001/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const user = { username, password };

                // Gửi action để lưu thông tin người dùng vào redux store
                dispatch(loginSuccess(user));

                // Lưu trạng thái đăng nhập vào sessionStorage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else if (response.status === 401 || 404 || 409 || 500){
                const errorData = await response.json();
                console.log(errorData.error);
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Lỗi: ', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('text-login')}>Login</div>
                <p style={{color: "red"}}>{error}</p>
                <div className={cx('email')}>
                    <input
                        onKeyPress={handleKeyPress}
                        placeholder="Tên đăng nhập"
                        type="text"
                        value={username}
                        onChange={handelOnchangeUsername}
                    />
                </div>
                <div className={cx('password')}>
                    <span onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? (
                            <FontAwesomeIcon icon={faEye} className={cx('eye')} />
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} className={cx('eye')} />
                        )}
                    </span>
                    <input
                        placeholder="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handelOnchangePassword}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className={cx('submit')}>
                    <button type="submit" onClick={handleSubmit}>
                        Đăng nhập
                    </button>
                </div>
                <div className={cx('text-register')}>
                    <span className={cx('text')}>Bạn chưa có tài khoản?</span>
                    <span className={cx('register')}>
                        <Link to="/register">Đăng ký ngay</Link>
                    </span>
                </div>
    
                {/* truyen du lieu */}
                {/* <HomePage userData={userData} /> */}
    
                <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default Login;
