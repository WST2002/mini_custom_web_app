import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { Template3 } from './Template3';
import { Template4 } from './Template4';
import { Template5 } from './Template5';
import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 1,
    name: 'Modern Business',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    component: Template1
  },
  {
    id: 2,
    name: 'Gradient Elegance',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    component: Template2
  },
  {
    id: 3,
    name: 'Dark Future',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    component: Template3
  },
  {
    id: 4,
    name: 'Magazine Style',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    component: Template4
  },
  {
    id: 5,
    name: 'Emerald Minimal',
    thumbnail: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee',
    component: Template5
  }
];