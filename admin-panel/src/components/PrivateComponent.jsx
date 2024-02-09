import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const PrivateComponent = ({children}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/', {replace: true});
        }
    }, []);

    return children;
}

export default PrivateComponent;