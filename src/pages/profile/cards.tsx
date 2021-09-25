import CardList, { CardListProps } from 'components/CardList'
import Profile from 'templates/Profile'

import mockCards from 'components/PaymentOptions/mock'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protectedRoutes'

const Cards = ({ cards }: CardListProps) => {
  return (
    <Profile>
      <CardList cards={cards} />
    </Profile>
  )
}

export default Cards

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      cards: mockCards,
      session
    }
  }
}
