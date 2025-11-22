import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import LeagueInfoPage from '../pages/league-info/page';
import TeamInfoPage from '../pages/team-info/page';
import PlayerInfoPage from '../pages/player-info/page';
import CoachInfoPage from '../pages/coach-info/page';
import RefereeInfoPage from '../pages/referee-info/page';

const HomePage = lazy(() => import('../pages/home/page'));
const LiveScoresPage = lazy(() => import('../pages/live-scores/page'));
const MatchDetailsPage = lazy(() => import('../pages/match-details/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/live-scores',
    element: <LiveScoresPage />
  },
  {
    path: '/league-info/:leagueId',
    element: <LeagueInfoPage />
  },
  {
    path: '/match-details/:matchId',
    element: <MatchDetailsPage />
  },
  {
    path: '/team-info/:teamId',
    element: <TeamInfoPage />
  },
  {
    path: '/player-info/:playerId',
    element: <PlayerInfoPage />
  },
  {
    path: '/coach-info/:coachId',
    element: <CoachInfoPage />
  },
  {
    path: '/referee-info/:refereeId',
    element: <RefereeInfoPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;