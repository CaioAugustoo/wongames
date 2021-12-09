import { CartListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import { HighLightProps } from 'components/Highlight'
import Heading from 'components/Heading'
import Showcase from 'components/Showcase'
import CartList from 'components/CartList'
import PaymentForm from 'components/PaymentForm'

import Base from 'templates/Base'

import * as S from './styles'

export type CartProps = {
  recommendedGames: GameCardProps[]
  recommendedHighLight: HighLightProps
  cartTitle: string
} & CartListProps

const Cart = ({
  recommendedGames,
  recommendedHighLight,
  cartTitle
}: CartProps) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          My cart
        </Heading>

        <S.Content>
          <CartList />
          <PaymentForm />
        </S.Content>

        <Divider />
      </Container>

      <Showcase
        title={cartTitle}
        games={recommendedGames}
        highlight={recommendedHighLight}
      />
    </Base>
  )
}

export default Cart
