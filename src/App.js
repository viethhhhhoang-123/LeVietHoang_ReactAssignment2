import {React} from "react";
import HomePage from "./pages/home/homepage";
import LoginPage from "./pages/login/loginpage";
import ProfilePage from "./pages/profile/profilepage";
import PostPage from "./pages/posts/postpage";
import DetailPostPage from "./pages/posts/detailpostpage";
import "./App.css"
import { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUpPage from "./pages/register/signuppage";
import CurrentUserContext from "./contexts/CurrentUserContext";

function App() {
  //all route compodent can be use currentUsers and setCurrentUsers
  // save token is a state. have another choice is save token on localstorage
  const [currentUsers, setCurrentUsers] = useState({
    token: null,
    userId: null
  })

  const handleLogout = () => {
    setCurrentUsers ({
      token: null,
      userId: null
    })
    document.location.href="/login";
  }

  const [language, setLanguage] = useState('vi');

  return (
    <Router>
      <CurrentUserContext.Provider value={{ currentUsers, setCurrentUsers }}>
        <div>
          <nav>
            <div className="w3-bar w3-white">
          
                <Link className="w3-bar-item w3-button" to="/home">Home</Link>
          
                <Link className="w3-bar-item w3-button" to="/posts">Posts</Link>
         
                <Link className="w3-bar-item w3-button" to="/profile">Profile</Link>
        
                <Link className="w3-bar-item w3-button"
                  to="/login"
                  id="login"
                  hidden={false}>
                  Login
                </Link>

                <Link
                  id="logout"
                  hidden={true}
                  onClick={handleLogout}>
                  Logout
                </Link>
            </div>
          </nav>
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/posts" exact>
              <PostPage />
            </Route>
            <Route path="/profile"
              render={() => {
                if (currentUsers.userId === null) {
                  return <LoginPage title="You must to login before use this page!" />
                }
                else {
                  return <ProfilePage />
                }
              }}></Route>
            <Route path="/login">
              <LoginPage
              />
            </Route>
            <Route path="/detail/:id">
              <DetailPostPage />
            </Route>
          </Switch>
          <Route path="/signup/">
            <SignUpPage />
          </Route>
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}
export default App;