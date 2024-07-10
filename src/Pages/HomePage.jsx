import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/cards/MovieCard";

const api_url = `https://api.themoviedb.org/3/discover/movie?api_key=f92beef3e63edeef06f7e9d8051bae7a&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100`;
const HomePage = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeout;
    const getMovies = async () => {
      const { data } = await axios.get(api_url);
      setMovies(data.results);
      timeout = setTimeout(() => {
        setLoading(false);
      }, [1000]);
    };

    getMovies();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="movies-list">
      {!loading ? (
        movies?.map((movie) => <MovieCard movie={movie} key={movie?.id} />)
      ) : (
        <p className="message">Loading...</p>
      )}

      {!loading && movies?.length === 0 && (
        <p className="message">No data Found</p>
      )}
    </div>
  );
};

export default HomePage;
