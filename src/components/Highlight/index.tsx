import Button from '../Button/index'

import Link from 'next/link'
import Image from 'next/image'

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
  <S.Wrapper alignment={alignment} data-cy="highlight">
    <Image src={backgroundImage} alt={`${title} background`} layout="fill" />
    {!!floatImage && (
      <S.FloatImageWrapper>
        <Image src={floatImage} alt={title} width={400} height={300} />
      </S.FloatImageWrapper>
    )}
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
