import API from '../../APIservice';
import './MoviesPage.css';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch , useHistory, useLocation} from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function MoviesList({searchText}) {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const { url } = useRouteMatch();
    const [serchMovie, setSerchMovie] = useState(null);
    const history = useHistory();
    const location = useLocation();
    
    const query = new URLSearchParams(location.search).get('query') ?? null;
    useEffect(() => {
       
        if ((searchText === '')||(searchText === query)) { return; }

        history.push({...location, search: `query=${searchText}`});
    }, [history, location, query, searchText]);
    useEffect(() => {
        if (query === null) { return;}
            setStatus('pending');
                
            API(`/search/movie`, 1, query)
                .then(rez => {
                    if (rez.results.length) {
                        setSerchMovie(rez.results);
                        setStatus('resolved');
                    }
                    else {
                        setError(`Простите у нас ничего нет по запросу "${query}"`);
                        setStatus('rejected');
                    }
                })
                .catch(error => {
                    setError(error.message);
                    setStatus('rejected');
                });
        
    },[query]);
    
    
    if (status === "idle") {
        return <div></div>;
        }
    if (status === "pending") {
            return (
                <div>
                    <Loader
                     type="ThreeDots"
                     color="#3f51b5"
                     height={100}
                     width={100}
                    />
                </div>
            );
        }
    if (status === "rejected") {
            return (<div >
                      <h1>{error}</h1>;    
                    </div>);
        }
        
    if (status === "resolved") {
        return (
            <div>
                <ul>
                    {serchMovie && serchMovie.map(e => e.title ? (
                        <li key={e.id}>
                            <Link to={`${url}/${e.id}`}>{e.title}</Link>
                        </li>) : (
                        <li key={e.id}>
                            <Link to={`${url}/${e.id}`}>{e.name}</Link>
                        </li>)
                    )}
                </ul>
            </div>
        );
    }
};