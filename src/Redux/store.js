import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Slices/AuthSlice";
import menuReducer from "../Redux/Slices/MenuSlice";
import sideBarReducer from "../Redux/Slices/SideBarSlice";
import MenuSetting from "../Redux/Slices/MenuSetting";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    menuSetting: MenuSetting,
    sidebar: sideBarReducer,
  },
});
