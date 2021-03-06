import { useEffect, useRef, useState } from "react";
import { Route, useHistory, Router } from "react-router-dom";

import { apiInstance } from "./api/api";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/pages/Homepage/HomePage";
import Checkout from "./components/pages/Checkout/Checkout";
import Form from "./components/Form/Form";
import Products from "./components/pages/Products/Products";

import "./style.css";
import Login from "./components/pages/login/login";
function App() {
  const initalFood = {
    name: "",
    isVegan: false,
    ingredients: [],
    price: 0,
    img: "",
    categories: [],
    quantity: 1,
  };
  let History = useHistory();
  const spinnerRef = useRef();
  const [data, setData] = useState([]);
  const [food, setFood] = useState(initalFood);
  const [isEdit, setEdit] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [islogin, setlogin] = useState(false);
  const [user, setUser] = useState({});
  const [startCategory, setCategory] = useState("");
  const [cart, addToCart] = useState([]);

  const getData = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      const response = await apiInstance.get("/foods");
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    const updateCart = async () => {
      if (islogin) {
        await apiInstance.put("/users/me", { cart });
      }
    };
    updateCart();
  }, [cart]);
  useEffect(() => {
    if (islogin) {
      addToCart(user.cart);
    } else addToCart([]);
  }, [islogin]);

  const autoLogin = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await apiInstance.post("users/login", { token });
        apiInstance.defaults.headers = {
          AUTHORIZATION: `Bearer ${data.token}`,
        };
        setUser(data.user);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onLogout = async () => {
    try {
      await apiInstance.post("users/logout");
      window.localStorage.removeItem("token");
      setUser({});
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    setAdmin(false);
    getData();
    autoLogin();
  }, []);
  useEffect(() => {
    setlogin(user.username !== undefined);
    if (user.username !== undefined) {
      setAdmin(user.isAdmin);
      addToCart((prevState) => [...prevState, ...user.cart]);
    } else setAdmin(false);
  }, [user]);
  const editFood = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance.put(`foods/${food._id}`, food);
      getData();
      setFood(initalFood);
      setEdit(false);
    } catch (e) {
      console.error(e);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };

  const addFood = async () => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance.post("/foods", food);
      setFood(initalFood);
      getData();
    } catch (e) {
      console.error(e);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };
  const deleteFood = async (event) => {
    spinnerRef.current.classList.remove("hidden");
    try {
      await apiInstance.delete(`foods/${event.target.getAttribute("data-id")}`);
      getData();
    } catch (error) {
      console.error(error);
    } finally {
      spinnerRef.current.classList.add("hidden");
    }
  };
  const onSelect = (name) => {
    setCategory(name);
  };
  return (
    <div className="app-root">
      <Router history={History}>
        <Navbar isLogin={islogin} user={user} onLogout={onLogout} />
        <Route path="/" exact>
          <HomePage onSelect={onSelect} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/products" exact>
          <Products
            admin={admin}
            data={data}
            setFood={setFood}
            deleteFood={deleteFood}
            setEdit={setEdit}
            addToCart={addToCart}
            category={startCategory}
            resetCategory={() => {
              setCategory("");
            }}
          />
        </Route>
        <Route path="/Checkout">
          <Checkout cart={cart} addToCart={addToCart} />
        </Route>
        <div className="spinner hidden" ref={spinnerRef}>
          <div className="loader">Loading...</div>
        </div>
        <Route path="/form">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              History.push("/products");
              if (!isEdit) addFood();
              else editFood();
            }}
            food={food}
            setFood={setFood}
            isEdit={isEdit}
            admin={admin}
          />
        </Route>
      </Router>
    </div>
  );
}

export default App;
