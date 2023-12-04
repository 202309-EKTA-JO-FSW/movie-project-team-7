import React, { useEffect, useState } from "react"
import styles from "../styles/navbar.module.css"
import Link from "next/link"

const Navbar = ({ genres }) => {
  const [search, setSearch] = useState("")
  const movieFilters = ["popular", "top_rated", "upcoming", "now_playing"]
  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>Team 7</div>

      {/* Genres Dropdown */}
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Genres</button>
        {/* <div className={styles.dropdownContent}>
          {genres.map((genre) => (
            <Link
              href={{
                pathname: "../pages/movies",
                query: { page: 1, genre: [genre.name] },
              }}
            >
              {" "}
              {genre.name}
            </Link>
          ))}
        </div> */}
      </div>

      {/* Movies Dropdown */}
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Movies</button>
        {/* <div className={styles.dropdownContent}>
          {movieFilters.map((movie, index) => (
            <Link
              key={index}
              href={{
                pathname: "../pages/movies",
                query: { page: 1, filter: [movie] },
              }}
            >
              {movie}
            </Link>
          ))}
        </div> */}
      </div>

      <Link
        href={{
          pathname: "/actors",
          query: { page: 1 },
        }}
      >
        <div>Actors</div>
      </Link>

      {/* Search Box */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search for movies or actors"
          className={styles.searchInput}
          value={search}
          onChange={setSearch}
        />
        <Link
          href={{
            pathname: "/search",
            query: { serchValue: [search] },
          }}
        >
          <div className={styles.searchButton}>Search</div>
        </Link>
      </div>
    </nav>
  )
}
export default Navbar

export async function getServerSideProps() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
    },
  }
  const genresResponse = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options,
  )
  const genresData = await genresResponse.json()
  const genres = [...genresData.genres]
  return { props: { genres } }
}
