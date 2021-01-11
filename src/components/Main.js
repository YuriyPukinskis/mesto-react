import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import pen from '../images/pen.png';
import Card from './Card';

export default function Main(props) {
  return (
    <div>
    <main class="main">
      <section class="profile">
        <div class="profile__art">
          <img class="profile__logo" src ={props.userAvatar}  alt="Аватар профиля"/>
          <div class="profile__overlay" onClick={props.onEditAvatar}>
            <img class="profile__pen" src={pen} alt="Редактировать"/>
          </div>
          
        </div>
        <div class="profile__info">
            <h1 class="profile__name">{props.userName}</h1>
            <p class="profile__occupation">{props.userDescription}</p>
            <button class="profile__button" type="button" onClick={props.onEditProfile}></button>
            
        </div>
        <button class="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      
      {(props.cards.length!==0)?
      <section class="elements">
        {Array.prototype.map.call(props.cards, function(item){
          return(
            <Card card={item} myId={props.myId} onCardClick={props.onCardClick} handleCardClick={props.handleCardClick}/>
          )
        })}
        <ImagePopup card={props.selectedCard} isOpen={true} isBigImageOpen={props.isBigImageOpen} closeAllPopups={props.closeAllPopups}  />
      </section>
      
      :''}
    
      
    </main>
    <PopupWithForm name="place-popup" title="Новое место" isOpen={props.isAddPlacePopupOpen} closeAllPopups={props.closeAllPopups}>
      <input id="image-input" class="popup__input place-popup__input_name" placeholder='Название' name="place-name" type="text" minlength="2" maxlength="30" required />
      <span id="image-input-error" class="popup__input-error"></span> 
      <input id="url-input" class="popup__input place-popup__input_image" placeholder='Ссылка на картинку' name="place-image" type="url" required />
      <span id="url-input-error" class="popup__input-error"></span> 
      <button class="popup__button place-submit" type="submit" name="place-submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="avatar-popup" title="Обновить аватар" isOpen={props.isEditAvatarPopupOpen} closeAllPopups={props.closeAllPopups}>
      <input id="url-input" class="popup__input avatar-popup__input_image" placeholder='Ссылка на картинку' name="avatar-image" type="url" required />
      <span id="url-input-error" class="popup__input-error"></span> 
      <button class="popup__button avatar-submit" type="submit" name="avatar-submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="profile-popup" title="Редактировать профиль" isOpen={props.isEditProfilePopupOpen} closeAllPopups={props.closeAllPopups}>
      <input id="name-input" class="popup__input profile-popup__input_name" name="name" type="text" minlength="2" maxlength="20" required />
      <span id="name-input-error" class="popup__input-error"></span> 
      <input id="occupation-input" class="popup__input profile-popup__input_occupation" name="job" type="text" minlength="2" maxlength="200" required />
      <span id="occupation-input-error" class="popup__input-error"></span> 
      <button class="popup__button profile__submit" type="submit" name="submit">Сохранить</button>
    </PopupWithForm>
    
  </div>
  );
}

