import GameCard, { GameCardProps } from 'components/GameCard'
import { Container } from 'components/Container'
import { HighLightProps } from 'components/Highlight'
import { Divider } from 'components/Divider'
import { Grid } from 'components/Grid'
import Heading from 'components/Heading'
import Showcase from 'components/Showcase'
import Empty from 'components/Empty'

import Base from 'templates/Base'

import { useWishlist } from 'hooks/useWishlist'
import Loader from 'components/Loader'

import * as S from './styles'

export type WishlistTemplateProps = {
  recommendedGames: GameCardProps[]
  recommendedHighLight: HighLightProps
  recommendedTitle: string
}

const Wishlist = ({
  recommendedGames,
  recommendedTitle,
  recommendedHighLight
}: WishlistTemplateProps) => {
  const { items, loading } = useWishlist()

  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          Wishlist
        </Heading>

        {loading ? (
          <S.Loading>
            <Loader />
          </S.Loading>
        ) : items.length >= 1 ? (
          <Grid>
            {items?.map((game, index) => (
              <GameCard {...game} key={`wishlist-${index}`} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wishlist will appear here"
            hasLink
          />
        )}

        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighLight}
      />
    </Base>
  )
}

export default Wishlist
