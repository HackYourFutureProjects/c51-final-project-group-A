import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import ResultPage from "./pages/ResultPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import AuthPage from "./pages/AuthPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default App;
