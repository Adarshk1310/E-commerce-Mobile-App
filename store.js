import CartReducer from "./redux/CartReducer";

const { configureStore } = require("@reduxjs/toolkit");


export default configureStore({
    reducer:{
        cart:CartReducer
    }
})