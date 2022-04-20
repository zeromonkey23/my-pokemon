import React, { useEffect, useState } from 'react';
import { toTitleCase, TYPE_COLORS } from '../common/constants';
import { Pokemon, Type } from '../common/model/response';
import Stats from '../components/Stats';
import Types from '../components/Types';
import Swal from 'sweetalert2';

const MyPokemon = () => {
  const [myPokemonList, setMyPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const pokemonList = localStorage.getItem('myPokemonList');
    if (pokemonList) {
      setMyPokemonList(JSON.parse(pokemonList));
      console.log(myPokemonList);
    }
  }, []);

  const getPokemonBG = (types?: Type[]) => {
    return {
      background: `linear-gradient(
                   to bottom right, 
                   ${TYPE_COLORS[types![0]?.type?.name as keyof typeof TYPE_COLORS]}, 
                   ${TYPE_COLORS[types![1]?.type?.name as keyof typeof TYPE_COLORS] || '#fff'})`
    };
  }

  const onRelease = (pokemon: Pokemon): void => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, release it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newPokemonList = myPokemonList.filter(p => p.nickname !== pokemon.nickname);
        localStorage.setItem('myPokemonList', JSON.stringify(newPokemonList));
        setMyPokemonList(newPokemonList);
        Swal.fire(
          'Released!',
          'Your pokemon has been released.',
          'success'
        )
      }
    });
  }

  return (
    <section className="text-gray-600 body-font mb-24">
      <h1 className="font-medium leading-tight text-5xl px-5 pt-5 mt-0 mb-10">My Pokemon List</h1>
      { myPokemonList.map((pokemon, index) => (
        <div className="flex flex-wrap justify-center gap-6 bg-slate-300 mb-2" key={index}>
          <div className="max-w-lg lg:max-w-screen-lg py-4 px-8 bg-white shadow-lg rounded-2xl mt-10 lg:my-10 w-full">
            <div className="flex justify-between gap-6 items-stretch border-b border-gray-200 pb-6 mb-4">
              <h2 className="text-gray-800 text-3xl font-semibold">{pokemon?.nickname}
                <span className="text-sm text-gray-500"> ({toTitleCase(pokemon?.name)})</span></h2>
              <div className="flex justify-start gap-1 items-end">
                <Types types={pokemon?.types}/>
                <button onClick={() => onRelease(pokemon)}
                  className="bg-gradient-to-br from-cyan-100 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg text-white">
                  Release&nbsp;
                </button>
              </div>
            </div>
            <div style={getPokemonBG(pokemon?.types)} className="flex justify-between pb-6 mb-4 h-48 w-full rounded-2xl shadow">
              <img className="w-full h-full object-cover"
                   src={pokemon?.sprites?.front_default} alt={`${pokemon?.name}'s front sprites`}/>
              <img className="w-full h-full object-cover"
                   src={pokemon?.sprites?.back_default} alt={`${pokemon?.name}'s front sprites`}/>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-200 pb-6 mb-4">
              <Stats stats={pokemon?.stats}/>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyPokemon;
