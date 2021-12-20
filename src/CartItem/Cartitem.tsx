import { Button } from '@material-ui/core'
import Item from '../Item/item'
import React from 'react'
import { Wrapper } from './CartItem.styles'
import { cartItemType } from '../App'
type Props = {
    item: cartItemType,
    addToCart: (clickedItem: cartItemType) => void;
    removeFromCart: (id: number) => void;
} 
export const Cartitem: React.FC<Props> = ({item, addToCart, removeFromCart}) => {
    return (
      <Wrapper>
        <div>
          <h3>{item.title}</h3>
          <div className="information">
            <p>Price: ${item.price}</p>
            <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          </div>

          <div className="buttons">
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => removeFromCart(item.id)}
            >
             
              -
            </Button>

            <p>{item.amount}</p>

            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => addToCart(item)}> +</Button>
          </div>
        </div>
        <img src={item.image} alt={item.title} />
        
      </Wrapper>
    );
}
