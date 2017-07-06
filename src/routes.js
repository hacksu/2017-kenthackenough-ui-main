import Home from 'components/Home/home';
import Application from 'components/Application/application';
import NotFound from 'components/NotFound/notFound';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/apply',
    component: Application
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
