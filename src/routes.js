import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';

import Sponsor from 'components/Sponsor/sponsor';
import About from 'components/About/about';

import EventInfo from 'components/EventInfo/eventInfo';
import Contact from 'components/Contact/contact';

const routes = [
  {
    path: '/',
    component: Home,
    meta: { auth: false }
  },
  {
    path: '/apply/:pageId',
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
