import React, { Fragment, useEffect, useState } from "react";
import "./newcoupan.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createcoupan } from "../../actions/CoupanAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_COUPAN_RESET } from "../../constants/Coupan";
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import StoreIcon from '@material-ui/icons/Store';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CodeIcon from '@material-ui/icons/Code';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DateRangeIcon from '@material-ui/icons/DateRange';

const NewCoupan = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const NewDate= new Date().toISOString();
    console.log(NewDate)

    const { loading, error, success } = useSelector((state) => state.newcoupan);
    console.log(loading,error,success)

    const [code, setcode] = useState("");
    const [couponCodeName, setcouponCodeName] = useState('');
    const [discount, setdiscount] = useState("");
    const [discountStatus, setdiscountStatus] = useState(true);
    const [expirationTime, setexpirationTime] = useState(NewDate)
    const [touchblurcodename, settouchblurcodename] = useState(false)
    const [touchblurdiscount, settouchblurdiscount] = useState(false)
    
    // const expirationTime = new Date(newexpirationTime);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Coupan Created Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: NEW_COUPAN_RESET });
        }
    }, [dispatch, alert, error, history, success]);

    const createCoupanSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("couponCodeName", couponCodeName);
        myForm.set("discount", discount);
        myForm.set("discountStatus", discountStatus);
        myForm.set("expirationTime", expirationTime);

        dispatch(createcoupan(myForm));
    };

    


    return (
        <Fragment>
            <MetaData title="Create Coupan" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createCoupanSubmitHandler}
                    >
                        <h1>Create Coupan</h1>
                        {touchblurcodename && couponCodeName === "" ?
                        <div className="coupaninput">
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Enter Coupan Name"
                                name="couponCodeName"
                                required
                                value={couponCodeName}
                                onChange={(e) => setcouponCodeName(e.target.value)}
                            />
                        </div>:<div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Enter Coupan Name"
                                name="couponCodeName"
                                required
                                onBlur={()=>settouchblurcodename(true)}
                                value={couponCodeName}
                                onChange={(e) => setcouponCodeName(e.target.value)}
                            />
                        </div>}
                        {touchblurdiscount && discount === "" ?            
                        <div className="coupaninput">
                            <LocalOfferIcon />
                            <input
                                type="number"
                                placeholder="Enter Discount"
                                name='discount'
                                value={discount}
                                required
                                onChange={(e) => setdiscount(e.target.value)}
                            />
                        </div>:   <div>
                            <LocalOfferIcon />
                            <input
                                type="number"
                                placeholder="Enter Discount"
                                name='discount'
                                value={discount}
                                onBlur={()=>settouchblurdiscount(true)}
                                required
                                onChange={(e) => setdiscount(e.target.value)}
                            />
                        </div>}
                        <div >
                            <AccountTreeIcon />
                            <select name='discountStatus' value={discountStatus} onChange={(e) => setdiscountStatus(e.target.value)}>
                                <option >true</option>
                                <option>false</option>
                            </select>
                        </div>                  
                        <div className="creationdate" >
                        <p>Enter Expired Date</p>
                        </div>
                        <div >
                            <DateRangeIcon />
                            <input
                                type="text"
                                placeholder="Expired Date"
                                name='newexpirationTime'
                                value={expirationTime}
                                step="1"
                                min = {expirationTime}
                                onChange={(e) => setexpirationTime(e.target.value)}
                            />
                        </div>
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
export default NewCoupan;

