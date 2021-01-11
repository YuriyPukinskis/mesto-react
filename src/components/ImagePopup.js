import React from 'react';

export default function ImagePopup(props){
  return(
  <div class={`popup image-popup ${props.isBigImageOpen?'popup_visible':''}`}>
    <div class="image-popup__container">
      <img class="image-popup__img" src="#" alt="Изображение" src={props.card.link} />
      <div class="caption">{props.card.name}</div>
      <button class="popup__close image-popup__close" type="button" onClick={props.closeAllPopups}></button>
    </div>
  </div>
  )
}