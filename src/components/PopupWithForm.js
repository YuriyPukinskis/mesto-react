import React from 'react';

export default function PopupWithForm(props){
  return(
    <div class={`popup ${props.name} ${props.isOpen?'popup_visible':''}`}  >
    <form class="popup__container profile-container" name="editProfile" novalidate>
      <h2 class="popup__title">{props.title}</h2>
      <button class="popup__close profile__close" type="button" onClick={props.closeAllPopups}></button> 
      {props.children}
    </form>
  </div>
  )
}