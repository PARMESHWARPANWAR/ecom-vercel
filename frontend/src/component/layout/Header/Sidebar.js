import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import logo from "../../../images/logo.png";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sidebar({ isOpen, setIsOpen }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.myOrders);

  const sidebarRef = useRef();
  const sidebarPRef = useRef();

  function logoutUser() {
    dispatch(logout());
    // history.push("/");
    toast.success("Logout Successfully");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        sidebarPRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarPRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div
      ref={sidebarPRef}
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={sidebarRef}
        className={`bg-white w-64 h-screen fixed left-0 top-0 ease-in-out transition-all duration-300 transform bg-gray-50 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-0  mr-[-24px]  text-gray-50 hover:text-gray-200 focus:outline-none"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="x w-8 h-8">
            <path
              fillRule="evenodd"
              d="M13.414 12l3.293 3.293a1 1 0 11-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L10.586 12 7.293 8.707a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 111.414 1.414L13.414 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="h-full px-3 py-4 overflow-y-auto sidebar">
          <Link to="/">
            <img src={logo} alt="Ecommerce" />
          </Link>
          {isAuthenticated && user.role === "admin" && (
            <>
              <Link to="/admin/dashboard">
                <p>
                  <DashboardIcon /> Dashboard
                </p>
              </Link>
              <Link to="#">
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ImportExportIcon />}
                >
                  <TreeItem nodeId="1" label="Products">
                    <Link to="/admin/products">
                      <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                    </Link>

                    <Link to="/admin/product">
                      <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                    </Link>
                  </TreeItem>
                </TreeView>
              </Link>
              <Link to="/admin/orders">
                <p>
                  <ListAltIcon />
                  Orders
                </p>
              </Link>
              <Link to="/admin/users">
                <p>
                  <PeopleIcon /> Users
                </p>
              </Link>
              <Link to="/admin/reviews">
                <p>
                  <RateReviewIcon />
                  Reviews
                </p>
              </Link>
            </>
          )}
          <Link to="/account">
            <PersonIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
          </Link>
          <Link to="/orders">
            <ListAltIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">MyOrders</span>
            {orders?.length > 0 && (
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {orders.length}
              </span>
            )}
          </Link>

          <Link to="/cart">
            <ShoppingCartIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">Cart</span>
            {cartItems?.length > 0 && (
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/" onClick={logoutUser}>
            <ExitToAppIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
