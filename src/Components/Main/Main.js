import API from '../../APIservice';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Main() {
  const [status,setStatus] = useState('idle');
  const [trendMovie, setTrendMovie] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setStatus('pending');    
    API('/trending/all/day')
      .then(rez => {
        if (rez.results.length) {
          setTrendMovie(rez.results);
          setStatus('resolved');
        }
        else {
                        setError(`Извините сервер временно недоступен :(`);
                        setStatus('rejected');
                    }
      })
  }, []);
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
            return (<div>
                      <h1>{error}</h1>;    
                    </div>);
  }
  if (status === "resolved") {
    return (
      <div>
        <h1>Популярные</h1>
        <ul>
          {trendMovie.map(e => e.title ? (
            <li key={e.id}>
              <Link to={`movies/${e.id}`}>{e.title}</Link>
            </li>) : (
            <li key={e.id}>
              <Link to={`movies/${e.id}`}>{e.name}</Link>
            </li>)
          )}
        </ul>
      </div>
    );
  }
};