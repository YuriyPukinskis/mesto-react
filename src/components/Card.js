import {CurrentUserContext} from'../contexts/CurrentUserContext';
import React from 'react';

export default function Card(props){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.ownerID === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete ${isOwn ? 'popup_visible' : ''}`)
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button ${isLiked ? 'element__button_liked' : ''}`); 

  return(
    <div className="element">
      <img className="element__img" src={props.card.link} onClick={()=>handleClick(props)} alt='Неотрисовавшаяся картинка' />
      <button className={cardDeleteButtonClassName} type="button" onClick={()=>handleDeleteClick(props)} />
      <div className="element__caption">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__section">
          <button className={cardLikeButtonClassName} onClick={()=>handleLikeClick(props)} type="button" />
          <p className="element__likeCount">{props.card.numberOfLikes}</p>
        </div>
      </div>
    </div>
  )
}

function handleClick(props) {
  props.handleCardClick();
  props.onCardClick(props.card);
} 

function handleLikeClick(props) {
  props.onCardLike(props.card);
} 
function handleDeleteClick(props) {
  props.onCardDelete(props.card);
}