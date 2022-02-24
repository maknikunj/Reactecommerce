import React, { Fragment, useEffect, useState } from "react";
import "./newstore.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createstore } from "../../actions/Storeaction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_STORE_RESET } from "../../constants/StoreConstants";
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


const NewStore = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newstore);

  const [storename, setstorename] = useState("");
  const [url, seturl] = useState('');
  const [shopdesc, setshopdesc] = useState("");
  const [shopaddress, setshopaddress] = useState('');
  const [banner, setBanner] = useState([]);
  const [bannerPreview, setBannerPreview] = useState([]);
  const [ownername, setownername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState("")
  const [owneraddress, setowneraddress] = useState('')
  const [accountNo, setaccountNo] = useState("")
  const [accountHolderName, setaccountHolderName] = useState('')
  const [IFSC, setIFSC] = useState('')
  const [bankName, setbankName] = useState('')
  const [branch, setbranch] = useState('')
  const [adharCardNo, setadharCardNo] = useState("")
  const [panCardNo, setpanCardNo] = useState('')
  const [GSTNo, setGSTNo] = useState('')
  const [status, setstatus] = useState("")
  const [touchblurstorename, settouchblurstorename] = useState(false)
  const [touchblururl, settouchblururl] = useState('');
  const [touchblurshopdesc, settouchblurshopdesc] = useState("");
  const [touchblurshopaddress, settouchblurshopaddress] = useState('');
  const [touchblurbanner, settouchblurBanner] = useState([]);
  const [touchblurownername, settouchblurownername] = useState('')
  const [touchbluremail, settouchbluremail] = useState('')
  const [touchblurphone, settouchblurphone] = useState("")
  const [touchblurowneraddress, settouchblurowneraddress] = useState('')
  const [touchbluraccountNo, settouchbluraccountNo] = useState("")
  const [touchbluraccountHolderName, settouchbluraccountHolderName] = useState('')
  const [touchblurIFSC, settouchblurIFSC] = useState('')
  const [touchblurbankName, settouchblurbankName] = useState('')
  const [touchblurbranch, settouchblurbranch] = useState('')
  const [touchbluradharCardNo, settouchbluradharCardNo] = useState("")
  const [touchblurpanCardNo, settouchblurpanCardNo] = useState('')
  const [touchblurGSTNo, settouchblurGSTNo] = useState('')
  const [touchblurstatus, settouchblurstatus] = useState("")


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Store Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_STORE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();


    const myForm = new FormData();

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
    banner.forEach((images) => {
      myForm.append("images", images);
    });

    dispatch(createstore(myForm));
  };



  const createProductbannerChange = (e) => {
    const files = Array.from(e.target.files);
    setBanner([]);
    setBannerPreview([]);

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
        <div className="newStoreContainer">
          <form
            className="createStoreForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Store</h1>
            <div className='maindiv'>
              <div className='storeform'>
                <h1>Store Details</h1>
                {touchblurstorename && storename === "" ?
                  <div className="storeinput">
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Store Name"
                      name="storename"
                      required
                      value={storename}
                      onChange={(e) => setstorename(e.target.value)}
                    />
                  </div> : <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Store Name"
                      name="storename"
                      required
                      onBlur={() => settouchblurstorename(true)}
                      value={storename}
                      onChange={(e) => setstorename(e.target.value)}
                    />
                  </div>}
                {touchblururl && url === "" ?
                  <div className="storeinput" >
                    <InsertLinkIcon />
                    <input
                      type="text"
                      placeholder="Store Url"
                      name="url"
                      value={url}
                      required
                      onChange={(e) => seturl(e.target.value)}
                    />
                  </div> : <div>
                    <InsertLinkIcon />
                    <input
                      type="text"
                      placeholder="Store Url"
                      name="url"
                      value={url}
                      onBlur={() => settouchblururl(true)}
                      required
                      onChange={(e) => seturl(e.target.value)}
                    />
                  </div>}
                {touchblurshopdesc && shopdesc === "" ?
                  <div className="storeinput">
                    <DescriptionIcon />
                    <textarea
                      placeholder="Shop Description"
                      name="shopdesc"
                      value={shopdesc}
                      onChange={(e) => setshopdesc(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div> : <div>
                    <DescriptionIcon />
                    <textarea
                      placeholder="Shop Description"
                      name="shopdesc"
                      onBlur={() => settouchblurshopdesc(true)}
                      value={shopdesc}
                      onChange={(e) => setshopdesc(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div>}
                {touchblurshopaddress && shopaddress === "" ?
                  <div className="storeinput" >
                    <StoreIcon />
                    <textarea
                      placeholder="Shop Address"
                      name="shopaddress"
                      value={shopaddress}
                      onChange={(e) => setshopaddress(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div> : <div>
                    <StoreIcon />
                    <textarea
                      placeholder="Shop Address"
                      name="shopaddress"
                      onBlur={() => settouchblurshopaddress(true)}
                      value={shopaddress}
                      onChange={(e) => setshopaddress(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div>}
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
                {touchblurstatus && status === "" ?
                  <div className="storeinput">
                    <AccountTreeIcon />
                    <select name='status' value={status} onChange={(e) => setstatus(e.target.value)}>
                      <option >1</option>
                      <option>0</option>
                    </select>
                  </div> : <div>
                    <AccountTreeIcon />
                    <select onBlur={() => settouchblurstatus(true)} name='status' value={status} onChange={(e) => setstatus(e.target.value)}>
                      <option >1</option>
                      <option>0</option>
                    </select>
                  </div>}
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
                <div id="createStoreFormFile">
                  <input
                    type="file" placeholder='banner'
                    name="avatar"
                    accept="image/*"
                    onChange={createProductbannerChange}
                    multiple
                    required
                  />
                </div>
                <br />
                <div id="createStoreFormImage">
                  {bannerPreview.map((image, index) => (
                    <img key={index} src={image} alt="Banner Preview" />
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
              </div>
              <div className="ownerform">
                <h1>Owner Details</h1>
                {touchblurownername && ownername === "" ?
                  <div className="storeinput">
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="ownername"
                      required
                      value={ownername}
                      onChange={(e) => setownername(e.target.value)}
                    />
                  </div> : <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="ownername"
                      required
                      onBlur={() => settouchblurownername(true)}
                      value={ownername}
                      onChange={(e) => setownername(e.target.value)}
                    />
                  </div>}
                {touchbluremail && email === "" ?
                  <div className="storeinput">
                    <EmailIcon />
                    <input
                      type="text"
                      placeholder="Email Address "
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div> : <div>
                    <EmailIcon />
                    <input
                      type="text"
                      placeholder="Email Address "
                      name="email"
                      onBlur={() => settouchbluremail(true)}
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>}
                {touchblurphone && phone === "" ?
                  <div className="storeinput">
                    <PhoneIcon />
                    <input
                      type="number"
                      placeholder="Enter Phone Number"
                      name='phone'
                      value={phone}
                      required
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div> : <div>
                    <PhoneIcon />
                    <input
                      type="number"
                      placeholder="Enter Phone Number"
                      name='phone'
                      value={phone}
                      onBlur={() => settouchblurphone(true)}
                      required
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>}
                {touchblurowneraddress && owneraddress === "" ?
                  <div className="storeinput">
                    <HomeIcon />
                    <textarea
                      placeholder="Owner Address"
                      name="owneraddress"
                      value={owneraddress}
                      onChange={(e) => setowneraddress(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div> : <div>
                    <HomeIcon />
                    <textarea
                      placeholder="Owner Address"
                      name="owneraddress"
                      value={owneraddress}
                      onBlur={() => settouchblurowneraddress(true)}
                      onChange={(e) => setowneraddress(e.target.value)}
                      cols="30"
                      rows="1"
                    ></textarea>
                  </div>}
                {touchbluraccountNo && accountNo === "" ?
                  <div className="storeinput">
                    < SpellcheckIcon />
                    <input
                      type="number"
                      placeholder="Enter Accountnumber"
                      name='accountNo'
                      value={accountNo}
                      required
                      onChange={(e) => setaccountNo(e.target.value)}
                    />
                  </div> : <div>
                    < SpellcheckIcon />
                    <input
                      type="number"
                      placeholder="Enter Accountnumber"
                      name='accountNo'
                      value={accountNo}
                      onBlur={() => settouchbluraccountNo(true)}
                      required
                      onChange={(e) => setaccountNo(e.target.value)}
                    />
                  </div>}
                {touchbluraccountHolderName && accountHolderName === "" ?
                  <div className="storeinput">
                    <AccountCircleIcon />
                    <input
                      type="text"
                      placeholder="Enter Account Holder Name"
                      name='accountHolderName'
                      value={accountHolderName}
                      required
                      onChange={(e) => setaccountHolderName(e.target.value)}
                    />
                  </div> : <div>
                    <AccountCircleIcon />
                    <input
                      type="text"
                      placeholder="Enter Account Holder Name"
                      name='accountHolderName'
                      value={accountHolderName}
                      onBlur={() => settouchbluraccountHolderName(true)}
                      required
                      onChange={(e) => setaccountHolderName(e.target.value)}
                    />
                  </div>}
                {touchblurIFSC && IFSC === "" ?
                  <div className="storeinput">
                    <AccountCircleIcon />
                    <input
                      type="text"
                      placeholder="Enter IFSC Number"
                      name='IFSC'
                      value={IFSC}
                      required
                      onChange={(e) => setIFSC(e.target.value)}
                    />
                  </div> : <div>
                    <AccountCircleIcon />
                    <input
                      type="text"
                      placeholder="Enter IFSC Number"
                      name='IFSC'
                      value={IFSC}
                      onBlur={() => settouchblurIFSC(true)}
                      required
                      onChange={(e) => setIFSC(e.target.value)}
                    />
                  </div>}
                {touchblurbankName && bankName === "" ?
                  <div className="storeinput">
                    <AccountBalanceIcon />
                    <input
                      type="text"
                      placeholder="Enter Bank Name"
                      name='bankName'
                      value={bankName}
                      required
                      onChange={(e) => setbankName(e.target.value)}
                    />
                  </div> : <div>
                    <AccountBalanceIcon />
                    <input
                      type="text"
                      placeholder="Enter Bank Name"
                      name='bankName'
                      value={bankName}
                      onBlur={() => settouchblurbankName(true)}
                      required
                      onChange={(e) => setbankName(e.target.value)}
                    />
                  </div>}
                {touchblurbranch && branch === "" ?
                  <div className="storeinput">
                    <AccountBalanceIcon />
                    <input
                      type="text"
                      placeholder="Enter Branch Name"
                      name='branch'
                      value={branch}
                      required
                      onChange={(e) => setbranch(e.target.value)}
                    />
                  </div> : <div>
                    <AccountBalanceIcon />
                    <input
                      type="text"
                      placeholder="Enter Branch Name"
                      name='branch'
                      value={branch}
                      onBlur={() => settouchblurbranch(true)}
                      required
                      onChange={(e) => setbranch(e.target.value)}
                    />
                  </div>}
                {touchbluradharCardNo && adharCardNo === "" ?
                  <div className="storeinput">
                    <SpellcheckIcon />
                    <input
                      type="number"
                      placeholder="Enter Adharcard Number"
                      name='adharCardNo'
                      value={adharCardNo}
                      required
                      onChange={(e) => setadharCardNo(e.target.value)}
                    />
                  </div> : <div>
                    <SpellcheckIcon />
                    <input
                      type="number"
                      placeholder="Enter Adharcard Number"
                      name='adharCardNo'
                      value={adharCardNo}
                      onBlur={() => settouchbluradharCardNo(true)}
                      required
                      onChange={(e) => setadharCardNo(e.target.value)}
                    />
                  </div>}
                {touchblurpanCardNo && panCardNo === "" ?
                  <div className="storeinput">
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Enter Pancard Number"
                      name='panCardNo'
                      value={panCardNo}
                      required
                      onChange={(e) => setpanCardNo(e.target.value)}
                    />
                  </div> : <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Enter Pancard Number"
                      name='panCardNo'
                      value={panCardNo}
                      onBlur={() => settouchblurpanCardNo(true)}
                      required
                      onChange={(e) => setpanCardNo(e.target.value)}
                    />
                  </div>}
                {touchblurGSTNo && GSTNo === "" ?
                  <div className="storeinput">
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Enter GST Number"
                      name='GSTNo'
                      value={GSTNo}
                      required
                      onChange={(e) => setGSTNo(e.target.value)}
                    />
                  </div> : <div>
                    <SpellcheckIcon />
                    <input
                      type="text"
                      placeholder="Enter GST Number"
                      name='GSTNo'
                      value={GSTNo}
                      onBlur={() => settouchblurGSTNo(true)}
                      required
                      onChange={(e) => setGSTNo(e.target.value)}
                    />
                  </div>}
              </div>
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
            </div>
              <div className="createStoreBtn" >
                <Button
                  id="createStoreBtn"
                  type="submit"
                  disabled={loading ? true : false}
                  className={loading ? "disable-class" : ""}
                > Create
            </Button>
            </div>
          </form>
        </div>
      </div >
    </Fragment >
  );
};

export default NewStore;

