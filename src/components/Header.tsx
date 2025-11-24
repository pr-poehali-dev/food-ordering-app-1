import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

interface HeaderProps {
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
}

const Header = ({ cart, updateQuantity, removeFromCart, getTotalPrice }: HeaderProps) => {
  return (
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
  );
};

export default Header;
