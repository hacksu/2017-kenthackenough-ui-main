import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';

import Sponsor from 'components/Sponsor/sponsor';
import About from 'components/About/about';
import Rsvp from 'components/RSVP/rsvp';

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
  // {
  //   path: '/oauth/callback',
    
  // },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
