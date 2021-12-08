import Button, { ButtonProps } from 'components/Button'
import Spinner from 'components/Spinner'
import { useWishlist } from 'hooks/useWishlist'
import { useSession } from 'next-auth/client'
import { useCallback, useState } from 'react'
import { Favorite, FavoriteBorder } from 'styled-icons/material-outlined'

type WishlistButtonProps = {
  id: string
  hasText?: boolean
} & Pick<ButtonProps, 'size'>

const WishlistButton = ({
  id,
  hasText,
  size = 'small'
}: WishlistButtonProps) => {
  const [session] = useSession()
  const [loading, setLoading] = useState(false)

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const handleClick = useCallback(async () => {
    setLoading(true)
    isInWishlist(id) ? await removeFromWishlist(id) : await addToWishlist(id)
    setLoading(false)
  }, [addToWishlist, isInWishlist, removeFromWishlist, id])

  if (!session) return null

  const buttonText = isInWishlist(id)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist'

  return (
    <Button
      minimal
      size={size}
      onClick={handleClick}
      icon={
        loading ? (
          <Spinner />
        ) : isInWishlist(id) ? (
          <Favorite aria-label={buttonText} />
        ) : (
          <FavoriteBorder aria-label={buttonText} />
        )
      }
    >
      {hasText && buttonText}
    </Button>
  )
}

export default WishlistButton
