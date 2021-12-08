import 'session.mock'
import 'match-media-mock'
import { screen } from '@testing-library/react'
import { render } from 'utils/test-utils'

import Wishlist from '.'

import gamesMock from 'components/GameCardSlider/mock'
import highLightMock from 'components/Highlight/mock'
import { WishlistContextDefaultValues } from 'hooks/useWishlist'

const props = {
  recommendedHighLight: highLightMock,
  recommendedGames: gamesMock
}

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>
  }
}))

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />
  }
}))

describe('<Wishlist />', () => {
  it('should render correctly', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      items: [gamesMock[0]]
    }
    render(<Wishlist recommendedTitle="Recommended" {...props} />, {
      wishlistProviderProps
    })

    expect(
      screen.getByRole('heading', { name: /wishlist/i })
    ).toBeInTheDocument()

    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
    expect(screen.getByText('Population Zero')).toBeInTheDocument()
  })

  it('should render empty when there are no games', () => {
    const wishlistProviderProps = {
      ...WishlistContextDefaultValues,
      items: []
    }

    render(
      <Wishlist
        recommendedTitle="Recommended"
        recommendedGames={gamesMock}
        recommendedHighLight={highLightMock}
      />,
      {
        wishlistProviderProps
      }
    )

    expect(screen.queryByText('Population Zero')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Your wishlist is empty/i }))
  })
})
