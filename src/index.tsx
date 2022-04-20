import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const MyPokemon = React.lazy(() => import('./pages/MyPokemon'));
const PokemonDetail = React.lazy(() => import('./pages/PokemonDetail'));
const PokemonList = React.lazy(() => import('./pages/PokemonList'));

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Suspense>
          <Routes>
            <Route path="/" element={<Navigate to="/pokemon-list" replace/>}/>
            <Route path="/pokemon-list" element={<PokemonList/>}/>
            <Route path="/pokemon-list/:name" element={<PokemonDetail/>}/>
            <Route path="/my-pokemon" element={<MyPokemon/>}/>
          </Routes>
        </React.Suspense>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
