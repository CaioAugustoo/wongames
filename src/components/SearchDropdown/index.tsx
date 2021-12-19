import React, { useState } from 'react'

import Link from 'next/link'

import { useQueryGames } from 'graphql/queries/games'

import Dropdown from 'components/Dropdown'
import TextField from 'components/TextField'
import Empty from 'components/Empty'
import Loader from 'components/Loader'
import GameItem from 'components/GameItem'

import useDebounce from 'hooks/useDebounce'

import { Search as SearchIcon } from '@styled-icons/boxicons-regular/Search'

import * as S from './styles'

const SearchDropdown = () => {
  const [search, setSearch] = useState('')
  const { value, isLoading: isDebouncing } = useDebounce(search)

  const { data, loading, error } = useQueryGames({
    variables: {
      where: {
        name: value
      }
    }
  })

  const isLoading = loading || isDebouncing

  function handleSearchGame(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  return (
    <Dropdown title={<SearchIcon size="25px" />}>
      <S.Wrapper>
        <TextField
          onChange={handleSearchGame}
          icon={<SearchIcon />}
          placeholder="Search a game by the name"
        />

        {isLoading && (
          <S.Loader>
            <Loader />
          </S.Loader>
        )}

        {!isLoading && !!search && !error && !data?.games?.length && (
          <Empty title="Ooopss..." description={`No results for: ${search}`} />
        )}

        {!isLoading && !!data?.games?.length && (
          <S.Games>
            {data?.games?.map((game) => (
              <Link key={game.slug} href={`/game/${game?.slug}`} passHref>
                <a>
                  <GameItem
                    id={game.id}
                    showIsInCart={false}
                    img={game?.cover?.url}
                    price={game?.price === 0 ? 'Free' : String(game?.price)}
                    title={game?.name}
                  />
                </a>
              </Link>
            ))}
          </S.Games>
        )}
      </S.Wrapper>
    </Dropdown>
  )
}

export default SearchDropdown
