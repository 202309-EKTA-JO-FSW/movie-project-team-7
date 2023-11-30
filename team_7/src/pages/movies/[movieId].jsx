import React from "react"
import Link from "next/link"

const MoviePage = ({ movieInfo, directors, mainActors, relatedMovies }) => {
  const {
    title,
    release_date: releaseDate,
    runtime,
    original_language: language,
    vote_average: rating,
    vote_count: votings,
    poster_path: poster,
    overview,
  } = movieInfo

  const actorsItems = mainActors.map((actor, index) => (
    <div key={index}>
      <img
        width={"100px"}
        src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
      />
      <p>{actor.name}</p>
    </div>
  ))

  const relatedMoviesItems = relatedMovies.map((movie, index) => (
    <div key={index}>
      <Link href={`/movies/${movie.id}`}>
        <img
          width={"100px"}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      </Link>
      <p>{movie.title}</p>
    </div>
  ))

  return (
    <div>
      {!!poster && (
        <img
          width={"300px"}
          src={`https://image.tmdb.org/t/p/original/${poster}`}
        />
      )}
      <p>{title}</p>
      <p>released on: {releaseDate}</p>
      <p>duration: {runtime}</p>
      <p>language: {language}</p>
      <p>rating: {rating}</p>
      <p>votings: {votings}</p>
      <p>
        Directed by: {directors.map((director) => director.name).join(", ")}
      </p>
      <p>overview: {overview}</p>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {actorsItems}
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {relatedMoviesItems}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const movieId = context.query.movieId
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ", // Replace with your actual API key
    },
  }

  const movieInfoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options,
  )
  const movieInfo = await movieInfoResponse.json()

  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options,
  )
  const creditsData = await creditsResponse.json()
  const directors = creditsData.crew.filter(
    (person) => person.job === "Director",
  )
  const mainActors = creditsData.cast.slice(0, 5)

  const similarMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    options,
  )
  const similarMoviesData = await similarMoviesResponse.json()
  const relatedMovies = similarMoviesData.results.slice(0, 5)

  return {
    props: {
      movieInfo,
      directors,
      mainActors,
      relatedMovies,
    },
  }
}

export default MoviePage
