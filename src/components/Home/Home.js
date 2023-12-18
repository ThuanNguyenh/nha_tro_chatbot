import './home.scss';
import image from '~/assets';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseFire, faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebookF, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/roomsList`);
                if (!response.ok) {
                    throw new Error(`yeu cau khong thanh cong: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('da xay ra loi: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="box-content">
            {/* banner */}
            <div className="banner mx-5">
                <img src='https://png.pngtree.com/background/20210710/original/pngtree-campus-cloud-construction-aircraft-doctor-hat-banner-picture-image_1023623.jpg' className="img-fluid" alt="..." />
                <form className="search d-flex " role="search">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Tra cứu phòng trọ..."
                        aria-label="Search"
                    />
                    <Tippy content="Tìm kiếm">
                        <button className="btn-search" type="submit">
                            <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
                        </button>
                    </Tippy>
                </form>
            </div>

            {/* link */}
            <div className="link text-center mx-5 mt-5">
                <div className="txt-link">
                    <p>Phổ Biến</p>
                </div>
                <div className="row align-items-center">
                    <div className="col">
                        <FontAwesomeIcon className="me-2" icon={faGoogle} />
                        Google
                    </div>
                    <div className="col">
                        <FontAwesomeIcon className="me-2" icon={faFacebookF} />
                        Facebook
                    </div>
                    <div className="col">
                        <FontAwesomeIcon className="me-2" icon={faTwitter} />
                        Twtter
                    </div>
                    <div className="col">
                        <FontAwesomeIcon className="me-2" icon={faInstagram} />
                        Instagram
                    </div>
                </div>
            </div>

            {/* what */}
            <div className="why mx-5 mt-5">
                <div className="text-why">
                    <p className="Why">Tại sao lại chọn DaNangHouse?</p>
                </div>
                <div className="container text-center">
                    <div className="row row-cols-1 row-cols-lg-4">
                        <div className="col">
                            <div className="p-0">
                                <div className="card mb-3" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <FontAwesomeIcon className="famessage" icon={faMessage} />
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-0">
                                <div className="card mb-3" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <FontAwesomeIcon className="famessage" icon={faMessage} />
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-0">
                                <div className="card mb-3" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <FontAwesomeIcon className="famessage" icon={faMessage} />
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-0 mb-3">
                                <div className="card" style={{ width: '18rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <FontAwesomeIcon className="famessage" icon={faMessage} />
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                        <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* room new */}
            <div className="new-room mx-5 mt-5">
                <div className="update text-center">
                    <p className="txt-1">Cập Nhật Mới nhất</p>
                </div>
                <div className="container text-center">
                    <div className="row row-cols-1 row-cols-lg-3">
                        {data
                            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                            .slice(0, 3)
                            .map((item) => (
                                <div key={item.id} className="col">
                                    <div className="p-0">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <img
                                                    style={{ objectFit: 'cover' }}
                                                    src={item.image}
                                                    class="card-img-top"
                                                    alt="..."
                                                />

                                                <h6 className="card-subtitle mb-2 mt-3 text-body-secondary">
                                                    {item.address}
                                                </h6>
                                                <h6 className="card-subtitle mb-2 mt-3 text-body-secondary">
                                                    {item.price} $
                                                </h6>
                                                <p className="card-text">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* room empty */}
            <div className="why mx-5 mt-5">
                <div className="text-why">
                    <p className="Why">Danh Sách Phòng Đang Trống</p>
                </div>
                <div className="container text-center">
                    <div className="row row-cols-1 row-cols-lg-4">
                        {data
                            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                            .slice(0, 4)
                            .map((item) => (
                                <div key={item.id} className="col">
                                    <div className="p-0">
                                        <div className="card mb-3" style={{ width: '18rem' }}>
                                            <div className="card-body">
                                                <img
                                                    style={{ objectFit: 'cover' }}
                                                    src={item.image}
                                                    class="card-img-top"
                                                    alt="..."
                                                />
                                                <h6 className="card-subtitle mb-1 mt-3 d-flex justify-content-start">
                                                    {item.description}
                                                </h6>
                                                <div className="profile d-flex justify-content-between">
                                                    <p className="card-link">{item.address}</p>
                                                    <p className="card-link">{item.price} $</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="footer mt-5">
                <div className="row g-0 text-center border">
                    <div className="logo col-sm-6 col-md-6 d-flex justify-content-center align-items-center mt-5 mb-5">
                        <Link className="navbar-brand me-4" to="/">
                            <FontAwesomeIcon className="icon me-2" icon={faHouseFire} />
                            <div className="logo-txt">
                                <span className="first">DaNang</span>
                                <span className="second">House</span>
                            </div>
                        </Link>
                        <div className="caption">
                            Dân cư an ninh, nhà trọ hiện đại. <br />
                            Sự lựa chọn của mọi người
                        </div>
                    </div>
                    <div className="profile col-sm-6 col-md-6 border">
                        <div className="link mx-5 mb-5 mt-5">
                            <div className="row align-items-start">
                                <div className="col">
                                    <p className="service">Service</p>
                                    <p className="email">Email Marketing</p>
                                    <p className="campaigns">Campaigns</p>
                                </div>
                                <div className="col">
                                    <p className="service">About</p>
                                    <p className="email">Our Story</p>
                                    <p className="campaigns">Benefits</p>
                                </div>
                                <div className="col">
                                    <p className="service">Follow us</p>
                                    <div className="us">
                                        <FontAwesomeIcon className="icon-f" icon={faFacebookF} />
                                        <FontAwesomeIcon className="icon-f mx-3" icon={faTwitter} />
                                        <FontAwesomeIcon className="icon-f" icon={faInstagram} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
