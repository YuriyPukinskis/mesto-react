import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import {api} from '../utils/Api';
import {CurrentUserContext} from'../contexts/CurrentUserContext';
import {CardContext} from'../contexts/CardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
function App() {

  const [currentUser, setCurrentUser] = useState('');
  

  
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

  function prepareCard(newCard){
    const name=newCard.name;
    const link=newCard.link;
    const numberOfLikes=newCard.likes.length;
    const likes=newCard.likes;
    const cardId=newCard._id;
    const elementLikes = newCard.likes
    const ownerID = newCard.owner._id;
    return {name,link,numberOfLikes,cardId,elementLikes,ownerID,likes}
  }

  useEffect(() => {
    api.initProfileFomServer()
      .then(function(res){
        setUserAvatar(res.avatar);
        setUserDescription(res.about);
        setUserName(res.name);
        setMyId(res._id);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err); 
      });
      if (cards.length===0){
        api.getInitialCards()
          .then(function(res){
            const card=[]
            res.forEach(element => {
              card.push(prepareCard(element))
            })
            setCards(card) 
            })
      }
  }, [null])


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

  function handleUpdateUser(data) {
    api.postLoginToServer(data.name, data.about)
      .then((updatedUser)=>{
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(data) {
    api.postAvatarToServer(data.avatar)
      .then(()=>{
        setUserAvatar(data.avatar);
        closeAllPopups()
      })
  }

  function handleApploadCard(data) {
    api.postCardToServer(data.name,data.url)
      .then((newCard)=>{
        setCards([newCard, ...cards]); 
        closeAllPopups()
      })
  }

  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked){
      api.likeCardOnServer(card.cardId)
      .then((newCard) => {
        const newCardToArr=prepareCard(newCard)
        const newCards = cards.map((c) => c.cardId === card.cardId ? newCardToArr : c);
        setCards(newCards);
      });
    }else{
      api.dislikeCardOnServer(card.cardId)
      .then((newCard) => {
        const newCardToArr=prepareCard(newCard)
        const newCards = cards.map((c) => c.cardId === card.cardId ? newCardToArr : c);
        setCards(newCards);
      });
    }
    
  } 
  function handleCardDelete(card) {
    api.deleteCardFromServer(card.cardId).then((newCard) => {
      const newCards = cards.filter((c) => c.cardId !== card.cardId);
      setCards(newCards);
    });
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={setCards}>
    <div>
    <div className="page">
    
    <Header />
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}  onEditAvatar={handleEditAvatarClick} handleCardClick={handleCardClick}
          userAvatar={userAvatar} userName={userName} userDescription={userDescription} cards={cards} myId={myId}
          onCardClick={setSelectedCard} selectedCard={selectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} /> 
    
    <Footer />
    
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onApploadCard={handleApploadCard}/>

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
  </CardContext.Provider>
  </CurrentUserContext.Provider>
  );
  
}


export default App;