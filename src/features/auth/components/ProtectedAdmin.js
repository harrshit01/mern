import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice.js";
import {selectUserInfo} from "../../user/userSlice.js"

function Protected({ children }) {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectUserInfo);

    if (!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if (user&&  userInfo?.role !== "admin") {
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children;
}

export default Protected;