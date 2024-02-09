import Layout from "./Layout";
import {useLocation} from "react-router-dom";
import Login from './pages/Auth/Login';
import {useSelector} from "react-redux";

const Dashboard = () => {
    let {pathname} = useLocation();
    const renderElement = () => {
        if (pathname === "/") {
            return <Login></Login>
        } else {
            return <Layout></Layout>
        }
    }

    return (
        <>

            {
                renderElement()
            }

        </>
    );
};


export default Dashboard;
