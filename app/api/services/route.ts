import { NextResponse } from 'next/server';

// Mock data for services
const services = [
  {
    id: '1',
    title: 'Professional Logo Design',
    description: 'I will create a modern and professional logo design for your business or brand',
    price: 50,
    rating: 4.9,
    reviews: 253,
    location: 'New York, NY',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    seller: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    },
  },
  {
    id: '2',
    title: 'WordPress Website Development',
    description: 'I will create a responsive WordPress website for your business or personal brand',
    price: 120,
    rating: 4.8,
    reviews: 187,
    location: 'San Francisco, CA',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    seller: {
      id: 'user2',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
  },
  // More services...
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const q = searchParams.get('q');
  const location = searchParams.get('location');
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minRating = searchParams.get('minRating');
  
  let filteredServices = [...services];
  
  // Filter by search term
  if (q) {
    filteredServices = filteredServices.filter(
      service => 
        service.title.toLowerCase().includes(q.toLowerCase()) || 
        service.description.toLowerCase().includes(q.toLowerCase())
    );
  }
  
  // Filter by location
  if (location) {
    filteredServices = filteredServices.filter(
      service => service.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  // Filter by category
  if (category) {
    filteredServices = filteredServices.filter(
      service => service.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter by price
  if (minPrice) {
    filteredServices = filteredServices.filter(
      service => service.price >= parseInt(minPrice)
    );
  }
  
  if (maxPrice) {
    filteredServices = filteredServices.filter(
      service => service.price <= parseInt(maxPrice)
    );
  }
  
  // Filter by rating
  if (minRating) {
    filteredServices = filteredServices.filter(
      service => service.rating >= parseFloat(minRating)
    );
  }
  
  return NextResponse.json(filteredServices);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real application, you would validate the data and save it to a database
    const newService = {
      id: (services.length + 1).toString(),
      ...data,
    };
    
    // Here, we're just adding it to our mock array (this won't persist on server restart)
    services.push(newService);
    
    return NextResponse.json(newService, { status: 201 });
  } catch (_) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 400 });
  }
} 