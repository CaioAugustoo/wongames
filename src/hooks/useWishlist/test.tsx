import { MockedProvider } from '@apollo/client/testing'
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { useWishlist, WishlistProvider } from '.'
import { createWishlistMock, wishlistItems, wishlistMock } from './mock'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
const session = { jwt: '123', user: { email: 'lorem@ipsum.com' } }
useSession.mockImplementation(() => [session])

describe('useWishlist', () => {
  it('should return wishlist items', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.items).toStrictEqual([
      wishlistItems[0],
      wishlistItems[1]
    ])
  })

  it('should return true or false if item is in wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    await waitForNextUpdate()

    expect(result.current.isInWishlist(wishlistItems[0].id)).toBe(true)
    expect(result.current.isInWishlist(wishlistItems[1].id)).toBe(true)
    expect(result.current.isInWishlist(wishlistItems[2].id)).toBe(false)
  })

  it('should add item to wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[createWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    act(() => {
      result.current.addToWishlist('3')
    })

    await waitForNextUpdate()
    expect(result.current.items).toStrictEqual([wishlistItems[2]])
  })
})
