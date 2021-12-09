import { FormEvent, useEffect, useState } from 'react'

import Link from 'next/link'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'

import { createPaymentIntent } from 'utils/stripe/methods'

import Button from 'components/Button'
import Heading from 'components/Heading'
import { FormLoading } from 'components/Form'

import { useCart } from 'hooks/useCart'

import { ErrorOutline, ShoppingCart } from 'styled-icons/material-outlined'

import * as S from './styles'

export type PaymentFormProps = {
  session: Session
}

const cardStyle = {
  base: {
    fontSize: '16px'
  }
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const { push } = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState<string | undefined | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!items.length) return

    setFreeGames(false)

    const setPaymentMode = async () => {
      const data = await createPaymentIntent({
        items,
        token: session.jwt as string
      })

      if (data?.freeGames) {
        setFreeGames(true)
        return
      }

      if (data?.error) {
        setError(data?.error)
        return
      }

      setClientSecret(data.client_secret)
    }
    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event?.error?.message)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (freeGames) {
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)
      push('/success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <>
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
            </>
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
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error || loading)}
          >
            {!loading && 'Buy now'}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
