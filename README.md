# Book-Donation

This is a simple web app whose UI has been designed in HTML. It has been hosted on the heroku cloud platform. The entire flow of the system can be understood by the following steps:
1) The UI has two fields Book Name and Author Name and it has a donate button. On entering the fields and clicking on the donate button, internally the JavaScript code is invoked. The UI can be checked through the following link below:
 [Book-Donation-Link](https://shubharthi.herokuapp.com).
2) The JavaScript file named as *testBackend.js* is making a simple HTTP request to the Hasura GraphQL api which is hosted on the Hasura Console which is deployed on the Heroku Cloud.
3) The GraphQL api makes the necessary changes to the backend database(here PostgreSQL) and responds back with an update.

**BackEnd Details** 

1) Book , Author table designed.
   - Book table is linked to the Author table via a foreign key.
  
2) Each of the table has a unique id(e.g. bookID, authorID). This ID is generated using a hash of the input string which generates a unique number for each and every entry.
   - Corner Case 1: Two donors might donate the same book, in that case the book count increases by 1 rather than having a separate entry.
   - Corner Case 2: Two entries can have the same book name but different authors, in that case the entries are treated as a separate entries in the table.
  
3) Primary operations done through Hasura GraphQL API are as follows:
   * Query  (Check if entry already exists)
   * Insert ( A new field)
   * Update ( Incrementing the count of existing entry)

