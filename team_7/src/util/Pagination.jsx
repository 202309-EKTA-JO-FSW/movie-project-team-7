import React from "react"
import Link from "next/link"

const Pagination = ({
  filter = null,
  searchValue = null,
  currentPage,
  numberOfPages,
  destinationPage,
}) => {
  //calculate the minimum and maximum pages to show in the pagination
  const minPage = +currentPage - 2 < 1 ? 1 : +currentPage - 2
  const maxPage =
    +currentPage + 2 > numberOfPages ? numberOfPages : +currentPage + 2

  //fill an array with the pages to show in the pagination
  const pagesNumbers = []
  for (let i = minPage; i <= maxPage; i++) pagesNumbers.push(i)
  const pages = pagesNumbers.map((number) => {
    return (
      <div key={number} style={{ width: "20px" }}>
        <Link
          href={{
            pathname: `/${destinationPage}`,
            query: {
              page: number,
              filter: filter,
              searchValue: searchValue,
            },
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