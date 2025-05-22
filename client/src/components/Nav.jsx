import { Link } from "react-router-dom";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <ul>
      <Link to="/" data-testid={TEST_ID.linkToHome}></Link>
      <Link to="/user" data-testid={TEST_ID.linkToUsers}></Link>
    </ul>
  );
};

export default Nav;
