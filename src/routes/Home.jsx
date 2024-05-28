// Home.jsx
import React, { useState, useEffect } from 'react';
import Movie from '../component/Movie';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year`
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id} // id를 그대로 전달
              coverImage={movie.medium_cover_image}
              title={movie.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
