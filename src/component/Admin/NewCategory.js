import React, { Fragment, useEffect, useState } from "react";
import "./Newcategory.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCategory } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";
import { Formik } from 'formik';
import * as yup from 'yup';


const NewCategory = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCategory);
  const [touchblur, settouchblur] = useState(false)
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    // myForm.set("price", price);
    // myForm.set("description", description);
    // myForm.set("category", category);
    // myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createCategory(myForm));
  };

  const createCategoryImagesChange = (e) => {
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

  const handleblur = (e) => {
    settouchblur(true)
  }

  return (
    <Fragment>
      <MetaData title="Create Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createCategorySubmitHandler}
          >
            <h1>Create Category</h1>
            {touchblur && name === "" ?
              <div className="categoryinput" >
                <SpellcheckIcon />
                <input type="text" placeholder="Category Name" required value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>
              :
              <div >
                <SpellcheckIcon />
                <input type="text" placeholder="Category Name" onBlur={handleblur} required value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>}
            {touchblur && images === [] ?
              <div id="createProductFormFile">
                <input type="file" name="categoryImage" accept="image/*" onChange={createCategoryImagesChange} multiple 
                 required
                />
              </div> :
              <div id="createProductFormFile">
                <input type="file" name="categoryImage" accept="image/*" onBlur={handleblur} onChange={createCategoryImagesChange}
                  multiple
                  required
                />
              </div>}
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Category Preview" />
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

export default NewCategory;
