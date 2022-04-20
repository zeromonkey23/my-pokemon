import React from 'react';
import { Stat } from '../common/model/response';

const Stats = (props: { stats?: Stat[] }) => {
  return (
    <>
      {props?.stats?.map((stat, i) => (
        <span tabIndex={0} key={stat?.stat?.name}
          className={'focus:outline-none text-sm leading-normal pt-2 text-gray-500' + (i % 2 === 1 ? ' text-right' : '')}>
            {i % 2 === 0 &&
                <span className="text-sm">{stat?.stat?.name?.toUpperCase()} </span>
            } <b className="font-bold text-xl">{stat?.base_stat}</b>
          {i % 2 === 1 &&
            <span className="text-sm"> {stat?.stat?.name?.toUpperCase()}</span>
          }
        </span>
      ))}
    </>
  );
};

export default Stats;
