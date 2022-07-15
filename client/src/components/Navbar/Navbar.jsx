import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
function Navbar({ currentPage, isLogin, user, onLogout }) {
  return (
    <nav>
      {currentPage !== "checkout" && <Link to="/checkout">Checkout</Link>}
      {currentPage !== "homepage" && <Link to="/">Home</Link>}
      {currentPage !== "products" && <Link to="/products">Products</Link>}
      {!isLogin && <Link to="/login">Login</Link>}
      {isLogin && (
        <div className="user">
          Hello {user.username}
          <Button onClick={onLogout} text="logout" className="alt" />
        </div>
      )}
    </nav>
  );
}
export default Navbar;
