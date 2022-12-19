import { combineReducers } from "@reduxjs/toolkit";
import topCategory from "../slices/categorys/topCategory";
import allCategory from "../slices/categorys/allCategory";
import featureProducts from "../slices/featureProducts/featureProducts";
import updateUserProfile from "../slices/user/updateProfile/getUpdateProfile";
import postUpdateUserProfile from "../slices/user/updateProfile/postUpdateProfile";
import getMyAddress from "../slices/user/address/getMyAddress";
import getMyRefunds from "../slices/user/myRefund/getMyRefunds";
import postUpdateRefund from "../slices/user/myRefund/postUpdateRefund";
import postNewAddress from "../slices/user/address/postNewAddress";
import postNewReview from "../slices/user/myReviews/postUpdateReview";
import getMyWishlistSlice from "../slices/user/myWishlist/getMyWishlist";
import getMyOrdersSlice from "../slices/user/orderHistory/getOrderHistory";
import getMyReviewsSlice from "../slices/user/myReviews/getMyReviews";
import getOrderDetailsSlice from "../slices/user/orderDetails/orderDetails";
import itemVariationReducer from "../slices/featureProducts/items/itemVariations";
import toastModalReducer from "../slices/featureProducts/items/toastModal";
import getReviews from "../slices/featureProducts/reviews/getReviews";
import postReview from "../slices/featureProducts/reviews/postReviews";
import searchProducts from "../slices/searchProducts/searchProducts";
import cartProductSlice from "../slices/cart/getCartProducts";
import storeItemInCartSlice from "../slices/cart/storeItemInCart";
import getFilterRefunds from "../slices/user/myRefund/filterRefund/filterRefunds";
import postRefundMessage from "../slices/user/myRefund/refundMessage/PostRefundMessage";
import myRefundDetails from "../slices/user/myRefund/refundMessage/getRefundDetails";
import postSelectProductReducer from "../slices/cart/selectProduct/selectProduct";
import postOrdersReducer from "../slices/order/postOrders";
import getAllOrderStatus from "../slices/trackOrder/getAllStatus";
import getTrackOrder from "../slices/trackOrder/getTrackOrder";
import getMyRefundWallet from "../slices/user/myRefund/refundWallet/getMyRefundWallet";
import popularProducts from "../slices/popularProducts/popularProducts";
import bestSellers from "../slices/bestSellers/bestSellers";
import getPreferences from "../slices/util/getPreferences";
const rootReducer = combineReducers({
    topCategory,
    allCategory,
    featureProducts,
    popularProducts,
    bestSellers,
    updateUserProfile,
    postUpdateUserProfile,
    getMyAddress,
    postNewAddress,
    postNewReview,
    postUpdateRefund,
    getMyWishlistSlice,
    getMyOrdersSlice,
    getMyReviewsSlice,
    postRefundMessage,
    myRefundDetails,
    getMyRefunds,
    getMyRefundWallet,
    getTrackOrder,
    getAllOrderStatus,
    getFilterRefunds,
    getReviews,
    postReview,
    getOrderDetailsSlice,
    itemVariationReducer,
    toastModalReducer,
    searchProducts,
    cartProductSlice,
    getPreferences,
    storeItemInCartSlice,
    postSelectProductReducer,
    postOrdersReducer,
});

export default rootReducer;
