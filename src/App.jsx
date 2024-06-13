import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useState} from "react";
import "./App.css";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Layout from "./components/Layout.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  //  처음에는 로그인이 되어있을 수 없으니까 초기값은 null
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route
              index
              element={<Home user={user} />}
            />
            <Route
              path="/detail/:id"
              element={<Detail />}
            />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser}/>}
            />
          </Route>
          <Route
            path="/sign_in"
            element={<SignIn setUser={setUser}/>}
          />
          <Route
            path="/sign_up"
            element={<SignUp/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
