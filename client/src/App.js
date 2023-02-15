import "./App.css";
import Counter from "./components/CounterUser";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./AuthContext/AuthContext.js";
import HomePage from "./components/HomePage";
import UserLogin from "./components/UserLogin";
import Login from "./components/Login";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<Counter />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <UserLogin />
            </PrivateRoutes>
          }
        ></Route>
        <Route
          path="/updateProfile"
          element={
            <PrivateRoutes>
              <UpdateProfile />
            </PrivateRoutes>
          }
        ></Route>

        <Route path="/Login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
