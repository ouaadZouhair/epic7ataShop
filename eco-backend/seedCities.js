// seedCities.js
import City from "./Models/City.js"

// const cities = [
//   { name: 'Rabat', deliveryCost: 35 },
//   { name: 'Casablanca', deliveryCost: 20 },
//   // Add more cities as needed
// ];

const cities = [
    { name: 'Rabat', deliveryCost: 35 },
    { name: 'Casablanca', deliveryCost: 20 },
    { name: 'Marrakech', deliveryCost: 35 },
    { name: 'Fes', deliveryCost: 35 },
    { name: 'Tangier', deliveryCost: 35 },
    { name: 'Agadir', deliveryCost: 35 },
    { name: 'Meknes', deliveryCost: 35 },
    { name: 'Oujda', deliveryCost: 35 },
    { name: 'Kenitra', deliveryCost: 35 },
    { name: 'Tetouan', deliveryCost: 35 },
    { name: 'Safi', deliveryCost: 35 },
    { name: 'El Jadida', deliveryCost: 35 },
    { name: 'Beni Mellal', deliveryCost: 35 },
    { name: 'Nador', deliveryCost: 35 },
    { name: 'Taza', deliveryCost: 35 },
    { name: 'Settat', deliveryCost: 35 },
    { name: 'Khouribga', deliveryCost: 35 },
    { name: 'Essaouira', deliveryCost: 35 },
    { name: 'Khemisset', deliveryCost: 35 },
    { name: 'Larache', deliveryCost: 35 },
    { name: 'Guelmim', deliveryCost: 35 },
    { name: 'Berrechid', deliveryCost: 35 },
    { name: 'Ouarzazate', deliveryCost: 35 },
    { name: 'Berkane', deliveryCost: 35 },
    { name: 'Tiznit', deliveryCost: 35 },
    { name: 'Errachidia', deliveryCost: 35 },
    { name: 'Ksar El Kebir', deliveryCost: 35 },
    { name: 'Sidi Kacem', deliveryCost: 35 },
    { name: 'Taroudant', deliveryCost: 35 },
    { name: 'Youssoufia', deliveryCost: 35 },
    { name: 'Ben Guerir', deliveryCost: 35 },
    { name: 'Taourirt', deliveryCost: 35 },
    { name: 'Fquih Ben Salah', deliveryCost: 35 },
    { name: 'Sidi Slimane', deliveryCost: 35 },
    { name: 'Mohammedia', deliveryCost: 35 },
    { name: 'Dakhla', deliveryCost: 35 },
    { name: 'Laayoune', deliveryCost: 35 },
    { name: 'Midelt', deliveryCost: 35 },
    { name: 'Azrou', deliveryCost: 35 }
  ];

const seedCities = async () => {
  await City.deleteMany(); // Clear existing data
  await City.insertMany(cities);
  console.log('Cities seeded successfully');
};

seedCities();