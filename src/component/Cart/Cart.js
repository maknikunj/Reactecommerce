import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import {
  getcoupan,
  deleteCoupan,
} from "../../actions/CoupanAction";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart, clearErrors } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { DELETE_COUPAN_RESET } from "../../constants/Coupan";
import { TreeView, TreeItem } from "@material-ui/lab";
import './Modal.css';
import { Modal, Button, Form } from "react-bootstrap";



const Cart = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const [coupandiscount, setcoupandiscount] = useState("");
  const [showcoupon, setshowcoupon] = useState(false);

  const { error, coupanitem } = useSelector((state) => state.coupandata);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.coupanActions
  );

  const {
    cartItems: { data, message: messageCart },
    loading: loadingCart,
    error: errorCart
  } = useSelector((state) => state.cart);

  console.log(data)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Coupan Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_COUPAN_RESET });
    }
    if (errorCart) {
      alert.error(errorCart);
      dispatch(clearErrors());
    }
    if (messageCart) {
      alert.success(messageCart);
    }

    dispatch(getcoupan(coupandiscount));
  }, [dispatch, alert, errorCart, coupandiscount, messageCart, error, deleteError, history, isDeleted]);

  const couponchnagehandler = (e) => {
    setshowcoupon(true)
  }

  const couponsubmihandler = (item) => {
    setcoupandiscount(item.discount)
    setshowcoupon(false)
  }

  const gobackcartpage = () => {
    setshowcoupon(false)
  }

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock < newQty) {
      alert.error(`Max Quantity Shouldn't be excced ${stock}.. `);
      return;
    }
    if (data.totalQuantity === 25) {
      alert.error(
        `CART Max Quantity Shouldn't be excced ${data.totalQuantity}.. `
      );
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const inputChangeQuantity = (id, quantity, stock) => {
    console.log(quantity);
    let newQty = quantity;
    if (data.totalQuantity === 25) {
      alert.error(
        `CART Max Quantity Shouldn't be excced ${data.totalQuantity}.. `
      );
      return;
    }
    if (stock < newQty) {
      alert.error(`Max Quantity Shouldn't be excced ${stock}.. `);
      return;
    }
    if (isNaN(newQty)) {

      newQty = 0;
      console.log(newQty);
    }
    if (newQty < 1) {
      alert.error(` Quantity Shouldn't be less than 1.. `);
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };


  ///////delay thi kari sakay
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [query]);


  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      alert.error(` Quantity Shouldn't be less than 1.. `);
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };


  if (showcoupon) {
    return (
      <div className="modalstyle" >
        <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">

              {/* <!-- Modal Header --> */}
              <div class="modalheader">
                <h1 class="modal-title">Select Coupon !</h1>
                {/* <button type="button" class="close" data-dismiss="modal">&times;</button> */}
              </div>

              {/* <!-- Modal body --> */}
              <div class="modalbody">
                {coupanitem.map((cpn) => (
                  <>
                    <h1>{cpn.couponCodeName}</h1><br />
                    <h2>Rs.{cpn.discount}</h2>
                    <button onClick={() => couponsubmihandler(cpn)} >Apply</button>
                  </>
                ))}
              </div>
              {/* <!-- Modal footer --> */}
              <div class="modalfooter">
                <button onClick={gobackcartpage} type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        {loadingCart ? (
          <Loader />
        ) : (
          <Fragment>
            {data ? (
              data.items.length === 0 ? (
                <div className="emptyCart">
                  <RemoveShoppingCartIcon />
                  <Typography>No Product in Your Cart</Typography>
                  <Link to="/products">View Products</Link>
                </div>
              ) : (
                <>
                  <div className="cartPage">
                    <div className="cartHeader">
                      <p>Product</p>
                      <p>
                        Quantity--<b>{data.totalQuantity}</b>
                      </p>
                      <p>Subtotal</p>
                    </div>
                    {data.items &&
                      data.items.map((item) => (
                        <div className="cartContainer" key={item.productId._id}>
                          <CartItemCard
                            item={item}
                            deleteCartItems={deleteCartItems}
                          />
                          <div className="cartInput">
                            <button
                              disabled={item.quantity === 1}
                              className={item.quantity === 1 ? "disable-class" : ""}
                              onClick={() =>
                                decreaseQuantity(item.productId._id, item.quantity)
                              }
                            >
                              -
                        </button>

                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                inputChangeQuantity(
                                  item.productId._id,
                                  parseInt(e.target.value),
                                  item.productId.Stock
                                )
                              }
                            />
                            <button
                              disabled={
                                item.quantity === item.productId.Stock ||
                                data.totalQuantity === 25
                              }
                              className={
                                item.quantity === item.productId.Stock ||
                                  data.totalQuantity === 25
                                  ? "disable-class"
                                  : ""
                              }
                              onClick={() =>
                                increaseQuantity(
                                  item.productId._id,
                                  item.quantity,
                                  item.productId.Stock
                                )
                              }
                            >
                              +
                        </button>
                          </div>
                          <p className="cartSubtotal">{`₹${item.total}`}</p>
                        </div>
                      ))}
                    <div className="cartGrossProfit">
                      <div>{coupandiscount !== "" && <p className="couponapply">Coupon Applied Successfully !</p>}</div>
                      <div className="cartGrossProfitBox">
                        <p>Gross Total</p>
                        <p>{data.subTotal - coupandiscount}</p>
                      </div>
                      {/* <div className="cartGrossProfitBoxinput">
                      <input type="text" placeholder="Enter Coupan Code" name="inputcoupan"/>
                    </div> */}
                      <div className="cartGrossProfitBoxcoupanselection">
                        <button onClick={couponchnagehandler} >Choose Coupan For Discount</button>
                      </div>
                      <div className="checkOutBtn">
                        <button onClick={checkoutHandler}>Check Out</button>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : null}
          </Fragment>
        )}
      </>
    )
  }
};

export default Cart;
