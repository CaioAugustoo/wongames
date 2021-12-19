import { Description, Title } from 'components/Empty/styles'
import { Wrapper as GameItemWrapper } from 'components/GameItem/styles'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 10px;

    background-color: ${theme.colors.white};
    min-width: 600px;

    z-index: -1;

    padding: ${theme.spacings.xsmall} ${theme.spacings.small};

    ${Title} {
      font-size: ${theme.font.sizes.large};
    }

    ${Description} {
      color: ${theme.colors.black};
      font-size: ${theme.font.sizes.medium};
    }

    ${GameItemWrapper} {
      padding: ${theme.spacings.small} 0;
    }

    @media (max-width: 850px) {
      min-width: 500px;
    }

    @media (max-width: 500px) {
      min-width: 300px;
    }
  `}
`

export const Loader = styled.div`
  width: 10rem;
  height: 10rem;

  margin: 0 auto;
`

export const Games = styled.div`
  max-height: 230px;
  overflow-y: auto;

  margin-top: 1rem;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #bebebe;
    border-radius: 10px;
  }

  a {
    text-decoration: none;
  }
`
