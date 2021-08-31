# Awesome Project Build with TypeORM

Steps to run this project:

1. For run DB (postgres) and pgAdmin4 run `docker-compose up` command from root folder of this project (/test).
2. Run `npm i` command
3. Run `npm start` command
4. After this you can open `localhost:9000/graphql` in your browser and try out prepared Querys and Mutations bellow.


Querys:

    query Login{
        login(email: "admin@admin.com", password: "MySuperStrongPass"){
            id
        }
    }

    query GetBookByAuthorOrTitle{
        getBookByAuthorOrTitle(author: "Deborah Levy"){
            id
            title
            author
            year
            genres
            rating
        }
    }

    query GetSatae{
        getState(title: "Brooklyn"){
            id
            title
            author
            year
            genres
            rating
            states {
            id
            state
            created_at
            updated_at
            }
        }
    }

Mutations: 

    mutation SaveUser{
        saveUser(email: "admin@admin.com", password: "test"){
            email
            password
        }
    }

    mutation SaveBook{
        saveBook(userId: 1, bookState: "available", title: "Brooklyn", author: "Colm Tóibín", year: 2009, genres: "Fiction", rating: 10){
            id
            title
            author
            year
            genres
            rating
        }
    }

    mutation DleteBook{
        deleteBook(userId: 1, id: 1){
            id
        }
    }

    mutation UpdateBook{
        updateBook(userId: 1, bookState: "unavailable", id: 2, title: "The Cost of Living", 
                   author: "Deborah Levy", year: 2018, genres: "Autobiography", rating: 8){
            id
            title
            author
            year
            genres
            rating
        }
    }
