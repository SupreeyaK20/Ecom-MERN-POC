const shippingZones = [
    {
      name: 'India',
      rates: [
        { maxWeight: 1, price: 5.0 },
        { maxWeight: 3, price: 10.0 },
        { maxWeight: 5, price: 15.0 },
        { maxWeight: Infinity, price: 20.0 },
      ],
    },
    {
      name: 'Usa',
      rates: [
        { maxWeight: 1, price: 7.5 },
        { maxWeight: 3, price: 15.0 },
        { maxWeight: 5, price: 22.5 },
        { maxWeight: Infinity, price: 30.0 },
      ],
    },
    // Add more shipping zones and their rates here
];

module.exports = shippingZones