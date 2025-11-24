import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MenuGrid from '@/components/MenuGrid';
import DeliveryInfo from '@/components/DeliveryInfo';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Бургер Классик',
      description: 'Сочная котлета, свежие овощи, фирменный соус',
      price: 450,
      image: 'https://cdn.poehali.dev/projects/a19d42d3-a148-48ce-820c-d201338a8ad2/files/4499d042-61c2-4345-be02-2a4c3b04b06a.jpg',
      category: 'burgers',
      rating: 4.8,
      reviews: 124,
      discount: 15
    },
    {
      id: 2,
      name: 'Паста Карбонара',
      description: 'Классическая паста с беконом и сливочным соусом',
      price: 520,
      image: 'https://cdn.poehali.dev/projects/a19d42d3-a148-48ce-820c-d201338a8ad2/files/e6dda12a-1393-47a7-bc78-cba2177572c2.jpg',
      category: 'pasta',
      rating: 4.9,
      reviews: 98
    },
    {
      id: 3,
      name: 'Пицца Маргарита',
      description: 'Сыр моцарелла, томаты, свежий базилик',
      price: 680,
      image: 'https://cdn.poehali.dev/projects/a19d42d3-a148-48ce-820c-d201338a8ad2/files/8a3b6470-6e80-413c-a36d-3d9ae9b23a67.jpg',
      category: 'pizza',
      rating: 4.7,
      reviews: 156,
      discount: 20
    },
    {
      id: 4,
      name: 'Суши Сет',
      description: 'Разнообразный набор из 24 роллов',
      price: 890,
      image: 'https://cdn.poehali.dev/projects/a19d42d3-a148-48ce-820c-d201338a8ad2/files/4499d042-61c2-4345-be02-2a4c3b04b06a.jpg',
      category: 'sushi',
      rating: 4.9,
      reviews: 203
    },
    {
      id: 5,
      name: 'Салат Цезарь',
      description: 'Курица, салат романо, пармезан, сухарики',
      price: 380,
      image: 'https://cdn.poehali.dev/projects/a19d42d3-a148-48ce-820c-d201338a8ad2/files/e6dda12a-1393-47a7-bc78-cba2177572c2.jpg',
      category: 'salads',
      rating: 4.6,
      reviews: 87
    },
    {
      id: 6,
      name: 'Стейк Рибай',
      description: 'Мраморная говядина 300г с гарниром',
      price: 1250,
      image: 'https://cdn.poehali.dev/projects/a19d42d3-a148-48ce-820c-d201338a8ad2/files/4499d042-61c2-4345-be02-2a4c3b04b06a.jpg',
      category: 'meat',
      rating: 5.0,
      reviews: 67
    }
  ];

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discount 
        ? item.price * (1 - item.discount / 100) 
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        getTotalPrice={getTotalPrice} 
      />
      <HeroSection />
      <MenuGrid 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        filteredItems={filteredItems} 
        addToCart={addToCart} 
      />
      <DeliveryInfo />
    </div>
  );
};

export default Index;
