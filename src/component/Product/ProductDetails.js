import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart, getCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  //nested destructuring of obj
  const {
    cartItems: { data, message: messageCart },
    loading: loadingCart,
    error: errorCart,
  } = useSelector((state) => state.cart);

  //read value from store to assign quantity

  var x = data?.items.find((e) => {
    return match.params.id === e.productId._id;
  });

  //console ma value aave che but jatyre
  // console.log(x?.quantity)
  const qty = x?.quantity || 1;
  // console.log( qty)

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(qty);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      alert.error(`Max Quantity Shouldn't be excced ${product.Stock}.. `);
      return;
    }

    //setQuantity(x?.quantity);
    const qty1 = quantity + 1;

    setQuantity(qty1);
  };

  const inputChangeQuantity = (
    quantity,
    id = product._id,
    stock = product.Stock
  ) => {
    console.log(quantity);
    const newQty = quantity;
    if (data?.totalQuantity === 25) {
      alert.error(
        `CART Max Quantity Shouldn't be excced ${data.totalQuantity}.. `
      );
      return;
    }
    if (stock < newQty) {
      alert.error(`Max Quantity Shouldn't be excced ${stock}.. `);
      return;
    }
    if (newQty === "") {
      return;
    }
    if (newQty < 1) {
      alert.error(` Quantity Shouldn't be less than 1.. `);
      return;
    }
    setQuantity(newQty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) {
      alert.error(` Quantity Shouldn't be less than 1.. `);
      return;
    }

    //setQuantity(x?.quantity);
    const qty1 = quantity - 1;

    setQuantity(qty1);
  };

  const addToCartHandler = async () => {
    await dispatch(addItemsToCart(match.params.id, quantity));
    dispatch(getCart());
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (errorCart) {
      alert.error(errorCart);
      dispatch(clearErrors());
    }
    if (messageCart) {
      alert.success(messageCart);
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));

  }, [dispatch,match.params.id, error, errorCart, alert, messageCart, reviewError, success]);


  // useEffect(() => {
  //   dispatch(getProductDetails(match.params.id));
  // }, [dispatch, error, match.params.id]);

  return (
    <>
      {loading || loadingCart ? (
        <Loader />
      ) : (
        <>
        <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>

                    <input
                      type="number"
                      placeholder=""
                      required
                      value={quantity}
                      // value={quantity ?? qty}
                      onChange={(e) =>
                        inputChangeQuantity(parseInt(e.target.value))
                      }
                    />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
