import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import movieAPI from '../../services/movieAPI';
import OverView from './OverView/OverView';
import ShowTime from './ShowTime/ShowTime';
import styles from './movie.module.scss';
import Loading from '../../components/Loading';

const Movie = () => {
  const { movieId } = useParams()

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    ( async () => {
      try {
        const data = await movieAPI.getMovieDetail(movieId);
        setMovie(data)
      } catch (error) {
        console.log(error)
      }
    })();
  },[movieId]);

  if(!movie){
    return <Loading />
  }

  return (
    <div className={styles.wrapMovie}>
      <OverView movie={movie} />

      <ShowTime movieID={movieId}  />
    </div>
  );
}

export default Movie;