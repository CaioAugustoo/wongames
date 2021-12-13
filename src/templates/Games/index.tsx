import { KeyboardArrowDown as ArrowDown } from '@styled-icons/material-outlined/KeyboardArrowDown'

import { useRouter } from 'next/router'

import Base from 'templates/Base'

import ExploreSidebar, { ItemProps } from 'components/ExploreSidebar'
import GameCard from 'components/GameCard'
import { Grid } from 'components/Grid'
import Empty from 'components/Empty'

import { useQueryGames } from 'graphql/queries/games'
import { ParsedUrlQueryInput } from 'querystring'

import { parseQueryStringToFilter, parseQueryStringToWhere } from 'utils/filter'

import * as S from './styles'

export type GamesTemplateProps = {
  filterItems: ItemProps[]
}

const GamesTemplate = ({ filterItems }: GamesTemplateProps) => {
  const { push, query } = useRouter()

  const { data, loading, fetchMore } = useQueryGames({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })

  if (!data) return <p>Loading...</p>

  const { games, gamesConnection } = data

  const hasMoreGames = games.length < gamesConnection!.values!.length || 0

  function handleShowMore() {
    fetchMore({ variables: { limit: 15, start: data?.games.length } })
  }

  function handleFilter(items: ParsedUrlQueryInput) {
    push({
      pathname: '/games',
      query: items
    })
    return
  }

  return (
    <Base>
      <S.Main>
        <ExploreSidebar
          items={filterItems}
          onFilter={handleFilter}
          initialValues={parseQueryStringToFilter({
            queryString: query,
            filterItems
          })}
        />

        <section>
          {data.games.length ? (
            <>
              <Grid>
                {data?.games.map((game) => (
                  <GameCard
                    id={game.id}
                    key={game.slug}
                    title={game.name}
                    slug={game.slug}
                    developer={game.developers[0].name}
                    img={String(
                      game.cover?.url ?? '/img/img_game_fallback.png'
                    )}
                    price={game.price}
                  />
                ))}
              </Grid>

              {hasMoreGames && (
                <S.ShowMore>
                  {loading ? (
                    <S.ShowMoreLoading
                      src="/img/dots.svg"
                      alt="Loading more games"
                    />
                  ) : (
                    <S.ShowMoreButton role="button" onClick={handleShowMore}>
                      <p>Show More</p>
                      <ArrowDown size={35} />
                    </S.ShowMoreButton>
                  )}
                </S.ShowMore>
              )}
            </>
          ) : (
            <Empty
              title=":("
              description="We didn't find any games with this filter"
            />
          )}
        </section>
      </S.Main>
    </Base>
  )
}

export default GamesTemplate
