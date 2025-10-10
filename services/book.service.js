import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
const BOOK_SEARCHES = 'searchDB'


_createBooks()

export const BookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook,
    getEmptyReview,
    onSaveReview,
    deleteReview,
    getNextPrevBookId,
    getBookFromGoogle,
    getFilterFromSearchParams
}

function getEmptyBook(
    title = '',
    listPrice = { amount: '', currencyCode: 'EUR', isOnSale: false },
    thumbnail = '/BooksImages/4.jpg',
    authors = ['david', 'sarah'],
    publishedDate = '2024',
    description = 'book description here ...',
    pageCount = 100,
    categories = ['horror', 'drama', 'romance'],
    language = 'en'
) {
    if (typeof listPrice !== 'object' || listPrice === null) {
        listPrice = { amount: '', currencyCode: 'EUR', isOnSale: false }
    }
    return { title, listPrice, thumbnail , authors, publishedDate, description, pageCount, categories, language }
} 

function getEmptyReview(){
    let id = utilService.makeId()
    let fullName = '',
    rating = 1,
    date = new Date().toISOString().slice(0, 10)
    return { fullName, rating , date , id }
}
function getNextPrevBookId(bookId) {
    return query()
        .then(books => {
            const bookIdx = books.findIndex(book => book.id === bookId)
            const prevBook = books[bookIdx - 1] || books[books.length - 1]
            const nextBook = books[bookIdx + 1] || books[0]
            return get(bookId).then(book => {
                book.prevBook = prevBook
                book.nextBook = nextBook
                return book
            })
        })
}


function onSaveReview(bookId,review){
    console.log('bookId:', bookId)
    return get(bookId)
    .then(book => {
        if(!book.reviews) book.reviews = []
        book.reviews.push(review)
        return save(book)
    })
}
function deleteReview(bookId, reviewId){
    return get(bookId)
    .then(book => {
        if(!book.reviews) book.reviews = []
        const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
        if(reviewIdx !== -1) {
            book.reviews.splice(reviewIdx, 1)
            return save(book)
        }   
        return Promise.reject('Review not found')
    })
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.listPrice) {
                 books = books.filter(book => book.listPrice.amount >= filterBy.listPrice)
            }
            if (filterBy.pageCount) {
                 books = books.filter(book => book.pageCount >= filterBy.pageCount)
            }
            if (filterBy.isOnSale) {
                 books = books.filter(book => book.listPrice.isOnSale === true)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        book.id = utilService.makeId() 
        return storageService.post(BOOK_KEY, book)
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [utilService.makeLorem(1)],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `BooksImages/${i+1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function getDefaultFilter() {
    return { title: '', listPrice: '' }
}

function getBookFromGoogle(book) {
    let googleApiBook = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${book}`
    console.log(googleApiBook)
    return fetch(googleApiBook)
        .then(res => res.json())
        .then(data => {
            return data.items.map(item => _createBookFromGoogle(item))
        })
        .catch(err => {
            console.log('err:', err)
            return Promise.reject('Cannot load books from google')
        })  
}
function _createBookFromGoogle(book) {
    const volumeInfo = book.volumeInfo || {}
    const saleInfo = book.saleInfo || {}

    const title = volumeInfo.title || ''
    const authors = volumeInfo.authors || ['No authors']
    const publishedDate = volumeInfo.publishedDate || ''
    const description = volumeInfo.description || 'No description'
    const pageCount = volumeInfo.pageCount || 0
    const categories = volumeInfo.categories || ['No categories']
    const thumbnail = (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) || ''
    const language = volumeInfo.language || ''

    const listPrice = (saleInfo.saleability === 'FOR_SALE' && saleInfo.listPrice)
        ? {
            amount: saleInfo.listPrice.amount,
            currencyCode: saleInfo.listPrice.currencyCode,
            isOnSale: !!saleInfo.isOnSale
        }
        : {
            amount: 0,
            currencyCode: 'N/A',
            isOnSale: false
        }

    return {
        title,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice
    }
}
function getFilterFromSearchParams(searchParams) {
    const title = searchParams.get('title') || ''
    const listPrice = searchParams.get('listPrice') || ''
    const pageCount = searchParams.get('pageCount') || ''
    return {
        title,
        listPrice,
        pageCount
    }
}