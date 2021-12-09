import { GetServerSidePropsContext } from 'next'

import Cart, { CartProps } from 'templates/Cart'

import cardsMock from 'components/PaymentOptions/mock'

import { initializeApollo } from 'utils/apollo'
import { gamesMapper, highlightMapper } from 'utils/mappers'
import protectedRoutes from 'utils/protectedRoutes'

import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'

const CartPage = (props: CartProps) => {
  return <Cart {...props} />
}

export default CartPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  const apolloClient = initializeApollo(null, session)
  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  return {
    props: {
      session,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighLight: highlightMapper(
        data.recommended?.section?.highlight
      ),
      cartTitle: data.recommended?.section?.title,
      cards: cardsMock
    }
  }
}
