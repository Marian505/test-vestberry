exports.typeDefs = [`
    type User {
        id: Int
        email: String
        password: String
    }

    type Book {
        id: Int
        title: String
        author: String
        year: Int
        genres: String
        rating: Int
        states: [State]
    }

    type State {
        id: Int
        state: String
        created_at: String 
        updated_at: String
    }

    type Query {
        login(email: String, password: String) : User
        getBookByAuthorOrTitle(author: String, title: String) : Book
        getState(title: String) : Book
    }
        
    type Mutation {
        saveUser(email: String, password: String) : User
        saveBook(userId: Int, bookState: String, id: Int, title: String, author: String, year: Int, genres: String, rating: Int) : Book
        deleteBook(userId: Int, id: Int) : Book
        updateBook(userId: Int, bookState: String, id: Int, title: String, author: String, year: Int, genres: String, rating: Int) : Book
    }
`];
