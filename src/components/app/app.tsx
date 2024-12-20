import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import HistoryRouter from '../history-router/history-router.tsx';
import browserHistory from '../../browser-history.ts';
import MemoizedMainPage from '../../pages/main-page/main-page';
import MemoizedFavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import MemoizedOfferPage from '../../pages/offer-page/offer-page.tsx';
import MemoizedNotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import MemoizedLoginPage from '../../pages/login-page/login-page.tsx';
import {BookmarkAction} from '../../types/bookmark-action.ts';
import {changeBookmarkStatusAction} from '../../store/api-actions.ts';
import {useCallback} from 'react';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleBookmark = useCallback(
    (action: BookmarkAction) => {
      dispatch(changeBookmarkStatusAction(action));
    },
    [dispatch]
  );
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.MainPage}
          element={<MemoizedMainPage onBookmarkStatusChange={handleBookmark}/>}
        />
        <Route
          path={AppRoute.LoginPage}
          element={<MemoizedLoginPage />}
        />
        <Route
          path={AppRoute.FavoritesPage}
          element={
            <PrivateRoute>
              <MemoizedFavoritesPage onBookmarkStatusChange={handleBookmark} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.OfferPage}`}
          element={<MemoizedOfferPage onBookmarkStatusChange={handleBookmark}/>}
        />
        <Route
          path={AppRoute.NotFoundPage}
          element={<MemoizedNotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
