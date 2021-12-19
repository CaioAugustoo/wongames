import { renderHook } from '@testing-library/react-hooks'

import useDebounce from '.'

describe('useDebounce', () => {
  it('should return debounced value after 500 ms', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useDebounce('initial value')
    )

    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.value).toBe('initial value')
  })
})
