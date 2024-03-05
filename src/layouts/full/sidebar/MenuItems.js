

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'UTM Stats',
  },
  {
    id: uniqueId(),
    title: 'Lead Count',
    href: '/LeadCount',
  },
  {
    id: uniqueId(),
    title: 'Ad Platform',
    href: '/AdPlatform',
  },
  {
    navlabel: true,
    subheader: 'Pioche',
  },
  {
    id: uniqueId(),
    title: 'Pioche',
    href: '/Pioche',
  },
];

export default Menuitems;
