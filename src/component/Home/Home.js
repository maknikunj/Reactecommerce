import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { clearErrors as clearErrorsOfCategories , getCategory } from "../../actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  // const { loading:loadingcategories, error:errorcategories, category } = useSelector((state) => state.categories);

  useEffect(() => {
    if (error) {
     alert.error(error);
      dispatch(clearErrors());
    }
    // if (errorcategories) {
    //   alert.error(error);
    //    dispatch(clearErrorsOfCategories());
    //  }
    
    dispatch(getCategory());
    dispatch(getProduct());
  }, [dispatch, error,alert]);

  return (
    <Fragment>
      {loading  ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
