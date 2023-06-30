import './ProductCard.css'
import Depa from "../../assets/Productos/departamento1.jpeg"


export default function ProductCard() {
  return (
    <article className='productContainer'>
        <section className='productLeft'>
          <img className='productImage' src={Depa} alt="a product" />
        </section>
        <section className='productRight'>
            <p className='productName'>Product Name</p>
            <p className='productDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <button className='productButton'>Consultar</button>
        </section>
    </article>
  )
}
