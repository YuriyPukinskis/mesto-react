import React from 'react';

export default function ImagePopup(props){
  return(
  <div className={`popup image-popup ${props.isBigImageOpen?'popup_visible':''}`}>
    <div className="image-popup__container">
      <img className="image-popup__img" src="#" alt="Изображение" src={props.card.link} />
      <div className="caption">{props.card.name}</div>
      <button className="popup__close image-popup__close" type="button" onClick={props.onClose}></button>
    </div>
  </div>
  )
}