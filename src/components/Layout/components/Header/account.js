import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Routes, Link, Route, useNavigate } from 'react-router-dom';
import LoginPage from '~/pages/Login/LoginPage';
import UserManagerPage from '~/pages/UserManager/UserManagerPage';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '~/redux/userSlice';

function Account() {
    const user = useSelector((state) => state.user.userData);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Thực hiện đăng xuất bằng cách gọi hành động logout
        dispatch(logout());

        // xóa trạng thái đăng nhập từ sessionStorage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');

        // Điều hướng về trang đăng nhập
        navigate('/login');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className="account me-2">
                    <div className="dropdown">
                        <button
                            className="btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Xin chào, {user.username} !
                        </button>
                        <ul className="dropdown-menu mt-2">
                            <li>
                                <Link to="/list-room" className='manager'>Admin</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className='btn-out'>Đăng xuất</button>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="noUser me-2">
                    <Link to="/login">
                        <button className="btn-log text-center">Đăng nhập</button>
                    </Link>
                </div>
            )}

            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="user-manager" element={<UserManagerPage />} />
            </Routes>
        </div>
    );
}

export default Account;
