import { NextResponse } from 'next/server';

// Mock data for services (normally this would come from a database)
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return NextResponse.json(
      { error: `Service with ID ${id} not found` },
      { status: 404 }
    );
  }
  
  return NextResponse.json(service);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();
    
    // Find the service to update
    const serviceIndex = services.findIndex(s => s.id === id);
    
    if (serviceIndex === -1) {
      return NextResponse.json(
        { error: `Service with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    // Update the service (in a real app, this would update a database record)
    const updatedService = {
      ...services[serviceIndex],
      ...data,
      id, // Ensure the ID doesn't change
    };
    
    services[serviceIndex] = updatedService;
    
    return NextResponse.json(updatedService);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  // Find the service to delete
  const serviceIndex = services.findIndex(s => s.id === id);
  
  if (serviceIndex === -1) {
    return NextResponse.json(
      { error: `Service with ID ${id} not found` },
      { status: 404 }
    );
  }
  
  // Remove the service from the array (in a real app, this would delete from a database)
  services.splice(serviceIndex, 1);
  
  return NextResponse.json(
    { message: `Service with ID ${id} deleted successfully` },
    { status: 200 }
  );
} 