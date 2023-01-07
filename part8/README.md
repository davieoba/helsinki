# Readme documentation for the apollo section in the helsinki project

Run `nodemon index.js` to start the apollo server

sometimes I can run into an error trying to install packages, if it happens uninstall graphql `npm uninstall graphql` and then install the package `npm install <package>`, afterwards re-install graphql `npm install graphql`

mutation {
addBook(
title: "NoSQL Distilled",
author: "Martin Fowler",
published: 2012,
genres: ["database", "nosql"]
) {
title,
author
}
}
