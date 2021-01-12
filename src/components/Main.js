import React from 'react';
import pen from '../images/pen.svg';
import Card from './Card';

export default function Main(props) {
  return (
    <div>
    <main className="main">
      <section className="profile">
        <div className="profile__art">
          <img className="profile__logo" src ={props.userAvatar}  alt="Аватар профиля"/>
          <div className="profile__overlay" onClick={props.onEditAvatar}>
            <img className="profile__pen" src={pen} alt="Редактировать"/>
          </div> 
        </div>
        <div className="profile__info">
            <h1 className="profile__name">{props.userName}</h1>
            <p className="profile__occupation">{props.userDescription}</p>
            <button className="profile__button" type="button" onClick={props.onEditProfile} /> 
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>

      
      {(props.cards.length!==0)?
        <section className="elements">
          {Array.prototype.map.call(props.cards, function(item){
            return(
              <Card card={item} myId={props.myId} onCardClick={props.onCardClick} handleCardClick={props.handleCardClick}/>
            )
          })}
        </section>
      :''}
    
      
    </main>
    </div>
  );
}

