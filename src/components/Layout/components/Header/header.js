import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import 'tippy.js/dist/tippy.css';
import { faHouseFire} from '@fortawesome/free-solid-svg-icons';
import Account from './account';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid mx-4">
                    <Link className="navbar-brand" to="/">
                        <FontAwesomeIcon className="logo me-2" icon={faHouseFire} />
                        <div className="logo-txt">
                            <span className="first">DaNang</span>
                            <span className="second">House</span>
                        </div>
                    </Link>
                    <button
                        className="navbar-toggler d-md-none"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    {/* menu */}
                    <div className="menu d-none d-md-block">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Liên hệ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Bài viết
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">
                                    Disabled
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* menu */}

                    <div className="d-none d-md-block">
                        <Account />
                    </div>

                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                Offcanvas
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            {/* menu */}
                            <div className="menu">
                                <ul className="nav flex-column align-items-start">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">
                                            Trang chủ
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            Link
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            Link
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" aria-disabled="true">
                                            Disabled
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* menu */}

                            <div className="">
                                <Account />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            
        </>
    );
}

export default Header;
