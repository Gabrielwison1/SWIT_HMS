import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Wifi, Car, Coffee, Tv, Bath } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  size: number;
  amenities: string[];
  image: string;
  description: string;
  availability: boolean;
}

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  const amenityIcons: Record<string, React.ReactNode> = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Parking': <Car className="h-4 w-4" />,
    'Room Service': <Coffee className="h-4 w-4" />,
    'Smart TV': <Tv className="h-4 w-4" />,
    'En-suite Bathroom': <Bath className="h-4 w-4" />,
  };

  useEffect(() => {
    // Generate rooms immediately without setTimeout to avoid WebContainer issues
    const generateRooms = (): Room[] => {
      const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];
      const amenities = ['Free WiFi', 'Parking', 'Room Service', 'Smart TV', 'En-suite Bathroom'];
      
      return Array.from({ length: 12 }, (_, index) => ({
        id: faker.string.uuid(),
        name: `${roomTypes[index % roomTypes.length]} Room ${index + 1}`,
        type: roomTypes[index % roomTypes.length],
        price: faker.number.int({ min: 80, max: 500 }),
        capacity: faker.number.int({ min: 1, max: 6 }),
        size: faker.number.int({ min: 25, max: 80 }),
        amenities: faker.helpers.arrayElements(amenities, { min: 3, max: 5 }),
        image: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/f1f5f9/334155?text=${encodeURIComponent(roomTypes[index % roomTypes.length] + ' Room')}`,
        description: faker.lorem.sentences(2),
        availability: faker.datatype.boolean(0.8)
      }));
    };

    // Use requestAnimationFrame instead of setTimeout for better WebContainer compatibility
    const loadRooms = () => {
      requestAnimationFrame(() => {
        const generatedRooms = generateRooms();
        setRooms(generatedRooms);
        setFilteredRooms(generatedRooms);
        setLoading(false);
      });
    };

    loadRooms();
  }, []);

  useEffect(() => {
    let filtered = rooms;

    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(room => room.type.toLowerCase() === filterType.toLowerCase());
    }

    setFilteredRooms(filtered);
  }, [searchTerm, filterType, rooms]);

  const roomTypes = ['all', ...Array.from(new Set(rooms.map(room => room.type.toLowerCase())))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Rooms</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our range of comfortable and luxurious accommodations designed for every type of traveller
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Room Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    room.availability
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.availability ? 'Available' : 'Occupied'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{room.name}</h3>
                  <span className="text-2xl font-bold text-primary-600">£{room.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">per night</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{room.capacity} guests</span>
                  </div>
                  <div>
                    <span>{room.size} m²</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{room.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
                    >
                      {amenityIcons[amenity]}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/booking?room=${room.id}`}
                  className={`w-full py-2 px-4 rounded-lg font-medium text-center block transition-colors ${
                    room.availability
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {room.availability ? 'Book Now' : 'Unavailable'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No rooms found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
