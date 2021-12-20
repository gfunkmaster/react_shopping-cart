import { Cartitem } from "../CartItem/Cartitem";
import { Wrapper } from "./Cart.styles";
import { cartItemType } from "../App";
type Props = {
    cartItems: cartItemType[];
    addToCart: (clickedItem: cartItemType) => void;
    removeFormCart: (id: number) => void; 
}
export const Cart: React.FC<Props> = ({cartItems, addToCart, removeFormCart}) => {
    //total
   const calculateTotal = (items: cartItemType[]) =>
     items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
    return (
      <Wrapper>
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart</p> : null}
        {cartItems.map((item) => (
          <Cartitem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFormCart}
          />
        ))}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      </Wrapper>
    );
}
