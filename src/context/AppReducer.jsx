export default function AppReducer(state, action) {
    switch (action.type) {
        case "SET_USER": 
            return {
                ...state,
                user: action.userPayload
            };

        case "ADD_TO_BASKET": {
            const existingItem = state.basket.find(item => item.id === action.itemPayload.id);
            if (existingItem) {
                return {
                    ...state,
                    basket: state.basket.map(item => 
                        item.id === action.itemPayload.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                    )
                };
            }
            return {
                ...state,
                basket: [...state.basket, { ...action.itemPayload, quantity: 1 }]
            };
        }

        case "INCREASE_QUANTITY":
            return {
                ...state,
                basket: state.basket.map(item => 
                    item.id === action.idPayload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                basket: state.basket
                    .map(item => 
                        item.id === action.idPayload
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    )
                    .filter(item => item.quantity > 0)
            };

        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.idPayload)
            };
        
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            };
        
        default:
            return state;
    }
}
