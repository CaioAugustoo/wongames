import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import items from 'components/CartList/mock'

import CartDropdown from '.'
import { render } from 'utils/test-utils'
import { CartContextDefaultValues } from 'hooks/useCart'

describe('<CartDropdown />', () => {
  beforeEach(() => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      quantity: items.length,
      total: '$300,00'
    }

    render(<CartDropdown />, { cartProviderProps })
  })
  it('should render <CartIcon /> and its badge', () => {
    expect(screen.getByLabelText(/Shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${items.length}`)).toBeInTheDocument()
  })

  it('should render Dropdown content with cart items and total', () => {
    renderWithTheme(<CartDropdown />)

    expect(screen.getByText('$300,00')).toBeInTheDocument()
    expect(screen.getByText(/Borderlands 3/i)).toBeInTheDocument()
    expect(screen.getByText(`${items[0].title}`)).toBeInTheDocument()
  })
})
