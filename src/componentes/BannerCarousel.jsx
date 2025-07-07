import { useEffect, useState, useRef } from 'react';
import banner1 from '../assets/imagenes/banner1.jpg';
import banner2 from '../assets/imagenes/banner2.jpg';
import banner3 from '../assets/imagenes/banner3.jpg';
import banner4 from '../assets/imagenes/banner4.jpg';
import '../estilos/BannerCarousel.css';

const banners = [banner1, banner2, banner3, banner4];

export default function BannerCarousel() {
  const [actual, setActual] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActual((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [actual]);

  const irA = (idx) => {
    setActual(idx);
    clearTimeout(timeoutRef.current);
  };

  const anterior = () => irA((actual - 1 + banners.length) % banners.length);
  const siguiente = () => irA((actual + 1) % banners.length);

  return (
    <div className="banner-carousel">
      <button className="banner-arrow left" onClick={anterior}>&#8592;</button>
      <img src={banners[actual]} alt={`Banner ${actual + 1}`} className="banner-img" />
      <button className="banner-arrow right" onClick={siguiente}>&#8594;</button>
      <div className="banner-dots">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={idx === actual ? 'dot active' : 'dot'}
            onClick={() => irA(idx)}
          />
        ))}
      </div>
    </div>
  );
}
