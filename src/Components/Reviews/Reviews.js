import API from '../../APIservice';
import './Reviews.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function Reviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    // const [status, setStatus] = useState('idle');
    useEffect(() => {
        API(`/movie/${movieId}/reviews`)
            .then(rez => {
                setReviews(rez.results);
            })
    
    }, [movieId]);

    return (
        <ul className="reviewsItems">
            {reviews.length > 0 ? reviews.map(e => (
                <li key={e.id} className="reviewsItem">
                    <span>{e.author}</span>
                    <p>{e.content}</p>
                </li>)) : (<li>
                    <span>Пока что нет озывов</span>
                </li>)}
        </ul>
    );
};