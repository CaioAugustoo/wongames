import { screen } from '@testing-library/react'
import { CartContextDefaultValues } from 'hooks/useCart'
import { render } from 'utils/test-utils'

import CartIcon from '.'

describe('<CartIcon />', () => {
  it('should render without badge', () => {
    render(<CartIcon />)

    expect(screen.getByLabelText(/Shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Cart items/i)).not.toBeInTheDocument()
  })

  it('should render with badge', () => {
    render(<CartIcon />, {
      cartProviderProps: { ...CartContextDefaultValues, quantity: 10 }
    })

    expect(screen.getByLabelText(/Shopping cart/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Cart items/i)).toBeInTheDocument()
    expect(screen.getByText(10)).toBeInTheDocument()
  })
})
