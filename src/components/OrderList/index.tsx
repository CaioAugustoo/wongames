import Empty from 'components/Empty'
import GameItem, { GameItemProps, PaymentInfoProps } from 'components/GameItem'
import Heading from 'components/Heading'

import * as S from './styles'

export type OrderListProps = {
  items?: Array<{
    paymentInfo?: PaymentInfoProps
    games: GameItemProps[]
  }>
}

export type SortOrderProps = Pick<PaymentInfoProps, 'purchaseDate'>

const OrderList = ({ items }: OrderListProps) => {
  return (
    <S.Wrapper>
      <Heading lineBottom color="black" lineColor="primary" size="small">
        My orders
      </Heading>

      {items?.length ? (
        items
          ?.map((order) =>
            order?.games?.map((item) => (
              <GameItem
                key={item.id}
                {...item}
                paymentInfo={order.paymentInfo}
              />
            ))
          )
          .reverse()
      ) : (
        <Empty
          title="You haven't made a purchase yet."
          description="Visit our library and explore amazing games and offers"
          hasLink
        />
      )}
    </S.Wrapper>
  )
}

export default OrderList
