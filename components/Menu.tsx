import Image from 'next/image';
import { Reveal } from './motion';
import { photo } from './Top';

interface Dish { name: string; img: string; alt: string; protein: number; price: number; meta: string }

const DISHES: readonly Dish[] = [
  { name: 'Tandoori chicken plate', img: 'tandoori.jpg', alt: 'Tandoori chicken', protein: 52, price: 195, meta: '9.8 g / 100 kcal · weighed raw' },
  { name: 'Chicken rice bowl', img: 'chicken-bowl.jpg', alt: 'Chicken rice bowl with chickpeas', protein: 56, price: 228, meta: '10.3 g / 100 kcal · weighed raw' },
  { name: 'Seer fish fry, millet', img: 'fish.jpg', alt: 'Seer fish fry', protein: 49, price: 253, meta: '11.2 g / 100 kcal · weighed raw' },
  { name: 'Paneer tikka wrap', img: 'paneer.jpg', alt: 'Paneer tikka', protein: 38, price: 185, meta: '6.1 g / 100 kcal · veg' },
  { name: 'Mutton pepper fry', img: 'mutton.jpg', alt: 'Mutton coconut fry', protein: 50, price: 265, meta: '8.4 g / 100 kcal · weighed raw' },
  { name: 'Masala egg wrap', img: 'omelette.jpg', alt: 'Masala omelette with parathas', protein: 26, price: 90, meta: '7.4 g / 100 kcal · egg' },
];

export default function Menu() {
  return (
    <div id="menu" className="section" style={{ paddingTop: 24, paddingBottom: 88 }}>
      <Reveal className="head">
        <span className="eyebrow">02 / TASTE FIRST</span>
        <h2 className="h2">High protein that tastes like dinner.</h2>
        <p className="lede">Char, masala, curry leaf. Every plate shows its protein, calories and price before you order, and you can change the grams.</p>
      </Reveal>
      <div className="grid-auto">
        {DISHES.map((d, i) => (
          <Reveal key={d.name} delay={0.05 + i * 0.07}>
            <a className="dish" href="#waitlist">
              <div className="ph"><Image src={photo(d.img)} alt={d.alt} width={600} height={420} /></div>
              <div className="bd">
                <b className="nm">{d.name}</b>
                <div className="line">
                  <span className="pr">{d.protein}<small> g protein</small></span>
                  <b className="price">₹{d.price}</b>
                </div>
                <span className="meta">{d.meta}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
