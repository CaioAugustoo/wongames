import { Container } from 'components/Container'
import Empty from 'components/Empty'
import Base from 'templates/Base'

export default function Page404() {
  return (
    <Base>
      <Container>
        <Empty
          title="Ooppss..."
          description="The page you are looking for does not yet exist."
          hasLink
        />
      </Container>
    </Base>
  )
}
