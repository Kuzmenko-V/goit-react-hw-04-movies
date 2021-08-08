import Searchbar from '../Searchbar';
// import MoviesList from './MoviesList';
import './MoviesPage.css';
import { useState, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MoviesList = lazy(() => import('./MoviesList.js'));

export default function MoviesPage() {
    const [searchText, setSearchText] = useState('');
    const { url } = useRouteMatch();
    
    return (
        <div>
            <Searchbar onSubmit={setSearchText} />
            <Suspense fallback={<Loader
                     type="ThreeDots"
                     color="#3f51b5"
                     height={100}
                     width={100}
                    />}>
             <Route path={`${url}`}>
               <MoviesList searchText={searchText}/>   
             </Route>
            </Suspense>
        </div>
    );
};