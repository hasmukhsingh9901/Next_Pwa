const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

export interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  imdbRating: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Plot: string;
}

export const fetchMovies = async ({
  query = "Avengers",
  genre,
  year,
  duration,
  rating,
}: {
  query?: string;
  genre?: string;
  year?: string | null;
  duration?: string | null;
  rating?: string;
}): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams({
      s: query,
      apikey: API_KEY!,
      ...(genre && { genre }),
      ...(year && { y: year }),
      ...(duration && { runtime: duration }),
      ...(rating && { rating }),
    });

    const response = await fetch(`http://www.omdbapi.com/?${params}`);
    const data = await response.json();

    if (!data.Search) return [];

    return await Promise.all(
      data.Search.slice(0, 5).map(async (movie: { imdbID: string }) => {
        const res = await fetch(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
        );
        return res.json();
      })
    );
  } catch (error: any) {
    console.error("Failed to fetch movies", error.message);
    return [];
  }
};
