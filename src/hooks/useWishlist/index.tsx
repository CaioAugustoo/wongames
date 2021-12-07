import { useMutation } from '@apollo/client'
import { GameCardProps } from 'components/GameCard'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { gamesMapper } from 'utils/mappers'

export type WishlistContextData = {
  items: GameCardProps[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  loading: boolean
}
export const WishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false
}
export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
)
export type WishlistProviderProps = {
  children: React.ReactNode
}

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [session] = useSession()
  const [wishlistId, setWishlistId] = useState<string | null>()
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  const [createList, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_WISHLIST,
    {
      context: {
        session
      },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist?.games || [])
        setWishlistId(data?.createWishlist?.wishlist?.id)
      }
    }
  )

  const [updateList, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_WISHLIST,
    {
      context: {
        session
      },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist?.games || [])
        setWishlistId(data?.createWishlist?.wishlist?.id)
      }
    }
  )

  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  const isInWishlist = useCallback(
    (id: string) => {
      return wishlistItems.some((gameId) => gameId.id === id)
    },
    [wishlistItems]
  )

  const wishlistGamesIds = useMemo(() => {
    return wishlistItems.map(({ id }) => id)
  }, [wishlistItems])

  const addToWishlist = (id: string) => {
    if (!wishlistId) {
      return createList({
        variables: {
          input: {
            data: {
              games: [...wishlistGamesIds, id]
            }
          }
        }
      })
    }

    return updateList({
      variables: {
        input: {
          where: {
            id: wishlistId
          },
          data: {
            games: [...wishlistGamesIds, id]
          }
        }
      }
    })
  }

  const removeFromWishlist = (id: string) => {
    updateList({
      variables: {
        input: {
          where: {
            id: wishlistId
          },
          data: {
            games: wishlistGamesIds.filter((gameId) => gameId !== id)
          }
        }
      }
    })
  }

  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || [])
    setWishlistId(data?.wishlists[0]?.id)
  }, [data])

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading: loadingQuery || loadingCreate || loadingUpdate
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
const useWishlist = () => useContext(WishlistContext)
export { WishlistProvider, useWishlist }
