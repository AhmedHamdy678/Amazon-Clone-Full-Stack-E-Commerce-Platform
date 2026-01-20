import { createContext, useReducer , useContext , useEffect} from "react";
import AppReducer from "./AppReducer";
import { auth } from "../Firebase/Firebase";

export const GlobalState = createContext();

export const ProviderContecxt = ({ children }) => {
    // Load basket from localStorage
    const getInitialBasket = () => {
        try {
            const savedBasket = localStorage.getItem('basket');
            return savedBasket ? JSON.parse(savedBasket) : [];
        } catch (error) {
            console.error('Error loading basket from localStorage:', error);
            return [];
        }
    };

    const initialState = {
        basket: getInitialBasket(),
        user: null,
    };
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Save basket to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('basket', JSON.stringify(state.basket));
        } catch (error) {
            console.error('Error saving basket to localStorage:', error);
        }
    }, [state.basket]);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) { 
                dispatch({
                    type: "SET_USER",
                    userPayload: authUser,
                });
            } else {
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <GlobalState.Provider
        value={{
            basket: state.basket,
            user: state.user,
            dispatch,
        }}
        >
        {children}
        </GlobalState.Provider>
    );
};

export const useAuth = ()=>{
    return useContext(GlobalState);
}
