export default function Card(props){
  return(
    <div className="element">
      <img className="element__img" src={props.card.link} onClick={()=>handleClick(props)} />
      <button className={`element__delete ${(props.myId!==props.card.ownerID)?'':'popup_visible'}`} type="button" />
      <div className="element__caption">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__section">
          <button className="element__button" type="button" />
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