import Base from 'templates/Base'

import { GameCardProps } from 'components/GameCard'
import { Divider } from 'components/Divider'
import GameInfo, { GameInfoProps } from 'components/GameInfo'
import Gallery, { GalleryImageProps } from 'components/Gallery'
import GameDetails, { GameDetailsProps } from 'components/GameDetails'
import Showcase from 'components/Showcase'
import TextContent from 'components/TextContent'

import * as S from './styles'

export type GameTemplateProps = {
  id: string
  cover: string
  gameInfo: GameInfoProps
  gallery?: GalleryImageProps[]
  description: string
  details: GameDetailsProps
  upcomingGames: GameCardProps[]
  recommendedGames: GameCardProps[]
  recommendedTitle: string
}

const Game = ({
  id,
  cover,
  gameInfo,
  gallery,
  description,
  details,
  recommendedGames,
  recommendedTitle
}: GameTemplateProps) => (
  <Base>
    <S.Cover src={cover} role="img" aria-label="cover" />

    <S.Main>
      <S.SectionGameInfo>
        <GameInfo {...gameInfo} id={id} />
      </S.SectionGameInfo>

      <S.SectionGallery>
        {!!gallery && <Gallery items={gallery} />}
      </S.SectionGallery>

      <S.SectionDescription>
        <TextContent title="Description" content={description} />
      </S.SectionDescription>

      <S.SectionGameDetails>
        <GameDetails {...details} />
        <Divider />
      </S.SectionGameDetails>

      <Showcase title={recommendedTitle} games={recommendedGames} />
    </S.Main>
  </Base>
)

export default Game
