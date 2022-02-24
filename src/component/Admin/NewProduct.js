import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { category: categoriesfromstore } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [touchblurname, settouchblurname] = useState(false);
  const [touchblurprice,settouchblurprice]=useState(false);
  const [touchblurpricedesc,settouchblurpricedesc]=useState(false);
  const [touchblurpricestock,settouchblurpricestock]=useState(false)

  const categories = categoriesfromstore

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);


    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            {touchblurname && name === "" ?
              <div className="productinput">
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              : <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  onBlur={()=>settouchblurname(true)}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>}
              {touchblurprice && price === "" ?
            <div className="productinput">
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            : <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onBlur={()=>settouchblurprice(true)}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>}
          {touchblurpricedesc && description === "" ?
            <div className="productinput">
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>: <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onBlur={()=>settouchblurpricedesc(true)}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>}
            <div >
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value={category}>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate.slug}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            {touchblurpricestock && Stock === "" ?
            <div className="productinput">
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                value={Stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>:<div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                value={Stock}
                onBlur={()=>settouchblurpricestock(true)}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>}

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
                required
              />
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              className={loading ? "disable-class" : ""}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
