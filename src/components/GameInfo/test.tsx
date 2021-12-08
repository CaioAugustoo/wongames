import 'session.mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameInfo from '.'

const props = {
  id: '1',
  title: 'My Game Title',
  description: 'Game Description',
  price: 210.0
}

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    const { container } = renderWithTheme(<GameInfo {...props} />)

    expect(
      screen.getByRole('heading', { name: /My Game Title/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/Game Description/i)).toBeInTheDocument()
    expect(screen.getByText('$210.00')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render buttons', () => {
    renderWithTheme(<GameInfo {...props} />)

    expect(
      screen.getByRole('button', { name: /Add to cart/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Add to wishlist/i })
    ).toBeInTheDocument()
  })
})
