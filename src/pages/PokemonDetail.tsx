import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useQuery,
} from '@apollo/client';
import { toTitleCase, TYPE_COLORS } from '../common/constants';
import { Pokemon } from '../common/model/response';
import { GET_POKEMON } from '../common/queries';

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
    <section className="text-gray-600 body-font">
      <h1 className="font-medium leading-tight text-5xl px-5 pt-5 mt-0 mb-10">Pokemon Detail</h1>
      <div className="flex flex-wrap justify-center gap-6 bg-slate-300 mb-24">
        <div className="max-w-lg lg:max-w-screen-lg py-4 px-8 bg-white shadow-lg rounded-2xl mt-10 lg:my-10 w-full">
          <div className="flex justify-center lg:justify-end -mt-16 lg:-mt-20 mb-5">
            <img className="w-1/4 h-1/4 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white bg-gradient-to-r from-green-200 to-blue-400"
                 src={pokemon?.sprites?.front_default}/>
          </div>
          <div className="flex justify-between gap-6 items-stretch border-b border-gray-200 pb-6 mb-4">
            <h2 className="text-gray-800 text-3xl font-semibold">{toTitleCase(pokemon?.name)}</h2>
            <div className="flex justify-start gap-1 items-end">
              {pokemon?.types?.map((type) => (
                <div style={{backgroundColor: TYPE_COLORS[type?.type?.name as keyof typeof TYPE_COLORS]}}
                     className={`p-1 mr-2 text-xs leading-3 text-black rounded-full w-6 h-6 `}>
                  <img className="w-full h-full" src={require('../assets/type-icons/' + type?.type?.name + '.svg')} alt={'Pokemon ' + type?.type?.name + ' icon'}/>
                </div>
              ))}
              <button
                className="bg-gradient-to-br from-pink-300 to-red-700 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg text-white">
                Catch!
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-6 mb-4">
            {pokemon?.stats?.map((stat, i) => (
              <span tabIndex={0}
                    className={'focus:outline-none text-sm leading-normal pt-2 text-gray-500' + (i % 2 === 1 ? ' text-right' : '')}>
                {i % 2 === 0 &&
                    <span className="text-sm">{stat?.stat?.name?.toUpperCase()} </span>
                } <b className="font-bold text-xl">{stat?.base_stat}</b>
                {i % 2 === 1 &&
                    <span className="text-sm"> {stat?.stat?.name?.toUpperCase()}</span>
                }
              </span>
            ))}
          </div>
          <div className="px-2 py-2 text-gray-800">
            <h3 className="text-xl font-bold mb-5">Moves:</h3>
            <div tabIndex={0} className="focus:outline-none flex-wrap flex justify-between">
              {pokemon?.moves?.map((move) => (
                <div
                  className="py-2 mr-3 px-4 mb-5 m-auto text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">{move?.move?.name}</div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-start mt-5 -mb-16 lg:-mb-20">
            <img className="w-1/4 h-1/4 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white bg-gradient-to-r from-green-200 to-blue-400"
                 src={pokemon?.sprites?.back_default}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonDetail;
