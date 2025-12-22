import { createContext } from "react";
// Теперь мы импортируем настоящий тип
import type { UserType } from "../../entities/user/model/UserType"; 
import type ToastData from "./ToastData";
import type CartType from "../../entities/order/model/CartType";

interface AppContextType {
    // Заменили any на UserType
    user: UserType | null; 
    setUser: (input: UserType | null) => void;
    
    showToast: (data: ToastData) => void;
    cart: CartType;
    setCart: (input: CartType) => void;
}

const init: AppContextType = {
    user: null,
    setUser: () => { throw new Error("Not Implemented 'setUser'"); },
    showToast: () => { throw new Error("Not Implemented 'showToast'"); },
    cart: { items: [], price: 0 },
    setCart: () => { throw new Error("Not Implemented 'setCart'"); },
}

const AppContext = createContext<AppContextType>(init);
export { AppContext };