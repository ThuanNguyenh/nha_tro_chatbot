import Home from '~/pages/Home/HomePage';
import Contact from '~/pages/Contact';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login/LoginPage';
import Register from '~/pages/Register/RegisterPage';
import HeaderOnly from '~/components/Layout/HeaderOnly';
import UserManagerPage from '~/pages/UserManager/UserManagerPage';
import ListOrder from '~/pages/ListOrderPage';
import ListRoomPage from '~/pages/ListRoomPage';
import StatisticsPage from '~/pages/StatisticsPage';
import AddRoomPage from '~/pages/AddRoomPage';
import AddHousePage from '~/pages/AddHousePage';

// public routes
const publicRoutes = [
    {path: '/', component: Home, layout: HeaderOnly},
    {path: '/contact', component: Contact},
    {path: '/upload', component: Upload, layout: HeaderOnly},
    {path: '/login', component: Login, layout: null},
    {path: '/Register', component: Register, layout:null},
    {path: '/user-manager', component: UserManagerPage,},
    {path: '/list-order', component:ListOrder},
    {path: '/list-room', component:ListRoomPage},
    {path: '/statistics', component:StatisticsPage},
    {path: '/list-room/add-room', component:AddRoomPage},
    {path: '/list-room/add-house', component: AddHousePage}
];

// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
