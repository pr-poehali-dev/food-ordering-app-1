import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const DeliveryInfo = () => {
  return (
    <>
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
    </>
  );
};

export default DeliveryInfo;
