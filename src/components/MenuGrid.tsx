import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

interface MenuGridProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
}

const MenuGrid = ({ selectedCategory, setSelectedCategory, filteredItems, addToCart }: MenuGridProps) => {
  const categories = [
    { id: 'all', name: 'Все', icon: 'Grid3x3' },
    { id: 'burgers', name: 'Бургеры', icon: 'Beef' },
    { id: 'pizza', name: 'Пицца', icon: 'Pizza' },
    { id: 'pasta', name: 'Паста', icon: 'UtensilsCrossed' },
    { id: 'sushi', name: 'Суши', icon: 'Fish' },
    { id: 'salads', name: 'Салаты', icon: 'Salad' },
    { id: 'meat', name: 'Мясо', icon: 'Beef' }
  ];

  return (
    <>
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
    </>
  );
};

export default MenuGrid;
