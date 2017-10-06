import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';
import live from 'components/Live/live';

import Sponsor from 'components/Sponsor/sponsor';
import About from 'components/About/about';
import Schedule from 'components/Schedule/schedule';
import Rsvp from 'components/RSVP/rsvp';
import Snapcode from 'components/Snapcode/snapcode';

import EventInfo from 'components/EventInfo/eventInfo';
import Library from 'components/Library/library';
import Contact from 'components/Contact/contact';

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
<<<<<<< HEAD
    path: '/snapcode',
    component: Snapcode
=======
    path: '/live',
    component: live,
    meta: { auth: false }
  },
  {
    path: '/gamify/*',
    component: Home,
    meta: { auth: true }
>>>>>>> 15f7b40de8ce25d5171a01b578808001f1d9f217
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
