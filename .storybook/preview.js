import '../.jest/next-image.mock'
import { addDecorator } from '@storybook/react'
import { withNextRouter } from 'storybook-addon-next-router'
import GlobalStyles from 'styles/global'
import { CartContext, CartContextDefaultValues } from '../src/hooks/useCart'

import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'

addDecorator(withNextRouter())

export const parameters = {
  backgrounds: {
    default: 'won-light',
    values: [
      {
        name: 'won-light',
        value: theme.colors.white
      },
      {
        name: 'won-dark',
        value: theme.colors.mainBg
      }
    ]
  }
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <CartContext.Provider
        value={{
          ...CartContextDefaultValues,
          ...(context?.args?.cartContextValue || {}),
          ...context.args
        }}
      >
        <GlobalStyles removeBg />
        <Story />
      </CartContext.Provider>
    </ThemeProvider>
  )
]
