import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@mui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    toast.success(`Item Added To Cart`);
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="flex flex-col md:flex-row justify-evenly md:p-20">
            <div className="w-full md:w-1/2">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="w-full h-full object-cover"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="w-full md:w-1/2 p-4">
              <div className="">
                <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                <p className="text-gray-500 text-xs">Product # {product._id}</p>
              </div>

              <div className="border-b border-gray-200 w-[70%] mb-4" />
              <div className="flex items-center mb-4">
                <Rating {...options} />
                <span className="ml-2 text-gray-500">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="border-b border-gray-200 w-[70%] my-4" />
              <div className="flex flex-col items-start mb-4">
                <h1 className="text-2xl font-bold">{`₹${product.price}`}</h1>
                <div className="flex items-center mt-2">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-200">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 bg-gray-200 rounded-r"
                  >
                    +
                  </button>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="ml-4 px-4 py-2 bg-green-500 text-white font-bold rounded"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="border-b border-gray-200 w-[70%] my-2" />
                <p className="mt-2 ">
                  Status:
                  <b
                    className={
                      product.Stock < 1 ? "text-red-500" : "text-green-500"
                    }
                  >
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
                <div className="border-b border-gray-200 w-[70%] py-2" />
              </div>
              <div className="mb-4">
                <p className="text-gray-500 mb-1">Description:</p>
                <p>{product.description}</p>
              </div>
              <button
                onClick={submitReviewToggle}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded"
              >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
