import React from 'react';

export default function PopupWithForm(props){
  return(
    <div className={`popup ${props.name} ${props.isOpen?'popup_visible':''}`}  >
    <form className="popup__container profile-container" name="editProfile" novalidate>
      <h2 className="popup__title">{props.title}</h2>
      <button className="popup__close profile__close" type="button" onClick={props.onClose} /> 
      {props.children}
    </form>
  </div>
  )
}