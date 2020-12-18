import { StyleElement } from '../models/loading-on-element.model';

export const listStyleElementBackground: StyleElement[] = [
  {
    key: 'position',
    value: 'absolute',
  },
  {
    key: 'width',
    value: '100%',
  },
  {
    key: 'height',
    value: '100%',
  },
  {
    key: 'background-color',
    value: '#00000000',
  },
  {
    key: 'z-index',
    value: '1',
  },
  {
    key: 'left',
    value: '0px',
  },
  {
    key: 'top',
    value: '0px',
  },
  {
    key: 'animation',
    value: 'FadeIn ease-in-out',
  },
  {
    key: 'animation-duration',
    value: '.6s',
  },
];

export const listStyleElementIcon: StyleElement[] = [
  {
    key: 'position',
    value: 'absolute',
  },
  {
    key: 'z-index',
    value: '1',
  },
  {
    key: 'transform',
    value: 'translate(-50%, -50%)',
  },
  {
    key: 'color',
    value: '#4a5156',
  },
];
