import { QueryGames_games } from 'graphql/generated/QueryGames'
import {
  QueryHome_banners,
  QueryHome_sections_freeGames_highlight
} from 'graphql/generated/QueryHome'

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

export const gamesMapper = (games: QueryGames_games[] | null | undefined) => {
  return (
    games &&
    games.map((game) => ({
      title: game.name,
      slug: game.slug,
      developer: game.developers[0].name,
      img: game.cover?.url,
      price: game.price
    }))
  )
}

export const highlightMapper = (
  highlight: QueryHome_sections_freeGames_highlight | null | undefined
) => {
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
