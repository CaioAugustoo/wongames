import Button from '../Button/index'

import Link from 'next/link'
import * as S from './styles'

export type HighLightProps = {
  title: string
  subtitle: string
  backgroundImage: string
  floatImage?: string
  buttonLabel: string
  buttonLink: string
  alignment?: 'right' | 'left'
}

const Highlight = ({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  floatImage,
  backgroundImage,
  alignment = 'right'
}: HighLightProps) => (
  <S.Wrapper backgroundImage={backgroundImage} alignment={alignment}>
    {!!floatImage && <S.FloatImage src={floatImage} alt={title} />}
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      <Link href={`/game/${buttonLink}`} passHref>
        <Button as="a">{buttonLabel}</Button>
      </Link>
    </S.Content>
  </S.Wrapper>
)

export default Highlight
