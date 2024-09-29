import React from "react";
import { ThumbsUp, ThumbsDown, Play } from "lucide-react";

interface MovieCardProps {
  movie: {
    Poster: string;
    Title: string;
    Year: string;
    Runtime: string;
    Genre: string;
    imdbRating: string;
    Rating: Array<{
      Source: string;
      Value: string;
    }>;
    Plot: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { Poster, Title, Year, Runtime, Genre, imdbRating, Rating, Plot } =
    movie;

  const rottenTomatoesRating = Rating?.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  )?.Value;

  return (
    <div className="flex flex-col sm:flex-row bg-foreground p-4 rounded-lg">
      <img
        src={Poster}
        alt={Title}
        className="w-full sm:w-48 rounded-sm object-cover"
      />

      <div className="sm:ml-4 mt-4 sm:mt-0 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold">{Title}</h2>
          <p className="text-sm text-gray-400">
            {Year}•{Runtime}•{Genre}
          </p>

          <div className="flex items-center mt-2 space-x-2">
            <div className="fkex items-center">
              <img
                src="/rotten-tomatoes-logo.svg"
                alt="Rotten Tomatoes"
                className="h-4"
              />
              <span className="ml-1 text-sm">
                {rottenTomatoesRating}
              </span>
            </div>
            <div className="flex items-center">
              <img src="/imdb-logo.svg" alt="IMdb" className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
