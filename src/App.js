import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Main = lazy(() => import('./Components/Main/Main.js'));
const MovieDetailsPage = lazy(() => import('./Components/MovieDetailsPage/MovieDetailsPage.js'));
const MoviesPage = lazy(() => import('./Components/MoviesPage/MoviesPage.js'));

export default function App() {
  return (
    <div>
      <ToastContainer
           autoClose={3000}
           position="top-center"
          />
      <header>
        <Navigation/>
      </header>
      <main>
      <Suspense fallback={<Loader
                     type="ThreeDots"
                     color="#3f51b5"
                     height={100}
                     width={100}
                    />}>
        <Switch>
          <Route path='/' exact>
            <Main/>
          </Route>
          <Route path='/movies/:movieId'>
            <MovieDetailsPage/>
          </Route>
          <Route path='/movies'>
            <MoviesPage/>
          </Route>
          </Switch>
      </Suspense>
      </main>
    </div>
  );
}