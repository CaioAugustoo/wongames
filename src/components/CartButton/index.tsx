import {
  RemoveShoppingCart,
  AddShoppingCart
} from '@styled-icons/material-outlined'

import Button from 'components/Button'

import { useCart } from 'hooks/useCart'

type CartButtonProps = {
  id: string
}

const CartButton = ({ id }: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()

  return (
    <Button
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
      icon={
        isInCart(id) ? (
          <RemoveShoppingCart aria-label="Remove from cart" />
        ) : (
          <AddShoppingCart aria-label="Add to cart" />
        )
      }
      size="small"
    />
  )
}

export default CartButton
