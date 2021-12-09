import { useState } from 'react'

import Link from 'next/link'

import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'

import Button from 'components/Button'
import Heading from 'components/Heading'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'

import * as S from './styles'

const PaymentForm = () => {
  const [error, setError] = useState<string | undefined>()

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setError(event?.error?.message)
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        <CardElement
          options={{ hidePostalCode: true }}
          onChange={handleChange}
        />

        {error && (
          <S.Error>
            <ErrorOutline size={15} />
            {error}
          </S.Error>
        )}
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
