import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems: { data }, } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  
  const {error, coupandata } = useSelector((state) => state.coupandata);
  console.log(coupandata)


  const subtotal = parseFloat(data?.subTotal).toFixed(2)

  const shippingCharges = parseFloat(subtotal > 1000 ? 0 : 200).toFixed(2);

  const tax = parseFloat(subtotal * 0.18).toFixed(2);

  const totalPrice = (Number(subtotal) - Number(coupandata) + Number(tax) + Number(shippingCharges))
  
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {data?.items &&
                data?.items.map((item) => (
                  <div key={item.productId._id}>
                    <img src={item.productId.images[0].url} alt="Product" />
                    <Link to={`/product/${item.productId._id}`}>
                      {item.productId.name}
                    </Link>
                      {item.quantity} X ₹{item.price} =
                      <b>₹{item.total}</b>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal }</span>
              </div>
              <div>
                <p>Discount:</p>
                <span>-₹{coupandata}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
