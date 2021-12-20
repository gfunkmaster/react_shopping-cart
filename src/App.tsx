import { Badge, Divider } from "@material-ui/core";
import { StyledButton, Wrapper } from "./App.styles";

import { AddShoppingCart } from "@material-ui/icons";
import { Cart } from "./Cart/Cart";
import { Drawer } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Item from "./Item/item";
import { LinearProgress } from "@material-ui/core";
import { useQuery } from "react-query";
import { useState } from "react";

export  type cartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price:  number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<cartItemType[]> =>
      await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as cartItemType[]);
  const {data, isLoading, error} = useQuery<cartItemType[]>('products', getProducts );
  console.log(data);

  const getTotalItems = (items:cartItemType[]) => 
  items.reduce((ack: number, item)=> ack + item.amount, 0);
  
  const handleAddToCart = (clickedItem:cartItemType) => {
    setCartItems(prev => {
      //1. is the item alreadu in cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if(isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id
          ? {...item, amount: item.amount + 1}
          : item
        ))
      }
      //First item the item is added
      return [...prev, {...clickedItem, amount: 1}]
      
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as cartItemType[])
    );
  };
  
   if (isLoading) return <LinearProgress />;
   if (error) return <div>Something went wrong</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFormCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
  
}

export default App;
