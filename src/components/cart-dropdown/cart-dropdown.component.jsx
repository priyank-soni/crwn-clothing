import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const CartDropDown = () => {

    const {cartItems} = useContext(CartContext);

    const navigate = useNavigate();

    const goToCheckOutHandler = () => navigate('/checkout');
    return(
        <CartDropDownContainer>
            <CartItems>
                { cartItems.length ?  (cartItems.map((item) => <CartItem cartItem={item} key={item.id}/>)) : 
                (<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItems>
            <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    )
}

export default CartDropDown;
