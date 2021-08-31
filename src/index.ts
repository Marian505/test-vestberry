const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
import "reflect-metadata";
import { createConnection } from 'typeorm';
import { makeExecutableSchema } from 'graphql-tools';
import { User } from './entity/User';
import { Book } from './entity/Book';
import { State } from './entity/State';
const typeDefs = require('./graphql/types').typeDefs;
const resolvers = require('./graphql/resolvers').resolvers;

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.email = "admin@admin.com";
    user.password = "MySuperStrongPass";
    await user.save();
    
    const user2 = new User();
    user2.email = "admin2@admin.com";
    user2.password = "MySuperWeakPass";
    await user2.save();

    console.log("Inserting a new book into the database...");
    const book = new Book();
    book.author = "Stieg Larsson";
    book.genres = "Drama";
    book.rating = 6;
    book.title = "The Girl With the Dragon Tattoo";
    book.year = 2005;
    await book.save();
    console.log("Saved a new book with id: " + book.id);

    const state = new State();
    state.book = book;
    state.state = "available";
    await state.save();

    console.log("Inserting a new book into the database...");
    const book2 = new Book();
    book2.author = "Deborah Levy";
    book2.genres = "Autobiography";
    book2.rating = 8;
    book2.title = "The Cost of Living";
    book2.year = 2018;
    await book2.save();
    console.log("Saved a new book with id: " + book2.id);

    const state2 = new State();
    state2.book = book2;
    state2.state = "available";
    await state2.save();


    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Loading boks from the database...");
    const books = await connection.manager.find(Book);
    console.log("Loaded books: ", books);

    console.log("Loading boks from the database...");
    const states = await connection.manager.find(State);
    console.log("Loaded states: ", states);
     

}).catch(error => console.log(error));

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: makeExecutableSchema({typeDefs, resolvers}),
    graphiql: true,
}));
app.listen(9000);
console.log('server is running');