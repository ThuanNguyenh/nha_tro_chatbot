import { useState } from 'react';
import './sidebar.scss';
import { Link } from 'react-router-dom';
// import UserManagerPage from '~/pages/UserManager/UserManagerPage';
// import ListOrder from '~/pages/ListOrderPage';

const listSidebar = [
    // { id: 1, name: 'Thống kê' },
    { id: 1, name: 'Phòng' },
    { id: 2, name: 'Khách hàng' },
    { id: 3, name: 'Danh sách đặt phòng' },
    { id: 4, name: 'Dịch vụ' },
    { id: 5, name: 'Lịch sử thanh toán' },
];

const links = [
    // { id: 1, link: "statistics"},
    { id: 1, link: 'list-room' },
    { id: 2, link: 'user-manager' },
    { id: 3, link: 'list-order' },
    { id: 4, link: '' },
    { id: 5, link: '' },
];

function Sidebar() {
    const [listId, setListId] = useState(1);

    return (
        <div className="sidebar col-2 border">
            <ul>
                {listSidebar.map((list) => (
                    <li style={list.id === listId ? {background: '#5bc0de', paddingLeft: '30px'} : {}} key={list.id} onClick={() => setListId(list.id)}>
                        <Link
                            style={list.id === listId ? {fontWeight: 'bold', color: '#d9534f', fontSize: '1.1rem'} : {color: '#fff', fontSize: '1.1rem'}}
                            to={links[list.id - 1].link ? `../${links[list.id - 1].link}` : ''}
                        >
                        {list.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
