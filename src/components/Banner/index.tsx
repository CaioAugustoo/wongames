import Ribbon, { RibbonColors, RibbonSizes } from '../Ribbon/index'
import Button from '../Button/index'

import Link from 'next/link'
import Image from 'next/image'

import * as S from './styles'

export type BannerProps = {
  img: string
  title: string
  subtitle: string
  buttonLabel: string
  buttonLink: string
  ribbon?: React.ReactNode
  ribbonColor?: RibbonColors
  ribbonSize?: RibbonSizes
}

const Banner = ({
  img,
  title,
  subtitle,
  buttonLabel,
  ribbon,
  buttonLink,
  ribbonColor = 'primary',
  ribbonSize = 'normal'
}: BannerProps) => (
  <S.Wrapper>
    {!!ribbon && (
      <Ribbon color={ribbonColor} size={ribbonSize}>
        {ribbon}
      </Ribbon>
    )}

    <S.ImageWrapper>
      <Image
        src={img}
        alt={title}
        layout="fill"
        aria-label={title}
        objectFit="cover"
      />
    </S.ImageWrapper>

    <S.Caption>
      <S.Title>{title}</S.Title>

      <S.Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
      <Link href={`/game/${buttonLink}`} passHref>
        <Button as="a" size="large">
          {buttonLabel}
        </Button>
      </Link>
    </S.Caption>
  </S.Wrapper>
)

export default Banner
