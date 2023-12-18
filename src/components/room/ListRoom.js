import { useEffect, useState } from 'react';
import './listRoom.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenToSquare, faSearch, faUser, faXmark, faAdd, faBed } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';

const lists = [
    { id: 1, name: 'Trạng thái phòng' },
    { id: 2, name: 'Trạng thái phí' },
];
const action1 = [
    { id: 1, action: 'Còn trống' },
    { id: 2, action: 'Đã cho thuê' },
];

const action2 = [
    { id: 1, action: 'Đã thu phí' },
    { id: 2, action: 'Chưa thu phí' },
];

const action3 = [
    { id: 1, action: 'Thêm phòng nhanh', color: '#5bc0de', icon: faAdd },
    { id: 2, action: 'Thêm phòng', color: '#26B99A', icon: faBed, Link: './add-room' },
    { id: 3, action: 'sửa nhà', color: '#337ab7', icon: faPenToSquare },
    { id: 4, action: 'Xóa nhà', color: '#d9534f', icon: faXmark },
];

function ListRoom() {
    const [listId, setListId] = useState();

    const renderActions = (listId) => {
        if (listId === 1) {
            return action1.map((ac1) => <li key={ac1.id}>{ac1.action}</li>);
        } else {
            return action2.map((ac2) => <li key={ac2.id}>{ac2.action}</li>);
        }
    };

    // fetchData - roomsList
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

    // handle delete room
    const handleDelete = (id) => {
        fetch(`http://localhost:5001/rooms-delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {

            if (!res.ok) {
                alert(`xóa không thành công: ${id}`)
                throw  new Error(`Xóa không thành công: ${res.status}`,)
            }

            // cập nhật trạng thái với danh sách phong mới
            setData(data.filter(item => item.id !== id));
            alert('xóa thành công');
        })
        .catch(e => console.error("xóa lỗi rồi: ", e));
    };

    return (
        <div className="container">
            <div className="wrap d-flex">
                <div className="status">
                    {lists.map((list) => (
                        <button
                            className="btn btn-light border dropdown-toggle me-4"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            key={list.id}
                            onClick={() => setListId(list.id)}
                        >
                            {list.name}
                        </button>
                    ))}
                    <ul className="dropdown-menu text-center">
                        <Link>{renderActions(listId)}</Link>
                    </ul>
                </div>
                <nav className="search">
                    <div className="container-fluid">
                        <form className="form d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Phòng"
                                aria-label="Search"
                            />
                            <button className="btn-search btn" type="submit">
                                <FontAwesomeIcon icon={faSearch} className="icon" />
                                <span className="se">Tìm kiếm</span>
                            </button>
                        </form>
                    </div>
                </nav>
            </div>
            <div className="room-status">
                <span className="me-2">Còn trống 1</span>|<span className="mx-2">Đã cho thuê 1</span>|
                <span className="mx-2">Chưa thu phí</span>
            </div>
            <div className="add-room d-flex justify-content-end">
                <Link to="/list-room/add-house">
                    <button type="button" className="btn me-2">
                        <FontAwesomeIcon icon={faHouse} className="icon" />
                        <span className="add">Thêm nhà</span>
                    </button>
                </Link>
            </div>
            <div className="list-room">
                <div className="show-floor">
                    <button type="button" className="btn btn-light border">
                        Tầng 1
                    </button>
                </div>
                <div className="action">
                    <div className="row g-0">
                        <div className="status col-sm-6 col-md-6">
                            <span className="me-2">Còn trống 1</span>|<span className="mx-2">Đã cho thuê 1</span>|
                            <span className="mx-2">Chưa thu phí</span>
                        </div>
                        <div className="chose col-6 col-md-6 d-flex justify-content-end">
                            {action3.map((ac3) => (
                                <Link to={ac3.Link}>
                                    <button
                                        key={ac3.id}
                                        type="button"
                                        className="btn border me-2"
                                        style={{ background: ac3.color, color: 'white' }}
                                    >
                                        <FontAwesomeIcon icon={ac3.icon} className="icon" />
                                        <span>{ac3.action}</span>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <hr></hr>

                <div class="container">
                    <div class="row row-cols-1 row-cols-lg-5 g-lg-4">
                        {data.map((item) => (
                            <div key={item.id} className="col me-4 card">
                                <div className="card-body">
                                    <div className="card-title">
                                        <span className="me-1">
                                            <FontAwesomeIcon icon={faHouse} />
                                        </span>
                                        <span className="number">{item.roomnumber}</span>
                                    </div>
                                    <Link>
                                        <button type="button" className="add btn border ">
                                            Thêm khách
                                        </button>
                                    </Link>
                                    {/* <div className="name-custommer">
                                        <FontAwesomeIcon icon={faUser} className="icon" />
                                        <span className="name">Thuan Nguyen</span>
                                    </div> */}
                                    <div className="name-custommer">
                                        <FontAwesomeIcon icon={faUser} className="icon" />
                                        <span className="name">{item.member}</span>
                                    </div>

                                    <div className="price">
                                        <FontAwesomeIcon icon={faMoneyBill1} className="icon" />
                                        <span className="number">{item.price}</span>
                                    </div>

                                    <div className="actions d-flex justify-content-between">
                                        <Link className="card-link">
                                            <button type="button" className="edit btn border">
                                                {/* <FontAwesomeIcon icon={faPenToSquare} className="icon" /> */}
                                                <span className="edit">Sửa</span>
                                            </button>
                                        </Link>
                                        <Link className="card-link">
                                            <button type="button" className="remove btn border" onClick={() => handleDelete(item.id)}>
                                                {/* <FontAwesomeIcon icon={faXmark} className="icon" /> */}
                                                <span className="remove">Xóa</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListRoom;
