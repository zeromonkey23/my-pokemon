import React, { Fragment } from 'react';
import {
  useQuery,
  gql
} from '@apollo/client';
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
        <div className="flex flex-wrap -m-4">
          {loading && <p>Loading...</p>}
          {pokemonList?.map((pokemon: PokemonItem, i: number, array: PokemonItem[]) => (
            <div key={pokemon?.id}>
              <div className="p-4 md:w-1/3" >
                <div
                  className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full p-10 object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                    src={pokemon?.artwork}
                    alt={'artwork of ' + pokemon?.name}/>
                  <div className="p-6">
                    <h1
                      className="title-font text-lg font-medium text-gray-600 mb-3">{pokemon?.name?.toLocaleUpperCase()}</h1>
                    <div className="flex items-center flex-wrap ">
                      <button
                        className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg text-white">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {i + 1 === array?.length &&
                  <div className="flex justify-center w-full">
                      <button onClick={loadMore}
                          className="bg-gradient-to-br from-pink-500 to-blue-800 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg text-white">
                          Load More
                      </button>
                  </div>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default PokemonList;
