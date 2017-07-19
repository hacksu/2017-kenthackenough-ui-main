import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';
import Sponsor from 'components/Sponsor/sponsor';
import About from 'components/About/about';

const routes = [
  {
    path: '/',
    component: Home
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
  // {
  //   path: '/oauth/callback',
    
  // },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
