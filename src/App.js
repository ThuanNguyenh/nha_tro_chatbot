import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout} from './components/Layout';
import { Fragment, useEffect } from 'react';
import {Action} from 'history';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/userSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Kiem tra trang thai dang nhap trong sessionStorage
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const userData = JSON.parse(sessionStorage.getItem('user'));

        if (isLoggedIn && userData) {
            // neu co trang thai dang nhap, cap nhat trang thai dang nhap trong redux store
            dispatch(loginSuccess(userData));
        }
    }, [dispatch])


    return (
        <Router history={Action}>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout
                            
                        if (route.layout) {
                          Layout = route.layout
                        } else if (route.layout === null) {
                          Layout = Fragment
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
