import Wishlist, { WishlistTemplateProps } from 'templates/Wishlist'

import { gamesMapper, highlightMapper } from 'utils/mappers'

import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'
import { initializeApollo } from '../utils/apollo'

import gamesMock from 'components/GameCardSlider/mock'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protectedRoutes'

const WishlistPage = (props: WishlistTemplateProps) => {
  return <Wishlist {...props} />
}

export default WishlistPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()
  const session = await protectedRoutes(context)

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      session,
      games: gamesMock,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighLight: highlightMapper(
        data.recommended?.section?.highlight
      ),
      recommendedTitle: data.recommended?.section?.title
    }
  }
}
