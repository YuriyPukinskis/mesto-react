export default function Card(props){
  return(
    <div class="element">
      <img class="element__img" src={props.card.link} onClick={()=>handleClick(props)} />
      <button class={`element__delete ${(props.myId!==props.card.ownerID)?'':'popup_visible'}`} type="button"></button>
      <div class="element__caption">
        <h2 class="element__text">{props.card.name}</h2>
        <div class="element__section">
          <button class="element__button" type="button"></button>
          <p class="element__likeCount">{props.card.numberOfLikes}</p>
        </div>
      </div>
    </div>
  )
}

function handleClick(props) {
  props.handleCardClick();
  props.onCardClick(props.card);
} 