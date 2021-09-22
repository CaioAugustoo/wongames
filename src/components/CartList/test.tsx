import { CartContextDefaultValues } from 'hooks/useCart'
import { render, screen } from 'utils/test-utils'

import CartList from '.'
import items from './mock'

describe('<CartList />', () => {
  it('should render the cart list', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items,
      total: '$215,00'
    }

    const { container } = render(<CartList />, { cartProviderProps })

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('$215,00')).toHaveStyle({ color: '#2499AE' })
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the button', () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      items
    }

    render(<CartList hasButton />, { cartProviderProps })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })
  it('should render empty if there are no games', () => {
    render(<CartList />)
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument()
  })
})
