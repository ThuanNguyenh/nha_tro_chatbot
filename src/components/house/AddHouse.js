import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {faRotateBack, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'
import './house.scss'

function AddHouse() {
    return (
        <div className="container">
            <div className="first">
                <div className="row g-0 text-center">
                    <div className="text col-sm-6 col-md-6 d-flex justify-content-start">Thêm Nhà</div>
                    <div className="button col-6 col-md-6 d-flex justify-content-end">
                        <Link className="back me-2">
                            <button type="button" className="b-back btn ">
                                <FontAwesomeIcon icon={faRotateBack} className="icon me-1" />
                                <span className="t-back">Quay lại</span>
                            </button>
                        </Link>

                        <Link className="save">
                            <button type="button" className="b-save btn">
                                <FontAwesomeIcon icon={faFloppyDisk} className="icon me-1" />
                                <span className="t-save">Lưu</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr></hr>
            <form className="form-add-house">
            <div className="one row g-0 text-center d-flex justify-content-between">
                    <div className="room-number col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                Nhà *
                            </label>
                            <input type="text" className="form-control" id="roomNumber" />
                        </div>
                    </div>
                    <div className="house col-6 col-md-6">
                        <div className="action mb-3 d-flex">
                            <label htmlFor="roomNumber" className="form-label col-3  text-start">
                                Tỉnh/ Thành phố *
                            </label>
                            <select className="form-select" id="roomNumber" aria-label="Default select example">
                                <option selected>Thành phố Đà Nẵng</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="one row g-0 text-center d-flex justify-content-between">
                    <div className="room-number col-sm-6 col-md-5">
                        <div className="number mb-3 d-flex">
                            <label htmlFor="roomNumber" className="col-2 form-label me-3 text-start">
                                Quận/ huyện *
                            </label>
                            <select className="form-select" id="roomNumber" aria-label="Default select example">
                                <option selected>Tầng 1</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="house col-6 col-md-6">
                        <div className="action mb-3 d-flex">
                            <label htmlFor="roomNumber" className="form-label col-3  text-start">
                                Phường/ xã *
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
                <div className="one row g-0 text-center d-flex justify-content-between">
                    <div className="room-number col-sm-6 col-md-12">
                        <div className="number mb-3 d-flex">
                            <label htmlFor="roomNumber" className="col-1 form-label text-start">
                                Địa chỉ *
                            </label>
                            <input type="text" className="form-control" id="roomNumber" />
                        </div>
                    </div>
                </div>
            </form>
           
        </div>
    );
}

export default AddHouse;
