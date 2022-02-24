import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getcoupan,
  deleteCoupan,
} from "../../actions/CoupanAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_COUPAN_RESET } from "../../constants/Coupan";

const AllCoupan = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, coupanitem } = useSelector((state) => state.coupandata);
  
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.coupanActions
  );

  const deleteProductHandler = (id) => {
    dispatch(
      deleteCoupan(id))
  };

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

    dispatch(getcoupan());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Coupan ID", minWidth: 200, flex: 0.8 },

    {
      field: "code",
      headerName: "Coupan code",
      minWidth: 160,
      flex: 0.8,
    },
    {
      field: "codename",
      headerName: "Coupan Name",
      minWidth: 170,
      flex: 0.8,
    },
    {
      field: "discount",
      headerName: "Discount",
      minWidth: 170,
      flex: 0.6,
    },
    {
      field: "discountStatus",
      headerName: "Discount Status",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 180,
      flex: 0.7,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      minWidth: 150,
      flex: 0.7,

    },
    {
      field: "expirationTime",
      headerName: "Expired At",
      minWidth: 150,
      flex: 0.9,
    },
    // {
    //   field: "image",
    //   headerName: "Photo",
    //   minWidth: 150,
    //   flex: 0.9,
    // },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/updatecoupon/${params.getValue(params.id, "id",params.item,"item")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  coupanitem &&
  coupanitem.forEach((item) => {
      rows.push({
        id: item._id,
        code: item.code,
        codename: item.couponCodeName,
        discount: item.discount,
        discountStatus: item.discountStatus,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        expirationTime: item.expirationTime,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL COUPON</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AllCoupan;

