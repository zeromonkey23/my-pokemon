import React from 'react';
import { Move } from '../common/model/response';

const Moves = (props: { moves?: Move[] }) => {
  return (
    <div tabIndex={0} className="focus:outline-none flex-wrap flex justify-between">
      {props?.moves?.map((move) => (
        <div key={move?.move?.name}
          className="py-2 px-4 mb-5 m-auto text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">{move?.move?.name}</div>
      ))}
    </div>
  );
};

export default Moves;
