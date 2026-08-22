export const farmerStats = [
  { state: "Uttar Pradesh", farmers: 184200, share: 17.8, condition: "High participation; irrigated plains" },
  { state: "Maharashtra", farmers: 139600, share: 13.5, condition: "High participation; drought-prone districts" },
  { state: "Bihar", farmers: 118400, share: 11.4, condition: "High participation; flood-prone districts" },
  { state: "Madhya Pradesh", farmers: 102900, share: 9.9, condition: "High participation; rainfed farming" },
  { state: "Rajasthan", farmers: 89100, share: 8.6, condition: "Arid conditions; water stress" },
  { state: "West Bengal", farmers: 78400, share: 7.6, condition: "Deltaic plains; flood exposure" },
  { state: "Karnataka", farmers: 70100, share: 6.8, condition: "Mixed rainfall; dryland pockets" },
  { state: "Jharkhand", farmers: 42600, share: 4.1, condition: "Rainfed plateau; forest-edge farming" },
  { state: "Odisha", farmers: 39500, share: 3.8, condition: "Coastal belt; cyclone exposure" },
  { state: "Gujarat", farmers: 36800, share: 3.6, condition: "Semi-arid; irrigation variation" },
  { state: "Tamil Nadu", farmers: 32200, share: 3.1, condition: "Water-stressed dryland pockets" },
  { state: "Telangana", farmers: 27400, share: 2.6, condition: "Rainfall variation; dryland farming" },
  { state: "Andhra Pradesh", farmers: 25300, share: 2.4, condition: "Coastal and drought-prone zones" },
  { state: "Chhattisgarh", farmers: 21900, share: 2.1, condition: "Rainfed plateau; forest-edge farming" }
];

export const totalFarmers = farmerStats.reduce(
  (sum, item) => sum + item.farmers,
  0
);
