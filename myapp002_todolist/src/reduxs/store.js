import { reducer } from "./reducer";

// 이전버전으로 사용하려면
import { legacy_createStore as createStore } from "redux";

export const store = createStore(reducer);
