// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'category',
    path: '/categories',
    icon: icon('ic_blog'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_lock'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'order',
    path: '/order',
    icon: icon('ic_cart'),
  },
  {
    title: 'shipping',
    path: '/shipping',
    icon: icon('ic_notification_shipping'),
  },
];

export default navConfig;
