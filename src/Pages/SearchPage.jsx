import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/cards/MovieCard";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    let timeout;
    setLoading(true);
    const getMovies = async () => {
      let api_url = `https://api.themoviedb.org/3/search/movie?api_key=f92beef3e63edeef06f7e9d8051bae7a&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100`;

      api_url += `&query=${searchQuery}`;
      const { data } = await axios.get(api_url);
      setMovies(data.results);
      timeout = setTimeout(() => {
        setLoading(false);
      }, [1000]);
    };
    getMovies();

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  console.log(movies);

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

export default SearchPage;
