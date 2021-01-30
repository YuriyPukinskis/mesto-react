import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import {api} from '../utils/api';
import {CurrentUserContext} from'../contexts/CurrentUserContext';
import {CardContext} from'../contexts/CardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
function App() {

  const [currentUser, setCurrentUser] = useState({avatar:'',about:'',name:'',_id:''});
  

  
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen]=useState(false)
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen]=useState(false)
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen]=useState(false)
  const [isBigImageOpen,setIsBigImageOpen]=useState(false);
  
  const [userName,setUserName]=useState('');
  const [userDescription,setUserDescription]=useState('');
  const [userAvatar,setUserAvatar]=useState('');
  const [myId,setMyId]=useState('');
  const [selectedCard,setSelectedCard]=useState({name: '', link: ''});;

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
          .catch((err) => {
            console.log(err); 
          });
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
    setSelectedCard({name: '', link: ''})
  }

  function handleUpdateUser(data) {
    api.postLoginToServer(data.name, data.about)
      .then((updatedUser)=>{
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleUpdateAvatar(data) {
    api.postAvatarToServer(data.avatar)
      .then((updatedUser)=>{
        setCurrentUser(updatedUser);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleApploadCard(data) {
    api.postCardToServer(data.name,data.url)
      .then((newCard)=>{
        const newCardToPage = prepareCard(newCard)
        setCards([newCardToPage, ...cards]); 
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked){
      api.likeCardOnServer(card.cardId)
      .then((newCard) => {
        const newCardToArr=prepareCard(newCard)
        const newCards = cards.map((c) => c.cardId === card.cardId ? newCardToArr : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err); 
      });
    }else{
      api.dislikeCardOnServer(card.cardId)
      .then((newCard) => {
        const newCardToArr=prepareCard(newCard)
        const newCards = cards.map((c) => c.cardId === card.cardId ? newCardToArr : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err); 
      });
    }
    
  } 
  function handleCardDelete(card) {
    api.deleteCardFromServer(card.cardId)
    .then(() => {
      const newCards = cards.filter((c) => c.cardId !== card.cardId);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err); 
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
  </div>
  </CardContext.Provider>
  </CurrentUserContext.Provider>
  );
  
}


export default App;