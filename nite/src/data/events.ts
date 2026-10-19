export type EventCardData = {
  id: string;
  title: string;
  host: string;
  line: string;
  price: string;
  fullness?: number;
  image: any;
};

export const nearbyEvents: EventCardData[] = [
  {
    id: 'tavern',
    title: 'Tavern & Talks',
    host: 'Student Union',
    line: '~20 min',
    price: '$12',
    fullness: 70,
    image: require('../../assets/event-tavern.jpg'),
  },
  {
    id: 'mixer',
    title: 'Campus Rooftop Mixer',
    host: 'Campus Social Club',
    line: '~15 min',
    price: '$8',
    image: require('../../assets/event-rooftop.jpg'),
  },
];

export const popularEvents: EventCardData[] = [
  {
    id: 'openmic',
    title: 'The Daily Grind (Open Mic)',
    host: 'Riverdale Coffee',
    line: '~10 min',
    price: 'Free',
    image: require('../../assets/event-openmic.jpg'),
  },
  {
    id: 'munchies',
    title: 'Midnight Munchies',
    host: 'Campus Eats',
    line: '~25 min',
    price: '$5',
    fullness: 60,
    image: require('../../assets/event-munchies.jpg'),
  },
];
