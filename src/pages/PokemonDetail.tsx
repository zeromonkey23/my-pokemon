import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useQuery,
  gql
} from '@apollo/client';
import { Pokemon } from '../common/model/response';


const GET_POKEMON = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        species {
          name
        }
        types {
          type {
            name
          }
        }
        moves {
          move {
            name
          }
        }
        stats {
          stat {
            name
          }
          base_stat
        }
        sprites {
          back_default
          front_default
        }
      }
    }
  `

const PokemonDetail = () => {
  const {name} = useParams();
  const [pokemon, setPokemon] = React.useState<Pokemon>();
  const {loading} = useQuery(GET_POKEMON, {
    variables: { name },
    onCompleted: (data) => {
      setPokemon(data?.pokemon);
    }
  });
  return (
    <div aria-label="group of cards" tabIndex={0} className="focus:outline-none w-full">
      <div className="lg:flex items-center justify-center w-full">
        {loading && <div>Loading...</div>}
        {!loading && <div tabIndex={0}
              className="focus:outline-none lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 pb-10 shadow rounded">
          <div className="flex justify-between">
            <img src={pokemon?.sprites?.front_default} alt={'Front sprite of ' + pokemon?.name}
                 className="w-24 h-24"/>
            <img src={pokemon?.sprites?.back_default} alt={'Back sprite of ' + pokemon?.name}
                 className="w-24 h-24"/>
            <button
                className="bg-gradient-to-br from-pink-300 to-red-700 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg text-white">
                Catch!
            </button>
          </div>
          <div className="flex items-center border-b border-gray-200 pb-6">
            <div className="flex items-start justify-between w-full">
              <div className="pl-3 w-full">
                <h2 tabIndex={0}
                    className="focus:outline-none text-2xl font-bold leading-5 text-gray-800">{pokemon?.name?.toUpperCase()}</h2>
                <div tabIndex={0} className="focus:outline-none flex mt-2 mb-3">
                  {pokemon?.types?.map((type) => (
                    <div
                      className="py-2 px-4 mr-2 text-xs leading-3 text-black rounded-full bg-gray-200">{type?.type?.name}</div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {pokemon?.stats?.map((stat, i) => (
                    <span tabIndex={0}
                          className={'focus:outline-none text-sm leading-normal pt-2 text-gray-500' + (i % 2 === 1 ? ' text-right' : '')}><b
                      className="font-bold">{stat?.stat?.name}</b>: {stat?.base_stat}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 py-2">
            <h3 className="text-xl font-bold mb-5">Moves:</h3>
            <div tabIndex={0} className="focus:outline-none grid grid-cols-4 gap-2 text-center">
              {pokemon?.moves?.map((move) => (
                <div
                  className="py-2 mr-3 px-4 m-auto text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">{move?.move?.name}</div>
              ))}
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default PokemonDetail;
