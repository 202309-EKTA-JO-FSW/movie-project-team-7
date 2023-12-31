import styles from "@/styles/Home.module.css"
import Link from "next/link"
import Pagination from "@/util/Pagination"

export default function Home({
  latestMovies,
  currentPage,
  numberOfPages,
  //modifiers to make the page dynamic
  filter = null,
  genre = null,
  id = null,
}) {
  // create an array of movies cards
  const movies = latestMovies.map((movie, index) => {
    return (
      <div
      class="
      md:max-xl:flex
      min-w-[230px]
      mt-6 mb-6 mx-3
      rounded-lg 
      w-[230px]
      pt-6 pr-4 pb-2 pl-2 px-8 py-12
      transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
        key={index}
      >
        <Link
          href={`./movies/${movie.id}`}
        >
          <img
            class="rounded-lg 
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </Link>
        <br />
        <p
          class=" 
          text-lg 
          font-semibold
          max-w-[180px] mx-auto"
        >
          {movie.title}
        </p>
      </div>
    )
  })
  return (
    //page container
    <div className="
         text-center text-slate-100
         bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
      <span className="text-5xl pt-8  tracking-wider font-semibold ">
        {genre ||
         filter
          .split("_")
          .map((movie) => movie.at(0).toUpperCase() + movie.slice(1))
          .join(" ")}</span>
          {/* movie cards container */}
      <div class="flex flex-none flex-wrap flex-intial justify-center py-6">
       {movies}
      </div>
      
      <Pagination
        currentPage={currentPage}
        filter={filter}
        destinationPage={"movies"}
        genre={genre}
        id={id}
        numberOfPages={numberOfPages}
      />
    </div>
  )
}

export async function getServerSideProps({
  query: { filter = null, genre = null, page, id = null },
}) {
  const currentPage = page
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
    },
  }

  const filteredMoviesResponse = await fetch(
    !!filter
      ? `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${id}`,
    options,
  )
  const filteredMoviesData = await filteredMoviesResponse.json()
  const numberOfPages = filteredMoviesData.total_pages
  const latestMovies = [...filteredMoviesData.results]

  return {
    props: {
      latestMovies,
      filter,
      currentPage,
      numberOfPages,
      genre,
      id,
    },
  }
}
