import Profile from 'templates/Profile'

import ordersMock from 'components/OrderList/mock'
import OrderList, { OrderListProps } from 'components/OrderList'
import { GetServerSidePropsContext } from 'next'
import protectedRoutes from 'utils/protectedRoutes'

const Orders = ({ items }: OrderListProps) => {
  return (
    <Profile>
      <OrderList items={items} />
    </Profile>
  )
}

export default Orders

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context)

  return {
    props: {
      items: ordersMock,
      session
    }
  }
}
