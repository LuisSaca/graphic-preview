import { configureStore } from "@reduxjs/toolkit";
import  ElementsReducer  from "./slices/Elements.slice";

export const store = configureStore({
  reducer: {
    elements: ElementsReducer,
  },
});
