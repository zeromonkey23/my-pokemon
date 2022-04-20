import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useQuery,
} from '@apollo/client';
import { toTitleCase, TYPE_COLORS } from '../common/constants';
import { Pokemon } from '../common/model/response';
import { GET_POKEMON } from '../common/queries';
import Moves from '../components/Moves';
import Stats from '../components/Stats';
import Types from '../components/Types';
import Swal, { SweetAlertOptions } from 'sweetalert2';

const PokemonDetail = () => {
  const {name} = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isCatching, setIsCatching] = useState(false);
  const [myPokemonList, setMyPokemonList] = useState<Pokemon[]>([]);
  const {loading} = useQuery(GET_POKEMON, {
    variables: { name },
    onCompleted: (data) => {
      setPokemon(data?.pokemon);
    }
  });

  useEffect(() => {
    const pokemonList = localStorage.getItem('myPokemonList');
    if (pokemonList) {
      setMyPokemonList(JSON.parse(pokemonList));
    }
  }, []);

  const onHandleCatch = () => {
    setIsCatching(true);
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        Swal.fire({
          title: 'Congratulations!',
          text: `You caught ${toTitleCase(pokemon?.name)}!`,
          icon: 'success',
          input: 'text',
          inputLabel: 'Your new pokemon nickname',
          confirmButtonText: 'OK',
          inputValidator: (value) => {
            if (!value) {
              return 'Please enter a nickname!';
            }
            if (myPokemonList.find(p => p.nickname === value)) {
              return 'This nickname is already taken!';
            }
          }
        } as SweetAlertOptions)
          .then((event) => {
            setIsCatching(false);
            const newPokemonList = [...myPokemonList, { ...pokemon, nickname: event?.value }];
            setMyPokemonList(newPokemonList);
            localStorage.setItem('myPokemonList', JSON.stringify(newPokemonList));
            Swal.fire({
              title: 'Congratulations!',
              text: `${event?.value} has been added to My Pokemon!`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
          });
      } else {
        Swal.fire({
          title: 'Oh no!',
          text: 'You failed to catch the pokemon!',
          icon: 'error',
          confirmButtonText: 'OK',
        } as SweetAlertOptions)
          .then(() => {
            setIsCatching(false);
          });
      }
    }, 1000);
  };

  const pokemonBG = {
    background: `linear-gradient(
                   to right, 
                   ${TYPE_COLORS[pokemon?.types![0]?.type?.name as keyof typeof TYPE_COLORS]}, 
                   ${TYPE_COLORS[pokemon?.types![1]?.type?.name as keyof typeof TYPE_COLORS] || '#fff'})`
  }

  return (
    <section className="text-gray-600 body-font">
      <h1 className="font-medium leading-tight text-4xl px-5 pt-5 mt-0 mb-10">Pokemon Detail</h1>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="flex flex-wrap justify-center gap-6 bg-slate-300 mb-32">
          <div className="max-w-lg lg:max-w-screen-lg py-4 px-8 bg-white shadow-lg rounded-2xl mt-10 lg:my-10 w-full">
            <div className="flex justify-center lg:justify-end -mt-16 lg:-mt-20 mb-5">
              <img className="w-1/4 h-1/4 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                   src={pokemon?.sprites?.front_default} alt={`${pokemon?.name}'s front sprites`}
                   style={pokemonBG}/>
            </div>
            <div className="flex justify-between gap-6 items-stretch border-b border-gray-200 pb-6 mb-4">
              <h2 className="text-gray-800 text-3xl font-semibold">{toTitleCase(pokemon?.name)}</h2>
              <div className="flex justify-start gap-1 items-end">
                <Types types={pokemon?.types}/>
                <button onClick={onHandleCatch} disabled={isCatching}
                  className="bg-gradient-to-br from-pink-300 to-red-700 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg text-white">
                  Catch!&nbsp;
                  {isCatching && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin inline" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-6 mb-4">
              <Stats stats={pokemon?.stats}/>
            </div>
            <div className="px-2 py-2 text-gray-800">
              <h3 className="text-xl font-bold mb-5">Moves:</h3>
              <Moves moves={pokemon?.moves}/>
            </div>
            <div className="flex justify-center lg:justify-start mt-5 -mb-16 lg:-mb-20">
              <img className="w-1/4 h-1/4 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                   src={pokemon?.sprites?.back_default} alt={`${pokemon?.name}'s back sprites`}
                   style={pokemonBG}/>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PokemonDetail;
