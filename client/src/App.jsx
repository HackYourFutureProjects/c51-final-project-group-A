import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import ResultPage from "./pages/ResultPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
