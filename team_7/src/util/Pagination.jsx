import React from "react"
import Link from "next/link"

//TODO :change the number of pages as recieved from the api
const MAX_PAGES = 20

const Pagination = ({ filter, currentPage }) => {
  //calculate the minimum and maximum pages to show in the pagination
  const minPage = +currentPage - 2 < 1 ? 1 : +currentPage - 2
  console.log(minPage)
  const maxPage = +currentPage + 2 > MAX_PAGES ? MAX_PAGES : +currentPage + 2
  console.log(maxPage)
  //fill an array with the pages to show in the pagination
  const pagesNumbers = []
  for (let i = minPage; i <= maxPage; i++) pagesNumbers.push(i)
  console.log(pagesNumbers)
  const pages = pagesNumbers.map((number) => {
    return (
      <div key={number} style={{ width: "20px" }}>
        <Link
          href={{
            pathname: "/movies",
            query: { page: [number], filter: [filter] },
          }}
        >
          {number}
        </Link>
      </div>
    )
  })

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {pages}
    </div>
  )
}

export default Pagination
