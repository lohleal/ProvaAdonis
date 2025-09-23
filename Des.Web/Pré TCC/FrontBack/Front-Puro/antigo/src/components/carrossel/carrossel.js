import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Carrossel() {
  const imagemStyle = {
    objectFit: 'contain',
    maxHeight: '600px',
    width: '100%',
  };

  const setaStyle = `
    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      background-color: #5c4033;
      border-radius: 50%;
      background-size: 50% 50%;
      width: 50px;
      height: 50px;
    }
  `;

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <style>{setaStyle}</style>

      <Carousel>
        <Carousel.Item>
          <img
            src="/Images/1.png"
            alt="Imagem 1"
            className="d-block"
            style={imagemStyle}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/Images/2.png"
            alt="Imagem 2"
            className="d-block"
            style={imagemStyle}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/Images/3.png"
            alt="Imagem 3"
            className="d-block"
            style={imagemStyle}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/Images/4.png"
            alt="Imagem 4"
            className="d-block"
            style={imagemStyle}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}