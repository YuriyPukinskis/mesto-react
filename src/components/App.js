import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import {api} from '../utils/Api';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
function App() {
  
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen]=useState(false)
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen]=useState(false)
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen]=useState(false)
  const [isBigImageOpen,setIsBigImageOpen]=useState(false);
  
  const [userName,setUserName]=useState('');
  const [userDescription,setUserDescription]=useState('');
  const [userAvatar,setUserAvatar]=useState('');
  const [myId,setMyId]=useState('');
  const [selectedCard,setSelectedCard]=useState('');

  const [cards,setCards]=useState([]);
  useEffect(() => {
    Promise.resolve(api.initProfileFomServer())
      .then(function(res){
        setUserAvatar(res.avatar);
        setUserDescription(res.about);
        setUserName(res.name);
        setMyId(res._id);
      })
      .catch((err) => {
        console.log(err); 
      });
      if (cards.length===0){
        api.getInitialCards()
          .then(function(res){
            const card=[]
            res.forEach(element => {
              const name=element.name;
              const link=element.link;
              const numberOfLikes=element.likes.length;
              const cardId=element._id;
              const elementLikes = element.likes
              const ownerID = element.owner._id;
              card.push({name,link,numberOfLikes,cardId,elementLikes,ownerID});
            })
            setCards(card) 
            })
      }
  })


  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(){
    setIsBigImageOpen(true)
  }
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsBigImageOpen(false);
    // setSelectedCard(undefined);
  }
  return (
    <div>
    <div className="page">
    
    <Header />
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}  onEditAvatar={handleEditAvatarClick} handleCardClick={handleCardClick}
          userAvatar={userAvatar} userName={userName} userDescription={userDescription} cards={cards} myId={myId}
          onCardClick={setSelectedCard} selectedCard={selectedCard}/>
    <Footer />
    <PopupWithForm name="profile-popup" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <input id="name-input" className="popup__input profile-popup__input_name" name="name" type="text" minlength="2" maxlength="20" required />
      <span id="name-input-error" className="popup__input-error" /> 
      <input id="occupation-input" className="popup__input profile-popup__input_occupation" name="job" type="text" minlength="2" maxlength="200" required />
      <span id="occupation-input-error" className="popup__input-error" /> 
      <button className="popup__button profile__submit" type="submit" name="submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="place-popup" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
      <input id="image-input" className="popup__input place-popup__input_name" placeholder='Название' name="place-name" type="text" minlength="2" maxlength="30" required />
      <span id="image-input-error" className="popup__input-error" /> 
      <input id="url-input" className="popup__input place-popup__input_image" placeholder='Ссылка на картинку' name="place-image" type="url" required />
      <span id="url-input-error" className="popup__input-error" /> 
      <button className="popup__button place-submit" type="submit" name="place-submit">Сохранить</button>
    </PopupWithForm>
    <PopupWithForm name="avatar-popup" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
      <input id="url-input" className="popup__input avatar-popup__input_image" placeholder='Ссылка на картинку' name="avatar-image" type="url" required />
      <span id="url-input-error" className="popup__input-error" /> 
      <button className="popup__button avatar-submit" type="submit" name="avatar-submit">Сохранить</button>
    </PopupWithForm>
    <ImagePopup card={selectedCard} isOpen={true} isBigImageOpen={isBigImageOpen} onClose={closeAllPopups}  />
  </div>

  
  <div className="popup delete-popup">
    <form className="popup__container delete-container">
      <h2 className="popup__title">Вы уверены?</h2>
      <button className="popup__button place-delete" type="submit" name="delete-submit">Да</button>
      <button className="popup__close delete-close" type="button" />
    </form>
  </div>
  
  
  </div>
  );
  
}


export default App;