import React from 'react';
import pen from '../images/pen.png';
import Card from './Card';
import {CurrentUserContext} from'../contexts/CurrentUserContext';





export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  

  return (
    <div>
    <main className="main">
      <section className="profile">
        <div className="profile__art">
          <img className="profile__logo" src ={currentUser.avatar}  alt="Аватар профиля"/>
          <div className="profile__overlay" onClick={props.onEditAvatar}>
            <img className="profile__pen" src={pen} alt="Редактировать"/>
          </div> 
        </div>
        <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__occupation">{currentUser.about}</p>
            <button className="profile__button" type="button" onClick={props.onEditProfile} /> 
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>

      
      {(props.cards.length!==0)?
        <section className="elements">
          {Array.prototype.map.call(props.cards, function(item,index){
            return(
              <Card key={item.cardId} card={item} myId={props.myId} onCardClick={props.onCardClick} handleCardClick={props.handleCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
            )
          })}
        </section>
      :''}
    
      
    </main>
    </div>
  );
}

