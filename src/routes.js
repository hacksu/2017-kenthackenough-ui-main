import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';
import live from 'components/Live/live';

import Sponsor from 'components/Sponsor/sponsor';
import About from 'components/About/about';

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
  // {
  //   path: '/oauth/callback',
    
  // },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
