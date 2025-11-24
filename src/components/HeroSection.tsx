import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
