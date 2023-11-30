import styles from "@/styles/Home.module.css"
import Link from "next/link"

export default function Home({ latestMovies }) {
  const movies = latestMovies.map((movie, index) => {
    return (
      <div
        key={index}
        style={{
          backgroundColor: "#999",
          width: "150px",
          margin: "10px auto",
          padding: "2px",
        }}
      >
        <li
          style={{
            margin: "10px",
          }}
        >
          <Link href={`./movies/${movie.id}`}>
            <img
              width={"100px"}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          </Link>
          <br />
          {movie.title}
        </li>
      </div>
    )
  })
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Link
          href={{
            pathname: "/movies",
            query: { page: 1, filter: "upcoming" },
          }}
        >
          top movies
        </Link>
      </div>
      Latest Movies
      <div style={{ margin: "30px auto" }}>
        <ul
          style={{
            margin: "10px",
            listStyle: "none",
            padding: "0",
            margin: "10px auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {"loading..." && movies}
        </ul>
      </div>
    </div>
  )
}

export async function getServerSideProps({}) {
  //fetch options
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
    },
  }

  //get the latest movies
  const resp = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options,
  )
  const data = await resp.json()
  const latestMovies = [...data.results]
  return {
    props: {
      latestMovies,
    },
  }
}
