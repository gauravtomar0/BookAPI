const books = [
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2, 3],
    language: "en",
    pubDate: "2021-01-01",
    numOfPages: 225,
    category: ["fiction", "programming", "tech", "web dev", "drama"],
    publication: 1,
  },
  {
    ISBN: "12345TWO",
    title: "Getting started with MERN",
    authors: [4, 5],
    language: "en",
    pubDate: "2021-01-01",
    numOfPages: 225,
    category: ["fiction", "programming", "tech", "web dev", "adventure"],
    publication: 1,
  },
  {
    ISBN: "12345THREE",
    title: "Getting started with MERN",
    authors: [6, 7, 8],
    language: "en",
    pubDate: "2021-01-01",
    numOfPages: 225,
    category: ["fiction", "programming", "tech", "web dev", "horror"],
    publication: 1,
  },
];

const authors = [
  {
    id: 1,
    name: "gaurav",
    books: ["12345ONE"],
  },
  {
    id: 2,
    name: "abhi",
    books: ["12345TWO"],
  },
  {
    id: 3,
    name: "sakshi",
    books: ["12345THREE"],
  },
];

const publication = [
  {
    id: 1,
    name: "chakra",
    books: ["12345ONE"],
  },
  {
    id: 2,
    name: "chakra",
    books: ["12345TWO"],
  },
  {
    id: 3,
    name: "chakra",
    books: ["12345THREE"],
  },
];

module.exports = { books, authors, publication };
