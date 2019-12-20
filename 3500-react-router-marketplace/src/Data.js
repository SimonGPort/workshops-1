const initialItems = [
  {
    description: 'Nice boats. 50% off. wow.',
    inventory: 5,
    price: 10000,
    image: '/boat.png',
    id: 'asewq',
    sellerId: 'ewio',
    reviewIds: ['r1']
  },
  {
    id: 'wqwasq',
    description: 'Lawn chairs',
    inventory: 4,
    price: 50,
    image: '/lawnchair.jpg',
    sellerId: 'xcvb',
    reviewIds: []
  },
  {
    id: 'i1',
    description: 'Tiger',
    inventory: 0,
    price: 5000,
    image: '/tiger.jpg',
    sellerId: 'jsdfk',
    reviewIds: []
  },
  {
    id: 'i2',
    description: 'Plane',
    inventory: 100,
    price: 500000,
    image: '/plane.png',
    sellerId: 'xcvb',
    reviewIds: ['r2']
  },
  {
    id: 'i3',
    description: 'Table',
    inventory: 999,
    price: 20,
    image: '/table.jpeg',
    sellerId: 'jsdfk',
    reviewIds: []
  }
];
const initialSellers = [
  {
    id: 'ewio',
    name: 'Jack Frost',
    rating: '5 stars'
  },
  {
    id: 'xcvb',
    name: 'Hank Green',
    rating: '2 stars'
  },
  {
    id: 'jsdfk',
    name: 'Max Sue',
    rating: '3 stars'
  }
];
const initialReviews = [
  { id: 'r1', content: 'Very bad', reviewerId: 'rv1' },
  { id: 'r2', content: 'Amazing product', reviewerId: 'rv2' }
];
const initialReviewers = [
  { id: 'rv1', name: 'Hank' },
  { id: 'rv2', name: 'Elisabeth' }
];

export { initialItems, initialSellers, initialReviews, initialReviewers };
