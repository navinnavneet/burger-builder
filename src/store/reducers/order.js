import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {
                id: action.orderId
            })
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            })
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const fetchBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
                orders: action.orders,
                loading: false
            })
}

const fetcheOrderFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
            
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
            
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
            
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
            
        case actionTypes.FETCH_ORDERS_START: return fetchBurgerStart(state, action);
            
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
            
        case actionTypes.FETCH_ORDERS_FAIL: return fetcheOrderFail(state, action)
            
        default: return state;
            
    }
}

export default reducer;