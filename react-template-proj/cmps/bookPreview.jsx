export function BookPreview({ book }) {

    const { title, listPrice } = book
    return (
        <article className="book-preview">
            <h2>title: {title}</h2>
            <h4>price: {listPrice}</h4>
            {/* <img src={`../assets/img/${vendor}.png`} alt="Car Image" /> */}
        </article>
    )
}