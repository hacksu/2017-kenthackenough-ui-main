import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';
import live from 'components/Live/live';

import Sponsor from 'components/Sponsor/sponsor';
import About from 'components/About/about';
import Schedule from 'components/Schedule/schedule';
import Rsvp from 'components/RSVP/rsvp';
import Snapcode from 'components/Snapcode/Snapcode';

import EventInfo from 'components/EventInfo/eventInfo';
import Library from 'components/Library/library';
import Contact from 'components/Contact/contact';

import Expo from 'components/Expo/expo';

const routes = [
  {
    path: '/',
    component: Home,
    meta: { auth: false }
  },
  {
    path: '/apply',
    component: Application
  },
  {
    path: '/sponsors',
    component: Sponsor
  },
  {
    path: '/sponsor',
    component: Sponsor
  },
  {
    path: '/rsvp',
    component: Rsvp
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/schedule',
    component: Schedule
  },
  {
    path: '/info',
    component: EventInfo
  },
  {
    path: '/library',
    component: Library
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    path: '/snapcode',
    component: Snapcode
  },
  {
    path: '/live',
    component: live,
    meta: { auth: false }
  },
  {
    path: '/gamify/*',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/expo',
    component: Expo
  },
  // {
  //   path: '/oauth/callback',
    
  // },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
