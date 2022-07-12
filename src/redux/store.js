import { configureStore } from "@reduxjs/toolkit";
import superAdminReducer from "./reducers/superAdmin";

import authReducer from "./reducers/auth";
import UserReducer from "./reducers/User";

export default configureStore({
  reducer: {
    auth: authReducer,
    User: UserReducer,
    superAdminPanel: superAdminReducer,
  },
});
