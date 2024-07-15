import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

//we are creating a store to hold all the stores we have
//this store is named store
export const store: Store = {
    activityStore: new ActivityStore()
}

//here we are adding the main store to the react context
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}