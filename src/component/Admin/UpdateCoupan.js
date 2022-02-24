import React, { Fragment, useEffect, useState } from "react";
import "./newcoupan.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createcoupan, getCoupanDetails, updateCoupan,getcoupan } from "../../actions/CoupanAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_COUPAN_RESET } from "../../constants/Coupan";
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


const Updatecoupan = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [editcouponitem, seteditcouponitem] = useState({})
    const [code, setcode] = useState("");
    const [couponCodeName, setcouponCodeName] = useState('');
    const [discount, setdiscount] = useState("");
    const [discountStatus, setdiscountStatus] = useState(true);
    const [expirationTime, setexpirationTime] = useState('')

    console.log(expirationTime)

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.coupanActions);

    const couponid = match.params.id;
    const { error, coupanitem } = useSelector((state) => state.coupandata);


    const findcouonitem = coupanitem.filter ((cpn) => {
            if (cpn._id === couponid) {
                return cpn;
            }
        })
        console.log(findcouonitem)
    
    useEffect(() => {
        if (findcouonitem && findcouonitem[0]._id !== couponid) {
            // dispatch((couponid))
        }else{
            //for update
            setcouponCodeName(findcouonitem[0].couponCodeName);
            setdiscount(findcouonitem[0].discount)
            setdiscountStatus(findcouonitem[0].discountStatus);
            setexpirationTime(findcouonitem[0].expirationTime);
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
            alert.success("Coupan Updated Successfully");
            history.push("/admin/allcoupan");
            dispatch({ type: UPDATE_COUPAN_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, coupanitem, couponid, updateError]);

    const updateCoupanSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("couponCodeName", couponCodeName);
        myForm.set("discount", discount);
        myForm.set("discountStatus", discountStatus);
        myForm.set("expirationTime", expirationTime);

        dispatch(updateCoupan(couponid, myForm));
        
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
                        onSubmit={updateCoupanSubmitHandler}
                    >
                        <h1>Update Coupan</h1>
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Enter Coupan Name"
                                name="couponCodeName"
                                required
                                value={couponCodeName}
                                onChange={(e) => setcouponCodeName(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocalOfferIcon />
                            <input
                                type="text"
                                placeholder="Enter Discount"
                                name='discount'
                                value={discount}
                                required
                                onChange={(e) => setdiscount(e.target.value)}
                            />
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select name='discountStatus' value={discountStatus} onChange={(e) => setdiscountStatus(e.target.value)}>
                                <option >true</option>
                                <option>false</option>
                            </select>
                        </div>
                        <div className="creationdate" >
                            <p>Enter Expired Date</p>
                        </div>
                        <div>
                            <DateRangeIcon />
                            <input
                                type="text"
                                placeholder="Expired Date"
                                name='expirationTime'
                                value={expirationTime}
                                step="1"
                                min={expirationTime}
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
export default Updatecoupan;

