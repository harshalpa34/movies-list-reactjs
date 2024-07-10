import { ListCheck, ListPlus, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  addorRemoveToWatchList,
  isMovieExistsInWatchList,
} from "../../lib/api";

const MovieCard = ({ movie }) => {
  const [watchListed, setWatchListed] = useState(false);
  useEffect(() => {
    if (isMovieExistsInWatchList(movie)) {
      setWatchListed(true);
    }
  }, []);
  
  return (
    <div className="movie-card">
      <div className="img-wrapper">
        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} />
        <div
          className="watchlist-icon"
          onClick={() => {
            addorRemoveToWatchList(movie);
            setWatchListed((prev) => !prev);
          }}
        >
          {watchListed ? <ListCheck /> : <ListPlus />}
        </div>
      </div>
      <div className="footer">
        <h3 className="title">{movie?.title}</h3>
        <p className="release-date">{movie?.release_date}</p>
        <p className="rating">
          <Star /> <span>{movie?.vote_average?.toFixed(1)}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
