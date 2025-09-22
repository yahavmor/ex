import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ carId, onBack }) {

    const [car, setCar] = useState(null)

    useEffect(() => {
        loadCar()
    }, [])

    function loadCar() {
        carService.get(carId)
            .then(car => setCar(car))
            .catch(err => console.log('err:', err))
    }


    if (!car) return <div>Loading Details...</div>
    const { vendor, speed } = car
    return (
        <section className="car-details container">
            <h1>Car Vendor: {vendor}</h1>
            <h1>Car Speed: {speed}</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum aliquam quibusdam corrupti? Minus, ad tenetur!
            </p>
            <img src={`../assets/img/${vendor}.png`} alt="Car Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}