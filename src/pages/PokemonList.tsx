import React, { Fragment } from 'react';
import {
  useQuery,
  gql
} from '@apollo/client';
import { Link } from 'react-router-dom';
import { PokemonItem } from '../common/model/response';

const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
          id
          url
          name
          artwork
        }
      }
    }
  `

const PokemonList = () => {
  const [variables, setVariables] = React.useState({
    limit: 10,
    offset: 0
  });
  const [pokemonList, setPokemonList] = React.useState<PokemonItem[]>([]);
  const {loading} = useQuery(GET_POKEMONS, {
    variables,
    onCompleted: (data) => {
      setPokemonList([...pokemonList, ...data?.pokemons?.results]);
    }
  });
  const loadMore = () => {
    setVariables({
      limit: 10,
      offset: variables.offset + 10
    });
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pb-24 pt-5 mx-auto">
        <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">Pokemon List</h1>
        <div className="flex flex-wrap">
          {loading && <p>Loading...</p>}
          {pokemonList?.map((pokemon: PokemonItem, i: number, array: PokemonItem[]) => (
            <Fragment key={pokemon?.id}>
              <div className="p-8 w-96 mt-28 cursor-pointer rounded-3xl bg-gradient-to-tl from-green-300 to-blue-400 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
                <div className="-mb-32 -translate-y-1/2 transform">
                  <img src={pokemon?.artwork} alt={'Artwork of ' + pokemon?.name}
                       title={pokemon?.name} className="mx-auto h-64"/>
                </div>
                <h3 className="text-center text-4xl font-bold mb-4">{pokemon?.name?.toUpperCase()}</h3>
                <Link to={'/pokemon-list/' + pokemon?.id} className="text-center">
                  <button className="rounded-xl bg-black px-24 py-2 text-white">Select pokemon</button>
                </Link>
              </div>
              {i + 1 === array?.length &&
                  <div className="flex justify-center w-full mt-10">
                    <button onClick={loadMore}
                            className="bg-gradient-to-br from-cyan-300 to-blue-800 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg text-white">
                      Load More
                    </button>
                  </div>
              }
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
};

export default PokemonList;
