import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function EditProfilePopup(props){

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return(
    <PopupWithForm name="avatar-popup" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input  ref={inputRef} id="url-input" className="popup__input avatar-popup__input_image" placeholder='Ссылка на картинку' name="avatar-image" type="url" required />
      <span id="url-input-error" className="popup__input-error" /> 
      <button className="popup__button avatar-submit" type="submit" name="avatar-submit">Сохранить</button>
    </PopupWithForm>
  )
}