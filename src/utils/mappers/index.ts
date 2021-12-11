import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'
import { QueryOrders_orders } from 'graphql/generated/QueryOrders'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import { formatDate } from 'utils/formatters/date'
import { formatPrice } from 'utils/formatters/price'

export const bannerMapper = (banners: QueryHome_banners[]) => {
  return banners.map((banner) => ({
    img: banner.image?.url,
    title: banner.title,
    subtitle: banner.subtitle,
    buttonLink: banner.button?.link,
    ...(banner.ribbon && {
      ribbon: banner.ribbon?.text,
      ribbonColor: banner.ribbon.color,
      ribbonSize: banner.ribbon.size
    }),
    buttonLabel: banner.button?.label
  }))
}

export const gamesMapper = (
  games: QueryGames_games[] | QueryWishlist_wishlists_games[] | null | undefined
) => {
  if (!games) return []
  return games.map((game) => ({
    id: game.id,
    title: game.name,
    slug: game.slug,
    developer: game.developers[0].name,
    img: game.cover?.url ?? 'img/img_game_fallback.png',
    price: game.price
  }))
}

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined
) => {
  if (!highlight) return null
  return (
    highlight && {
      title: highlight?.title,
      subtitle: highlight?.subtitle,
      backgroundImage: highlight?.background?.url,
      buttonLabel: highlight?.buttonLabel,
      buttonLink: highlight?.buttonLink,
      floatImage: highlight?.floatImage?.url ?? '',
      alignment: highlight?.alignment
    }
  )
}

export const cartMapper = (games: QueryGames_games[] | undefined) => {
  return games
    ? games.map((game) => ({
        id: game.id,
        img: game?.cover?.url ?? 'img/img_game_fallback.png',
        title: game.name,
        price: formatPrice(game.price)
      }))
    : []
}

export const ordersMapper = (orders: QueryOrders_orders[]) => {
  return orders
    ? orders.map((order) => ({
        id: order.id,
        paymentInfo: {
          flag: order.card_brand,
          img: order.card_brand ? `/img/cards/${order.card_brand}.png` : null,
          number: order.card_last4
            ? `**** **** **** ${order.card_last4}`
            : 'Free Game',
          purchaseDate: `Purchase made on ${formatDate(order.created_at)}`
        },
        games: order.games.map((game) => ({
          id: game.id,
          title: game.name,
          downloadLink:
            'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
          img: game.cover?.url ?? 'img/img_game_fallback.png',
          price: formatPrice(game.price)
        }))
      }))
    : []
}
