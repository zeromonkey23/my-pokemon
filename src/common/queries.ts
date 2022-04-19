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
  `
