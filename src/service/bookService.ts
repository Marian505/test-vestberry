import { getRepository } from "typeorm";
import { Book } from "../entity/Book";
import { State } from "../entity/State";
import { User } from "../entity/User";

export async function getBookByAuthorOrTitle(author: string, title: string) {    
    return await getRepository(Book) 
        .createQueryBuilder("book")
        .where("book.author = :author OR book.title = :title", { author: author, title: title })
        .getOne();
}

export async function saveBook(userId: number, bookState: string, title: string, author: string, year: number, genres: string, rating: number) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({id: userId});

    if (user.id != userId){
        // TODO: add error handling
        console.log("user with id does not exist");
        return new Book();
    }     

    const book = new Book();
    book.title = title;
    book.author = author;
    book.year = year;
    book.genres = genres;
    book.rating = rating;
    await book.save();

    const state = new State();
    state.book = book;
    state.state = bookState;
    await state.save();

    return book;
}

export async function deleteBook(userId: number, id: number) {   
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({id: userId});
    if (user.id != userId){
        // TODO: add error handling
        console.log("user with id does not exist");
        return new Book();
    }    

    return await getRepository(Book)
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id: id })
        .execute();
}

export async function updateBook(userId: number, bookState: string, id: number, title: string, author: string, year: number, genres: string, rating: number) {  
    const userRepository = getRepository(User);
    const bookRepository = getRepository(Book);
    const user = await userRepository.findOne({id: userId});    
    if (user.id != userId){
        // TODO: add error handling
        console.log("user with id does not exist");
        return new Book();
    }    

    await bookRepository.createQueryBuilder()
        .update()
        .set({ 
            title: title,
            author: author,
            year: year,
            genres: genres,
            rating: rating
        })
        .where("id = :id", { id: id })
        .execute();
    
    const book = await bookRepository.findOne({id: id});
    const state = new State();
    state.book = book;
    state.state = bookState;
    await state.save();

    return book;
}

export async function getState(title: string) {           
    return await getRepository(Book)
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.states", "state")
        .where("book.title = :title", { title: title })
        .getOne();
}