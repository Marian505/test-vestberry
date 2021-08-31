const userService = require('../service/userService');
const bookService = require('../service/bookService');

exports.resolvers = {
    Query: {
        login: async (_, args) => {          
            return userService.login(args.email, args.password);
        },
        getBookByAuthorOrTitle: async (_, args) => {
            return bookService.getBookByAuthorOrTitle(args.author, args.title);
        },
        getState: async (_, args) => {
            return bookService.getState(args.title);
        }
    },
    Mutation: {
        saveUser: async (_, args) => {
            return userService.saveUser(args.email, args.password);
        },
        saveBook: async (_, args) => {
            return bookService.saveBook(args.userId, args.bookState, args.title, args.author, args.year, args.genres, args.rating);
        },
        deleteBook: async (_, args) => {
            return bookService.deleteBook(args.userId, args.id);
        },
        updateBook: async (_, args) => {
            return bookService.updateBook(args.userId, args.bookState ,args.id, args.title, args.author, args.year, args.genres, args.rating);
        }
    }
}
