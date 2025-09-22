export function BookPreview({ book }) {

    const { title, listPrice , thumbnail} = book
    return (
        <article className="book-preview">
            <h2 className="book-title">{title}</h2>
            <h4 className="book-price">
                price: {listPrice.amount} {listPrice.currencyCode}
            </h4>
            <img className="book-image" src={thumbnail} alt="Book Image" />        
        </article>
    )
}