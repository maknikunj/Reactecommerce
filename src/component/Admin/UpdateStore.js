import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createstore, getStoreDetails, updateStore } from "../../actions/Storeaction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_STORE_RESET } from "../../constants/StoreConstants";
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const UpdateStore = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [storename, setstorename] = useState("");
  const [url, seturl] = useState('');
  const [shopdesc, setshopdesc] = useState("");
  const [shopaddress, setshopaddress] = useState('');
  // const [location, setlocation] = useState('');
  // const [icon, setIcon] = useState([]);
  // const [iconPreview, setIconPreview] = useState([]);
  // const [category, setCategory] = useState("");
  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);
  const [ownername, setownername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState()
  const [owneraddress, setowneraddress] = useState('')
  const [accountNo, setaccountNo] = useState()
  const [accountHolderName, setaccountHolderName] = useState('')
  const [IFSC, setIFSC] = useState('')
  const [bankName, setbankName] = useState('')
  const [branch, setbranch] = useState('')
  const [adharCardNo, setadharCardNo] = useState()
  const [panCardNo, setpanCardNo] = useState('')
  const [GSTNo, setGSTNo] = useState('')
  const [status, setstatus] = useState()
  const [oldImages, setOldImages] = useState([]);


  const { error, Store } = useSelector((state) => state.storeDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.storeActions);
  
  const storeid = match.params.id;


  useEffect(() => {
    if (Store && Store._id !== storeid) {
      //new create mate
      dispatch(getStoreDetails(storeid));
    } else {
      setstorename(Store.storename);
      seturl(Store.url)
      setshopdesc(Store.shopdesc);
      setshopaddress(Store.shopaddress);
      setownername(Store.ownername);
      setemail(Store.email);
      setphone(Store.phone);
      setowneraddress(Store.owneraddress);
      setaccountNo(Store.accountNo);
      setaccountHolderName(Store.accountHolderName);
      setIFSC(Store.IFSC);
      setbankName(Store.bankName);
      setbranch(Store.branch);
      setadharCardNo(Store.adharCardNo);
      setpanCardNo(Store.panCardNo);
      setGSTNo(Store.GSTNo);
      setstatus(Store.status);
      setOldImages(Store.images)
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
      alert.success("STORE Updated Successfully");
      history.push("/admin/allstore");
      dispatch({ type: UPDATE_STORE_RESET });

    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    storeid,
    Store,
    updateError,
  ]);



  const UpdateStoreSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("_id", storeid )
    myForm.set("storename", storename);
    myForm.set("url", url);
    myForm.set("shopdesc", shopdesc);
    myForm.set("shopaddress", shopaddress);
    myForm.set("ownername", ownername);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("owneraddress", owneraddress);
    myForm.set("accountNo", accountNo);
    myForm.set("accountHolderName", accountHolderName);
    myForm.set("IFSC", IFSC);
    myForm.set("bankName", bankName);
    myForm.set("branch", branch);
    myForm.set("adharCardNo", adharCardNo);
    myForm.set("panCardNo", panCardNo);
    myForm.set("GSTNo", GSTNo);
    myForm.set("status", status);

    // icon.forEach((image) => {
    //   myForm.append("icon", image);
    // });
    banner.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateStore(storeid, myForm));
    dispatch(getStoreDetails(storeid));
  };


  // const createProductIconChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setIcon([]);
  //   setIconPreview([]);
  //   files.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setIconPreview((old) => [...old, reader.result]);
  //         setIcon((old) => [...old, reader.result]);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const createProductbannerChange = (e) => {
    const files = Array.from(e.target.files);
    setBanner([]);
    setBannerPreview([]);
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBannerPreview((old) => [...old, reader.result]);
          setBanner((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    
    <Fragment>
      <MetaData title="Create Store" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={UpdateStoreSubmitHandler}
          >
            <h1>Update Store</h1>
            <br /><br />
            {/* <div className='maindiv'>
            <div className='storeform'> */}

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Store Name"
                name="storename"
                value={storename}
                required
                onChange={(e) =>setstorename(e.target.value)}
              />
            </div>
            <div>
              <InsertLinkIcon />
              <input
                type="text"
                placeholder="Store Url"
                name="url"
                value={url}
                required
                onChange={(e) => seturl(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Shop Description"
                name="shopdesc"
                value={shopdesc}
                onChange={(e) => setshopdesc(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <StoreIcon />
              <textarea
                placeholder="Shop Address"
                name="shopaddress"
                value={shopaddress}
                onChange={(e) => setshopaddress(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            {/* <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Discount_Percentage"
                  name='percentage'
                  value={percentage}
                  required
                  onChange={(e) => setpercentage(e.target.value)}
                />
              </div> */}
            <div>
              <AccountTreeIcon />
              <select name='status' value={status} onChange={(e) => setstatus(e.target.value)}>
                <option >1</option>
                <option>0</option>
              </select>
            </div>
            {/* <div id="createProductFormFile">
                <input
                  type="file" placeholder='Icon'
                  accept="image/*"
                  onChange={createProductIconChange}
                  multiple
                  required
                />
              </div>
              <div id="createProductFormImage">
                {iconPreview.map((image, index) => (
                  <img key={index} src={image} alt="Icon Preview" />
                ))}
              </div> */}
            <div id="createProductFormFile">
                <input
                  type="file" placeholder='banner'
                  accept="image/*"
                  
                  onChange={createProductbannerChange}
                  multiple
                  required
                />
              </div>
              <br />
              <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Category Preview" />
                ))}
            </div>
              <div id="createProductFormImage">
                {bannerPreview.map((image, index) => (
                  <img key={index} src={image}  alt="Banner Preview" />
                ))}
              </div> 
            {/* <br />
              <div>
                <AddLocationIcon />
                <input
                  type="text"
                  placeholder="Location"
                  name='location'
                  value={location}
                  required
                  onChange={(e) => setlocation(e.target.value)}
                />
              </div> */}
            {/* </div> */}
            {/* <div className="ownerform"> */}
            <h1>Owner Details</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Full Name"
                name="ownername"
                required
                value={ownername}
                onChange={(e) => setownername(e.target.value)}
              />
            </div>
            <div>
              <EmailIcon />
              <input
                type="text"
                placeholder="Email Address "
                name="email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Enter Phone Number"
                name='phone'
                value={phone}
                required
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
            <div>
              <HomeIcon />
              <textarea
                placeholder="Owner Address"
                name="owneraddress"
                value={owneraddress}
                onChange={(e) => setowneraddress(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              < SpellcheckIcon />
              <input
                type="number"
                placeholder="Enter Accountnumber"
                name='accountNo'
                value={accountNo}
                required
                onChange={(e) => setaccountNo(e.target.value)}
              />
            </div>
            <div>
              <AccountCircleIcon />
              <input
                type="text"
                placeholder="Enter Account Holder Name"
                name='accountHolderName'
                value={accountHolderName}
                required
                onChange={(e) => setaccountHolderName(e.target.value)}
              />
            </div>
            <div>
              <AccountCircleIcon />
              <input
                type="text"
                placeholder="Enter IFSC Number"
                name='IFSC'
                value={IFSC}
                required
                onChange={(e) => setIFSC(e.target.value)}
              />
            </div>
            <div>
              <AccountBalanceIcon />
              <input
                type="text"
                placeholder="Enter Bank Name"
                name='bankName'
                value={bankName}
                required
                onChange={(e) => setbankName(e.target.value)}
              />
            </div>
            <div>
              <AccountBalanceIcon />
              <input
                type="text"
                placeholder="Enter Branch Name"
                name='branch'
                value={branch}
                required
                onChange={(e) => setbranch(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="number"
                placeholder="Enter Adharcard Number"
                name='adharCardNo'
                value={adharCardNo}
                required
                onChange={(e) => setadharCardNo(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Enter Pancard Number"
                name='panCardNo'
                value={panCardNo}
                required
                onChange={(e) => setpanCardNo(e.target.value)}
              />
            </div>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Enter GST Number"
                name='GSTNo'
                value={GSTNo}
                required
                onChange={(e) => setGSTNo(e.target.value)}
              />
            </div>
            {/* </div> */}
            {/* <div className="container">
              <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                  name={"label"} id={"label"} />
                <label className="label" htmlFor={"label"}>
                  <span className="inner" />
                  <span className="switch" />
                </label>
              </div>
            </div> */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              className={loading ? "disable-class" : ""}
            > Create
            </Button>
          </form>
        </div>
      </div >
    </Fragment >
  );
};

export default UpdateStore;

