import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateCategory,
  getCategoryDetails
} from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";

const UpdateCategories = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, category } = useSelector((state) => state.categoryDetails);
  console.log(category)

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.categoryActions);

  const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

//   const categories = [
//     "Laptop",
//     "Footwear",
//     "Bottom",
//     "Tops",
//     "Attire",
//     "Camera",
//     "SmartPhones",
//   ];

  const categoryId = match.params.id;
  console.log(categoryId)

  useEffect(() => {
    if (category && category._id !== categoryId) {
        //new create mate
        dispatch(getCategoryDetails(categoryId));
    } else {
        
        //for update
      setName(category.name);
    //   setDescription(category.description);
    //   setPrice(category.price);
    //   setCategory(category.category);
    //   setStock(category.Stock);
      setOldImages(category.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Category Updated Successfully");
      history.push("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
      
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    categoryId,
    category,
    updateError,
  ]);

  const updateCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("_id", categoryId )
    // myForm.set("price", price);
    // myForm.set("description", description);
    // myForm.set("category", category);
    // myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateCategory(categoryId, myForm));
    dispatch(getCategoryDetails(categoryId)); 
  };

  const updateCategoryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateCategorySubmitHandler}
          >
            <h1>Update Category</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Category Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          

            <div id="createProductFormFile">
              <input
                type="file"
                name="categoryImage"
                accept="image/*"
                onChange={updateCategoryImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Category Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Category Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              className={loading ? "disable-class" :"" }
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

 export default UpdateCategories;
