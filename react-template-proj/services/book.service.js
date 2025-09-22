import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
// var gFilterBy = { txt: '', minSpeed: 0 }

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    // getEmptyCar,
    // getNextCarId,
    // getFilterBy,
    // setFilterBy
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     cars = cars.filter(car => regex.test(car.vendor))
            // }
            // if (gFilterBy.minSpeed) {
            //     cars = cars.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
            // }
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
        return storageService.post(BOOK_KEY, book)
    }
}


// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }

// function getNextCarId(carId) {
//     return storageService.query(CAR_KEY)
//         .then(cars => {
//             let nextCarIdx = cars.findIndex(car => car.id === carId) + 1
//             if (nextCarIdx === cars.length) nextCarIdx = 0
//             return cars[nextCarIdx].id
//         })
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('back to the future', 100),
            _createBook('dust in the wind', 240),
            _createBook('pain', 120),
            _createBook('success', 90)
        ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}
function _createBook(title, listPrice = 250) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}
function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}