import { useEffect, useState } from 'react'

import Link from 'next/link'

import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'

import Button from 'components/Button'
import Heading from 'components/Heading'

import { useCart } from 'hooks/useCart'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'

import * as S from './styles'

const cardStyle = {
  base: {
    fontSize: '16px'
  }
}

const PaymentForm = () => {
  const { items } = useCart()
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    if (!items.length) return
  }, [items])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event?.error?.message)
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        <CardElement
          options={{
            hidePostalCode: true,
            style: cardStyle
          }}
          onChange={handleChange}
        />

        {error && (
          <S.Error>
            <ErrorOutline size={20} />
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

        <Button
          fullWidth
          icon={<ShoppingCart />}
          disabled={disabled || !!error}
        >
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default PaymentForm
