import Button from "../../Button/Button";
import CheckoutCard from "./CheckoutCard/CheckoutCard";
import "./Checkout.css";
function Checkout({ cart, addToCart }) {
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price * item.quantity;
  });
  return (
    <div className="checkout">
      {cart.length > 0 && (
        <>
          <div className="card-container">
            {cart.map((food, i) => {
              return (
                <CheckoutCard
                  addToCart={addToCart}
                  cart={cart}
                  food={food}
                  key={i}
                />
              );
            })}
          </div>
          <div className="pay">
            Total : {sum.toFixed(1)}$
            <Button
              text="Pay"
              onClick={() => {
                addToCart([]);
              }}
              className="alt"
            />
          </div>
        </>
      )}
      {cart.length === 0 && "Your Cart is Empty!"}
    </div>
  );
}
export default Checkout;
