import Image from 'next/image';

interface Food { name: string; photo: string; diet: 'veg' | 'nonveg' | 'egg'; protein: string; kcal: string; price: string }

const FOODS: readonly Food[] = [
  { name: 'Chicken breast', photo: '/menu/tandoori.jpg', diet: 'nonveg', protein: '22.5 g', kcal: '120', price: '₹25' },
  { name: 'Chicken thigh', photo: '/menu/chicken-bowl.jpg', diet: 'nonveg', protein: '19.7 g', kcal: '121', price: '₹22' },
  { name: 'Mutton boneless', photo: '/menu/mutton.jpg', diet: 'nonveg', protein: '20.6 g', kcal: '109', price: '₹45' },
  { name: 'Paneer tikka', photo: '/menu/paneer.jpg', diet: 'veg', protein: '18.1 g', kcal: '299', price: '₹30' },
  { name: 'Soya chunks chaat', photo: '/menu/chana.jpg', diet: 'veg', protein: '17.0 g', kcal: '108', price: '₹10' },
  { name: 'Eggs (bhurji)', photo: '/menu/omelette.jpg', diet: 'egg', protein: '6.3 g / egg', kcal: '72 / egg', price: '₹12 / egg' },
];

const LABEL = { veg: 'Vegetarian', nonveg: 'Non-vegetarian', egg: 'Contains egg' } as const;

export default function Menu() {
  return (
    <section id="menu" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <p className="eyebrow">The menu</p>
        <h2>Protein, priced per gram</h2>
        <p className="lede">Protein and energy per 100 g raw. Tap any item in the app for vitamins and minerals, with what each one does for you.</p>
        <div className="grid three" style={{ marginTop: 40 }}>
          {FOODS.map((f) => (
            <article className="card food" key={f.name}>
              <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${f.photo}`} alt={`${f.name}, cooked`} width={600} height={380} />
              <div className="body">
                <h3>
                  <span className={`vegdot ${f.diet}`} role="img" aria-label={LABEL[f.diet]} />
                  {f.name}
                </h3>
                <div className="meta">
                  <span><b>{f.protein}</b> protein</span>
                  <span>{f.kcal} kcal</span>
                  <span>{f.price} per 50 g raw</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="note">
          Menus differ by kitchen. Nutrition values are approximate and based on standard food-composition data. Cooking
          fee ₹25 and delivery ₹25 per order. Not medical advice.
        </p>
      </div>
    </section>
  );
}
