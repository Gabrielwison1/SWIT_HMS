export interface Room {
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

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookingHistory: Booking[];
}

export interface Booking {
  id: string;
  customerId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}
