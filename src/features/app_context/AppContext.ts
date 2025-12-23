import { createContext } from "react";
import type { UserType } from "../../entities/user/model/UserType";
import type ToastData from "./ToastData";
import type CartType from "../../entities/cart/model/CartType"; 

interface AppContextType {
  user: UserType | null;
  setUser: (input: UserType | null) => void;

  showToast: (data: ToastData) => void;
  
  cart: CartType;
  setCart: (input: CartType) => void;


  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const init: AppContextType = {
  user: null,
  setUser: () => { throw new Error("Not Implemented"); },
  showToast: () => { throw new Error("Not Implemented"); },
  cart: { items: [], price: 0 },
  setCart: () => { throw new Error("Not Implemented"); },
  

  isLoading: false,
  setIsLoading: () => { throw new Error("Not Implemented"); },
}

const AppContext = createContext<AppContextType>(init);
export { AppContext };