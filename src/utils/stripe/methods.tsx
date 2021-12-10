import { CartItem } from 'hooks/useCart'
import { PaymentIntent } from '@stripe/stripe-js'

type PaymentIntentParams = {
  token: string
  items: CartItem[]
}

type FetcherParams = {
  url: string
  body: string
  token: string
}

type CreatePaymentParams = {
  items: CartItem[]
  paymentIntent?: PaymentIntent
  token: string
}

const fetcher = async ({ url, body, token }: FetcherParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body
  })
  const data = await response.json()

  return data
}

export const createPaymentIntent = async ({
  token,
  items
}: PaymentIntentParams) => {
  return fetcher({
    url: 'orders/create-payment-intent',
    body: JSON.stringify({ cart: items }),
    token
  })
}

export const createPayment = async ({
  items,
  token,
  paymentIntent
}: CreatePaymentParams) => {
  return fetcher({
    url: 'orders',
    body: JSON.stringify({
      cart: items,
      paymentIntentId: paymentIntent?.id,
      paymentMethod: paymentIntent?.payment_method
    }),
    token
  })
}
