import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LoginPage from "../login/loginpage";
const ProfilePage = () => {
    useEffect(() => {
        document.title = "Profile Page"
    }, []);

    const {currentUsers} = useContext(CurrentUserContext);

    const [profile, setProfile] = useState({
        name: '',
        id: null,
    })

    //Header, after login => profile page, need send to token -> web
    useEffect(() => {
        let didCancel = false;
        axios.get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${currentUsers.userId}`).then
            (respone => {
                if (!didCancel) {
                    setProfile({
                        name: respone.data.name,
                        id: respone.data.id,
                    })
                }
            });
        return () => didCancel = true;
    }, [currentUsers.userId, currentUsers.token]);

    return (
        <div>
            {/* <h3>Login success {currentUsers.token != null ? "yes" : "no"}</h3> */}
            <div>
                {profile.id}
            </div>
            <div>
                {profile.name}
            </div>
        </div>
    )
}
export default ProfilePage;