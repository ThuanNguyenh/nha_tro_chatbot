import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faRotateLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import './AddRoom.scss';
import { useState } from 'react';
import axios from 'axios';

function AddRoom() {

    const [data, setData] = useState({
        roomnumber: '',
        member: '',
        price: '',
        image: '',
        description: '',
        acreage: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async() => {
        try {
            const res = await axios.post(`http://localhost:5001/rooms-create`, data);

            if (res.status === 200) {
                alert('Them phong thanh cong');
            }

        } catch (error) {
            console.log("loi roi: ", error)
        }
    };

    return (
        <div className="container">
            <div className="first">
                <div className="row g-0 text-center">
                    <div className="text col-sm-6 col-md-6 d-flex justify-content-start">Thêm Phòng</div>
                    <div className="button col-6 col-md-6 d-flex justify-content-end">
                        <Link className="back me-2">
                            <button type="button" className="b-back btn ">
                                <FontAwesomeIcon icon={faRotateLeft} className="icon me-1" />
                                <span className="t-back">Quay lại</span>
                            </button>
                        </Link>

                        <Link className="save">
                            <button type="button" className="b-save btn" onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faFloppyDisk} className="icon me-1" />
                                <span className="t-save">Lưu</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr></hr>
            <form className='form-add-room'>
                <div className="one row g-0 text-center d-flex justify-content-between">
                    <div className="room-number col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                Phòng số *
                            </label>
                            <input type="text" className="form-control" id="roomNumber" name='roomnumber' onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="house col-6 col-md-6">
                        <div className="action mb-3 d-flex">
                            <label htmlFor="roomNumber" className="form-label col-3  text-start">
                                Nhà *
                            </label>
                            <select className="form-select" id="roomNumber" aria-label="Default select example">
                                <option selected>Tầng 1</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="two row g-0 text-center d-flex justify-content-between">
                    <div className="price col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                    Đơn giá *
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Amount (to the nearest dollar)"
                                    name='price'
                                    onChange={handleChange}
                                />
                                <span className="input-group-text">VNĐ</span>
                            </div>
                        </div>
                    </div>
                    <div className="person col-6 col-md-6">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="form-label col-3  text-start">
                                    số lượng tối đa *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    name='member'
                                    onChange={handleChange}
                                />
                                <span className="input-group-text" id="basic-addon2">
                                    Người
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="two row g-0 text-center d-flex justify-content-between">
                    <div className="price col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                    Diện tích *
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Amount (to the nearest dollar)"
                                    name='acreage'
                                    onChange={handleChange}
                                />
                                <span className="input-group-text">M</span>
                            </div>
                        </div>
                    </div>
                    <div className="person col-6 col-md-6">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="form-label col-3  text-start">
                                    Địa chỉ * 
                                </label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" name='address' onChange={handleChange}></textarea>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="two row g-0 text-center d-flex justify-content-between">
                    <div className="price col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                    Cho thuê *
                                </label>

                                <input type="checkbox" className="form-check me-2" />
                                <span className="me-2">Nam</span>

                                <input type="checkbox" className="form-check mx-2" />
                                <span className="">Nữ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="two row g-0 text-center d-flex justify-content-between">
                    <div className="price col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                    Mô tả
                                </label>

                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" name='description' onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="person col-12 col-md-6">
                        <div className="number mb-3 d-flex">
                            <div className="input-group mb-3">
                                <label htmlFor="roomNumber" className="form-label col-3  text-start">
                                    Hình ảnh
                                </label>

                                <input type="text" className="file form-control" name='image' onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddRoom;
