import '../App.css';
import Header from './Heder';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import {api} from '../utils/Api';
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
        
        // user.initProfile(pageProfileName,pageProfileJob,pageProfileAvatar,res.name,res.about,res.avatar)
        
        // const cardArr =[]
        // drawCards(cardArr,myIdInLikesArray)
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
              // alert(myId)
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
    <div class="page">
    
    <Header />
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}  onEditAvatar={handleEditAvatarClick} 
          isEditAvatarPopupOpen={isEditAvatarPopupOpen} isEditProfilePopupOpen={isEditProfilePopupOpen} isAddPlacePopupOpen={isAddPlacePopupOpen} 
          isEditProfilePopupOpen={isEditProfilePopupOpen} isBigImageOpen={isBigImageOpen} handleCardClick={handleCardClick} closeAllPopups={closeAllPopups} 
          userAvatar={userAvatar} userName={userName} userDescription={userDescription} cards={cards} myId={myId}
          onCardClick={setSelectedCard} selectedCard={selectedCard}/>
    <Footer />
    
  </div>

  
  <div class="popup delete-popup">
    <form class="popup__container delete-container">
      <h2 class="popup__title">Вы уверены?</h2>
      <button class="popup__button place-delete" type="submit" name="delete-submit">Да</button>
      <button class="popup__close delete-close" type="button"></button>
    </form>
  </div>
  
  
  </div>
  );
  
}

export default App;