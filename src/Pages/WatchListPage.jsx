import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/cards/MovieCard";
import { getWatchList } from "../lib/api";

const WatchListPage = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();
  useEffect(() => {
    const movies = getWatchList();
    setMovies(movies);
    const timeoout = setTimeout(() => {
      setLoading(false);
    }, [1500]);

    return () => clearTimeout(timeoout);
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

export default WatchListPage;
