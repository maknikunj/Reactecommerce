import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getstore,
  deleteStore,
} from "../../actions/Storeaction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";

const AllStore = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, Store } = useSelector((state) => state.storedata);
  console.log(Store)

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.storeActions
  );

  const deleteProductHandler = (id) => {
    dispatch(
      deleteStore(id))
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
      alert.success("Store Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getstore());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Shop ID", minWidth: 200, flex: 0.8 },

    {
      field: "storename",
      headerName: "Shop Name",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "url",
      headerName: "Shop url",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "shopdesc",
      headerName: "Shop Desc",
      minWidth: 150,
      flex: 0.9,
    },
    {
      field: "shopadd",
      headerName: "Shop Add",
      minWidth: 150,
      flex: 0.9,
    },
    {
      field: "ownername",
      headerName: "Owner Name",
      minWidth: 190,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 0.5,

    },
    {
      field: "owneraddress",
      headerName: "Owner Add",
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
            <Link to={`/admin/updatestore/${params.getValue(params.id, "id")}`}>
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

  Store &&
    Store.forEach((item) => {
      rows.push({
        id: item._id,
        storename: item.storename,
        url: item.url,
        shopdesc: item.shopdesc,
        email: item.email,
        phone: item.phone,
        shopadd: item.shopaddress,
        ownername: item.ownername,
        owneraddress: item.owneraddress,

      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL STORE</h1>

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

export default AllStore;

