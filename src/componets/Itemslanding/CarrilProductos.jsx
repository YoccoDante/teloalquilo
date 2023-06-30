import './CarrilProductos.css'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import ProductCard from '../ProductCard/ProductCard'

export const CarrilProductos = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay({
    delay:3000
  })])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><ProductCard/></div>
        <div className="embla__slide"><ProductCard/></div>
        <div className="embla__slide"><ProductCard/></div>
      </div>
    </div>
  )
}