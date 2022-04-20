import React from 'react';
import { TYPE_COLORS } from '../common/constants';
import { Type } from '../common/model/response';

const Types = (props: {types?: Type[]}) => {
  return (
    <>
      {props?.types?.map((type) => (
        <div key={type?.type?.name} style={{backgroundColor: TYPE_COLORS[type?.type?.name as keyof typeof TYPE_COLORS]}}
             className={`p-1 mr-2 text-xs leading-3 text-black rounded-full w-6 h-6 `}>
          <img className="w-full h-full" src={require('../assets/type-icons/' + type?.type?.name + '.svg')} alt={'Pokemon ' + type?.type?.name + ' icon'}/>
        </div>
      ))}
    </>
  );
};

export default Types;
