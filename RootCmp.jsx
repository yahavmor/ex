const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM
const { useState } = React

import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"


export function RootCmp() {

    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/about" element={<About />}/>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />}>
                             <Route path="review" element={<AddReview />} />                        
                        </Route>
                        <Route path="/book/edit" element={<BookEdit />} >
                            <Route path="add" element={<BookAdd />} />
                            <Route path=":bookId" element={<BookEdit />} />
                        </Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <UserMsg />
            </section>
        </Router>
    )
} 