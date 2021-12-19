import { Download } from '@styled-icons/boxicons-solid/Download'
import { useCart } from 'hooks/useCart'

import * as S from './styles'

export type PaymentInfoProps = {
  number: string
  flag: string
  img: string
  purchaseDate: string
}

export type GameItemProps = {
  id: string
  img: string | undefined
  title: string
  price: string
  downloadLink?: string
  paymentInfo?: PaymentInfoProps
  showIsInCart: boolean
}

const GameItem = ({
  id,
  img,
  title,
  price,
  downloadLink,
  paymentInfo,
  showIsInCart = true
}: GameItemProps) => {
  const { isInCart, removeFromCart } = useCart()

  return (
    <S.Wrapper>
      <S.GameContent>
        <S.ImageBox>
          <img src={img} alt={title} />
        </S.ImageBox>

        <S.Content>
          <S.Title>
            {title}
            {!!downloadLink && (
              <S.DownloadLink
                href={downloadLink}
                target="_blank"
                aria-label={`Download ${title} here`}
              >
                <Download size={22} />
              </S.DownloadLink>
            )}
          </S.Title>
          <S.Group>
            <S.Price>{price}</S.Price>
            {showIsInCart && isInCart(id) && (
              <S.Remove onClick={() => removeFromCart(id)}>Remove</S.Remove>
            )}
          </S.Group>
        </S.Content>
      </S.GameContent>

      {!!paymentInfo && (
        <S.PaymentContent>
          <p>{paymentInfo.purchaseDate}</p>
          <S.CardInfo>
            <span>{paymentInfo.number}</span>
            {!!paymentInfo.img && !!paymentInfo.flag && (
              <img src={paymentInfo.img} alt={paymentInfo.flag} />
            )}
          </S.CardInfo>
        </S.PaymentContent>
      )}
    </S.Wrapper>
  )
}

export default GameItem
