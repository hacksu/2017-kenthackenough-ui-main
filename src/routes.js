import Home from 'components/Home/home';
import NotFound from 'components/NotFound/notFound';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
