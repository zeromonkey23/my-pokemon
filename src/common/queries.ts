import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
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
  `;

export const GET_POKEMON_LIST = gql`
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
