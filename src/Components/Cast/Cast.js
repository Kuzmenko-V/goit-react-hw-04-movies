import API from '../../APIservice';
import './Cast.css';
import { useState, useEffect } from 'react';
import noIMG from '../No-Image-Placeholder.svg';
// import { Link, useRouteMatch } from "react-router-dom";
import { useParams } from 'react-router-dom';
export default function Cast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState(null);
    // const { url } = useRouteMatch();
    useEffect(() => {
        API(`/movie/${movieId}/credits`)
            .then(rez => {
                setCast(rez.cast);
            })
    
    }, [movieId]);
   
    return (
        <ul className="castItems">
            {cast && cast.map(e => (
                <li key={e.cast_id} className="castItem">
                   {e.profile_path ? <img className="castItemNoImg" src={"https://image.tmdb.org/t/p/w500/" + e.profile_path} alt="" />: <img className="castItemNoImg" src={noIMG} alt="" />} 
                    <span>{e.name}</span>
                    <span>В роли: {e.character}</span>
                </li>))}
        </ul>
    );
};