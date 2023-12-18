import { useState, useEffect } from 'react';

function UserManager() {
    //  state để lưu dữ liệu tưf Api
    const [data, setData] = useState([]);

    useEffect(() => {
        // Hàm fetchData sẽ đuowcj gọi sau khi component được mount
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/usersList`);
                if (!response.ok) {
                    throw new Error(`yeu cau khong thanh cong: ${response.status}`);
                }

                // Parse dữ liệu phản hồi thành JSON
                const data = await response.json();
                // console.log(data);
                // // Lưu dữ liệu vào state
                setData(data);
            } catch (error) {
                console.error('loi: ', error);
            }
        };

        // Gọi hàm fetchData để lấy dữ liệu
        fetchData();
    }, []); // Tham số thứ hai là một mảng trống, để đảm bảo useEffect chỉ chạy một lần sau khi component được mount

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên đăng nhập</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>
                                <button type="button" class="btn btn-primary me-3">
                                    Edit
                                </button>
                                <button type="button" class="btn btn-danger">
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManager;
