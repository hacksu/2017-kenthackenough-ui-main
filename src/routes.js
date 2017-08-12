import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';
import EventInfo from 'components/EventInfo/eventInfo';
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
