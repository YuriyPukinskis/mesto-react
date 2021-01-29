import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function AddPlacePopup(props){
  
  const nameRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onApploadCard({
      name: nameRef.current.value,
      url: urlRef.current.value
    });
  }

  return(
    <PopupWithForm name="place-popup" title="Новое место" isOpen={props.isOpen} onClose={props.onClose}>
    <input ref={nameRef} id="image-input" className="popup__input place-popup__input_name" placeholder='Название' name="place-name" type="text" minLength="2" maxLength="30" required />
    <span id="image-input-error" className="popup__input-error" /> 
    <input ref={urlRef} id="url-input" className="popup__input place-popup__input_image" placeholder='Ссылка на картинку' name="place-image" type="url" required />
    <span id="url-input-error" className="popup__input-error" /> 
    <button className="popup__button place-submit" type="submit" name="place-submit" onClick={handleSubmit}>Сохранить</button>
  </PopupWithForm>    
  )
}