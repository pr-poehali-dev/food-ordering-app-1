import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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

  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3x3' },
    { id: 'burgers', name: 'Бургеры', icon: 'Beef' },
    { id: 'pizza', name: 'Пицца', icon: 'Pizza' },
    { id: 'pasta', name: 'Паста', icon: 'UtensilsCrossed' },
    { id: 'sushi', name: 'Суши', icon: 'Fish' },
    { id: 'salads', name: 'Салаты', icon: 'Salad' },
    { id: 'meat', name: 'Мясо', icon: 'Beef' }
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
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="UtensilsCrossed" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">FoodHub</h1>
                <p className="text-sm text-muted-foreground">Доставка за 30 минут</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Icon name="User" size={20} />
                    <span className="ml-2 hidden md:inline">Профиль</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Мой профиль</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={32} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Александр Иванов</p>
                        <p className="text-sm text-muted-foreground">alex@example.com</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-3">История заказов</h3>
                      <div className="space-y-2">
                        <Card className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Заказ #1234</p>
                              <p className="text-sm text-muted-foreground">2 блюда • 1 450 ₽</p>
                            </div>
                            <Badge className="bg-accent">Доставлен</Badge>
                          </div>
                        </Card>
                        <Card className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Заказ #1233</p>
                              <p className="text-sm text-muted-foreground">3 блюда • 2 100 ₽</p>
                            </div>
                            <Badge className="bg-accent">Доставлен</Badge>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="relative bg-primary hover:bg-primary/90">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {cart.length}
                      </span>
                    )}
                    <span className="ml-2 hidden md:inline">Корзина</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                          {cart.map(item => {
                            const itemPrice = item.discount 
                              ? item.price * (1 - item.discount / 100) 
                              : item.price;
                            return (
                              <Card key={item.id} className="p-3">
                                <div className="flex gap-3">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{itemPrice} ₽</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      >
                                        <Icon name="Minus" size={16} />
                                      </Button>
                                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      >
                                        <Icon name="Plus" size={16} />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        className="ml-auto text-destructive"
                                        onClick={() => removeFromCart(item.id)}
                                      >
                                        <Icon name="Trash2" size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">{getTotalPrice().toFixed(0)} ₽</span>
                          </div>
                          <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                            <Icon name="CreditCard" size={20} className="mr-2" />
                            Оформить заказ
                          </Button>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Доставка бесплатно при заказе от 500 ₽
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary via-secondary to-accent py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Вкусная еда с доставкой
            </h2>
            <p className="text-xl mb-6 text-white/90">
              Более 100 блюд от лучших ресторанов города. Быстрая доставка за 30 минут!
            </p>
            <div className="flex flex-wrap gap-4">
              <Card className="p-4 flex items-center gap-3 bg-white/10 backdrop-blur-sm border-white/20">
                <Icon name="Clock" size={24} className="text-white" />
                <div>
                  <p className="font-semibold">30 минут</p>
                  <p className="text-sm text-white/80">Быстрая доставка</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center gap-3 bg-white/10 backdrop-blur-sm border-white/20">
                <Icon name="Star" size={24} className="text-white" />
                <div>
                  <p className="font-semibold">4.8/5</p>
                  <p className="text-sm text-white/80">Средний рейтинг</p>
                </div>
              </Card>
              <Card className="p-4 flex items-center gap-3 bg-white/10 backdrop-blur-sm border-white/20">
                <Icon name="Percent" size={24} className="text-white" />
                <div>
                  <p className="font-semibold">Скидки</p>
                  <p className="text-sm text-white/80">До 20%</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sticky top-[73px] bg-background z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <Icon name={category.icon as any} size={18} />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card 
                key={item.id} 
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.discount && (
                    <Badge className="absolute top-3 right-3 bg-secondary text-white">
                      -{item.discount}%
                    </Badge>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-sm">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">({item.reviews})</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {item.discount ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {(item.price * (1 - item.discount / 100)).toFixed(0)} ₽
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {item.price} ₽
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                      )}
                    </div>
                    <Button 
                      onClick={() => addToCart(item)}
                      className="bg-accent hover:bg-accent/90"
                    >
                      <Icon name="Plus" size={20} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Информация о доставке</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Зона доставки</h3>
              <p className="text-muted-foreground">
                Доставляем по всему городу. Бесплатно при заказе от 500 ₽
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Время доставки</h3>
              <p className="text-muted-foreground">
                Среднее время доставки 30 минут. Работаем с 9:00 до 23:00
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Способы оплаты</h3>
              <p className="text-muted-foreground">
                Наличные, карта курьеру, онлайн-оплата
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="UtensilsCrossed" className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold">FoodHub</h3>
              </div>
              <p className="text-sm text-white/70">
                Вкусная еда с доставкой за 30 минут
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>+7 (999) 123-45-67</p>
                <p>info@foodhub.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Режим работы</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>Пн-Вс: 9:00 - 23:00</p>
                <p>Без выходных</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">
                  <Icon name="Facebook" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/50">
            © 2024 FoodHub. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
