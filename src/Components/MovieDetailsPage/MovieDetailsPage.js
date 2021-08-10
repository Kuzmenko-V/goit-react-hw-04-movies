import API from '../../APIservice';
import './MovieDetailsPage.css';
import { Switch, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense  } from 'react';
import { Link, useRouteMatch ,useHistory, useLocation} from "react-router-dom";
import { useParams } from 'react-router-dom';
import noIMG from '../No-Image-Placeholder.svg';
// import Cast from '../Cast';
// import Reviews from '../Reviews';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Cast = lazy(() => import('../Cast/Cast.js'));
const Reviews = lazy(() => import('../Reviews/Reviews.js'));
export default function MovieDetailsPage() {
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const { url } = useRouteMatch();
    useEffect(() => {
        
        API(`/movie/${movieId}`)
            .then(rez => {
                setMovie(rez);
            })
    
    }, [movieId]);
    const onGoBack = () => {
        history.push(location?.state?.from ?? '/')
     };
    return (
        <div className="Contein">
            <button type="button" onClick={onGoBack}>Назад</button>
            {movie && (
                movie.id ? (<div className="MovieDetailsPage">
                    <div className="MoviePoster">
                        {movie.poster_path ? <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt="" />: <img  src={noIMG} alt="" />} 
                    </div>
                    <div className="MovieInfo">
                        <h2>{movie.title || movie.name}</h2>
                        <p>Оценка зрителей: {movie.vote_average}</p>
                        <h3>Описание</h3>
                        <p>{movie.overview}</p>
                        <h4>Жанры</h4>
                        {movie.genres.map(e => <span key={e.id}> {e.name}</span>)}
                    </div>
                    <div>
                        <h2>Дополнительная информация</h2>
                        <ul>
                            <li><Link to={`${url}/cast`}>В ролях</Link></li>
                            <li><Link to={`${url}/reviews`}>Отзывы</Link></li>
                        </ul>
                    </div>
                    <Suspense fallback={<Loader
                     type="ThreeDots"
                     color="#3f51b5"
                     height={100}
                     width={100}
                    />}>
                      <Switch>
                        <Route path='/movies/:movieId/cast'>
                          <Cast/>
                        </Route>

                        <Route path='/movies/:movieId/reviews'>
                          <Reviews/>
                        </Route>
                      </Switch>
                    </Suspense>    
                </div>
                ) : (<div className="MovieDetailsPage">
                        <h1>{movie.status_message}</h1>
                    </div>)
            )}
        </div>
    );
};