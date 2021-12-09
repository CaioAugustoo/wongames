import Link from 'next/link'
import { CardElement } from '@stripe/react-stripe-js'

import Button from 'components/Button'
import Heading from 'components/Heading'

import { ShoppingCart } from 'styled-icons/material-outlined'

import * as S from './styles'

const PaymentForm = () => {
  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        <CardElement options={{ hidePostalCode: true }} />
      </S.Body>

      <S.Footer>
        <Link href="/games" passHref>
          <Button as="a" fullWidth minimal>
            Continue shopping
          </Button>
        </Link>

        <Button fullWidth icon={<ShoppingCart />}>
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default PaymentForm
