import { configureStore } from "@reduxjs/toolkit";
import { accountsApi } from "../features/api/accountsApi";
import { documentsApi } from "../features/api/documentsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountsApi.middleware, documentsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
