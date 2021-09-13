import produce from "immer";
import api from '../../../services/api'


export default function cart(state = [], action) {
  switch (action.type) {
    case "@cart/ADD_SUCCESS":
      return produce(state, draft => {
        const { product } = action;
        console.log("Reducer de add success com produto : ", product)
        draft.push(product);
      });

    case "@cart/REMOVE":
      return produce(state, draft => {
        const productIndex = draft.findIndex(
          product => product.productId === action.productId
        );

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case "@cart/UPDATE_AMOUNT_SUCCESS": {
      return produce(state, draft => {
        const clientId = 17
        const productIndex = draft.findIndex(
          product => product.productId === action.productId
        );

        if (productIndex >= 0) {
          console.log("Atualizando produto no back end", draft[productIndex], action)
          if(draft[productIndex].amount < action.amount) {
            api.put("/order/item", {
              client: clientId,
              product: action.productId,
              quantity: 1
            })
          } else if(draft[productIndex].amount > action.amount) {
            api.delete(`${clientId}/order/item/${action.productId}`)
          }
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
