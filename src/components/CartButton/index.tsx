import {
  RemoveShoppingCart,
  AddShoppingCart
} from '@styled-icons/material-outlined'

import Button, { ButtonProps } from 'components/Button'

import { useCart } from 'hooks/useCart'

type CartButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const CartButton = ({
  id,
  size = 'small',
  hasText = false
}: CartButtonProps) => {
  const { isInCart, addToCart, removeFromCart } = useCart()
  const ButtonText = isInCart(id) ? 'Remove from cart' : 'Add to cart'

  return (
    <Button
      onClick={() => (isInCart(id) ? removeFromCart(id) : addToCart(id))}
      icon={isInCart(id) ? <RemoveShoppingCart /> : <AddShoppingCart />}
      size={size}
      aria-label={ButtonText}
    >
      {hasText && ButtonText}
    </Button>
  )
}

export default CartButton
