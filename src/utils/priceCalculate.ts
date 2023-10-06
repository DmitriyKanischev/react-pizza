import { TCartItem } from "../redux/slices/cartSlice";

export const priceCalculate = (items:TCartItem[]) => {
    let price = items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0)
    return price
}