import {Offer} from '../../types/offer.ts';
import {BookmarkAction} from '../../types/bookmark-action.ts';
import {AppRoute} from '../../const.ts';
import {Link} from 'react-router-dom';
import {memo} from 'react';

type FavoriteOfferCardProps = {
  offer: Offer;
  onBookmarkStatusChange: (action: BookmarkAction) => void;
}

function FavoriteOfferCard({ offer, onBookmarkStatusChange }: FavoriteOfferCardProps) {
  const bookmarkedClassName = offer.isFavorite && 'place-card__bookmark-button--active';
  const link = AppRoute.OfferPage.replace(':id', offer.id);

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={link} >
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${bookmarkedClassName} button`}
            onClick={() => onBookmarkStatusChange({offerId: offer.id, isBookmarked: !offer.isFavorite})}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">

            <span style={{ width: `${Math.floor(offer.rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedFavoriteOfferCard = memo(FavoriteOfferCard);
export default MemoizedFavoriteOfferCard;
