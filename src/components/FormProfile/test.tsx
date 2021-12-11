import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import FormProfile from '.'

describe('<FormProfile />', () => {
  it('should render the profile form', () => {
    renderWithTheme(<FormProfile username="caioaugusto" email="caio@won.com" />)

    expect(
      screen.getByRole('heading', { name: /My profile/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /Reset password/i })
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })
})
