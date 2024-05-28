import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieDetails(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <>
      {movieDetails ? (
        <div>
          <h2>{movieDetails.title}</h2>
          <p>{movieDetails.summary}</p>
          <ul>
            {movieDetails.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          <p>{movieDetails.url}</p>
          <img src={movieDetails.large_cover_image} alt="title" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Detail;
