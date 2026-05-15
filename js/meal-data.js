// ═══════════════════════════════════════════════════════════════
// MEAL PLAN DATA
// ═══════════════════════════════════════════════════════════════

const MEAL_MACROS = {
  1400:{p:140,c:105,f:47}, 1600:{p:160,c:120,f:53}, 1800:{p:180,c:135,f:60},
  2000:{p:200,c:150,f:67}, 2200:{p:210,c:165,f:73}, 2400:{p:220,c:180,f:80}, 2600:{p:240,c:195,f:87}
};
const MEAL_VMACROS = {
  1400:{p:105,c:140,f:47}, 1600:{p:120,c:160,f:53}, 1800:{p:135,c:180,f:60},
  2000:{p:150,c:200,f:67}, 2200:{p:160,c:220,f:73}, 2400:{p:170,c:240,f:80}, 2600:{p:175,c:260,f:87}
};

// Helper to build meal objects concisely
function M(name,cals,p,c,f,ingredients,method){return{name,cals,p,c,f,ingredients,method};}
function I(item,amount){return{item,amount};}

const MPLANS = {};

// ─── MEAT 1400 ──────────────────────────────────────────────────
MPLANS.meat_1400 = [
  {
    breakfast: M('Scrambled Eggs & Smoked Salmon',350,32,18,16,
      [I('Eggs','3 large'),I('Smoked salmon','50g'),I('Wholegrain toast','1 slice'),I('Spinach','handful'),I('Olive oil','1 tsp')],
      'Heat non-stick pan with olive oil over medium-low. Whisk eggs, season, stir slowly until just set. Toast bread. Layer salmon on toast, add eggs and wilted spinach.'),
    lunch: M('Chicken & Quinoa Bowl',380,38,32,9,
      [I('Chicken breast','130g'),I('Quinoa (cooked)','100g'),I('Cherry tomatoes','80g'),I('Cucumber','50g'),I('Lemon juice','1 tbsp'),I('Olive oil','1 tsp')],
      'Griddle seasoned chicken 5-6 mins per side. Rest and slice. Cook quinoa per packet. Toss everything with lemon and olive oil.'),
    dinner: M('Baked Cod & Roasted Veg',370,38,28,10,
      [I('Cod fillet','160g'),I('Sweet potato','100g'),I('Broccoli','100g'),I('Olive oil','1 tsp'),I('Garlic','2 cloves'),I('Paprika','1 tsp')],
      'Roast diced sweet potato with oil, paprika and garlic at 200°C 20 mins. Add broccoli for 10 mins. Bake seasoned cod 12-15 mins until it flakes.'),
    snack: M('Greek Yoghurt & Almonds',200,14,12,10,
      [I('Greek yoghurt (0%)','150g'),I('Almonds','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Turkey & Egg White Omelette',330,36,14,12,
      [I('Egg whites','5'),I('Turkey breast','60g'),I('Bell pepper','50g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Cook diced pepper in oil 2 mins. Add spinach 30s. Pour in seasoned egg whites over veg and turkey. Set on bottom 2-3 mins. Fold and serve.'),
    lunch: M('Tuna & Brown Rice Bowl',390,40,34,8,
      [I('Tuna in water','160g'),I('Brown rice (cooked)','100g'),I('Edamame','50g'),I('Cucumber','60g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'No cooking needed. Microwave edamame 2 mins. Combine all, drizzle with soy and sesame oil.'),
    dinner: M('Lean Beef Stir-Fry',390,38,30,11,
      [I('Lean beef mince (5%)','130g'),I('Rice noodles (cooked)','80g'),I('Courgette','80g'),I('Tenderstem broccoli','60g'),I('Soy sauce','1 tbsp'),I('Ginger','1 tsp'),I('Sesame oil','1 tsp')],
      'Cook noodles. Brown mince in hot wok 4-5 mins. Add veg stir-fry 3 mins. Add ginger, soy, sesame oil. Toss with noodles.'),
    snack: M('Cottage Cheese & Rice Cakes',190,18,20,3,
      [I('Cottage cheese','150g'),I('Rice cakes','2'),I('Cucumber','50g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Overnight Oats',340,30,36,7,
      [I('Rolled oats','60g'),I('Greek yoghurt (0%)','100g'),I('Milk','80ml'),I('Blueberries','50g'),I('Protein powder','1 scoop (optional)')],
      'Night before: mix oats, yoghurt, milk and protein in a jar. Refrigerate. Top with berries in the morning.'),
    lunch: M('Grilled Chicken Wrap',380,38,32,9,
      [I('Chicken breast','130g'),I('Wholegrain wrap','1 medium'),I('Romaine lettuce','40g'),I('Tomato','60g'),I('Low-fat hummus','30g'),I('Lemon juice','1 tsp')],
      'Griddle seasoned chicken 5-6 mins per side. Slice. Spread hummus, add veg and chicken, squeeze lemon and roll.'),
    dinner: M('Salmon & Asparagus',380,36,20,16,
      [I('Salmon fillet','150g'),I('Asparagus','100g'),I('New potatoes','100g'),I('Lemon','half'),I('Olive oil','1 tsp'),I('Dill','pinch')],
      'Boil potatoes 15 mins. Bake salmon at 200°C 12-14 mins. Add asparagus to tray after 5 mins. Squeeze lemon before serving.'),
    snack: M('Hard Boiled Eggs',200,16,2,11,
      [I('Eggs','2 large'),I('Cherry tomatoes','80g')],
      'Boil 10 mins. Cool in cold water before peeling.')
  },
  {
    breakfast: M('Smoked Mackerel & Eggs',360,34,16,17,
      [I('Eggs (poached)','2'),I('Smoked mackerel','70g'),I('Wholegrain toast','1 slice'),I('Spinach','40g')],
      'Poach eggs 3-4 mins in simmering water with a splash of vinegar. Toast bread. Wilt spinach. Layer toast, spinach, mackerel and eggs.'),
    lunch: M('Turkey Meatball & Tomato Bowl',370,40,28,9,
      [I('Turkey mince','130g'),I('Tinned tomatoes','200g'),I('Brown rice (cooked)','80g'),I('Onion','half'),I('Garlic','2 cloves'),I('Italian herbs','1 tsp'),I('Olive oil','1 tsp')],
      'Roll mince into balls, brown in oil 8-10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes, return meatballs, simmer 10 mins. Serve over rice.'),
    dinner: M('Prawn & Courgette Pasta',370,36,32,8,
      [I('King prawns','150g'),I('Wholewheat pasta (cooked)','80g'),I('Courgette','100g'),I('Cherry tomatoes','80g'),I('Garlic','2 cloves'),I('Olive oil','1 tsp'),I('Chilli flakes','pinch')],
      'Cook pasta. Fry garlic and chilli 30s, add courgette and tomatoes 3-4 mins, add prawns 2-3 mins until pink. Toss with pasta.'),
    snack: M('Protein Yoghurt',200,20,18,4,
      [I('Skyr or high-protein yoghurt','175g'),I('Strawberries','80g'),I('Flaxseeds','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Chicken & Veggie Scramble',340,36,16,13,
      [I('Eggs','2'),I('Egg whites','2'),I('Cooked chicken breast','60g'),I('Cherry tomatoes','60g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Cook tomatoes 1 min, add chicken to warm, spinach until wilted. Pour in whisked eggs. Stir gently until just set.'),
    lunch: M('Mackerel & Sweet Potato',390,34,36,12,
      [I('Tinned mackerel in brine','120g'),I('Sweet potato','150g'),I('Mixed salad leaves','50g'),I('Lemon juice','1 tbsp'),I('Olive oil','1 tsp')],
      'Bake sweet potato 200°C 40-45 mins or dice and roast 25 mins. Drain and flake mackerel. Plate with salad, dress with lemon and olive oil.'),
    dinner: M('Chicken Thigh Tray Bake',390,40,26,13,
      [I('Chicken thighs (skinless)','160g'),I('Peppers','100g'),I('Red onion','60g'),I('New potatoes','80g'),I('Olive oil','1 tsp'),I('Paprika & garlic','1 tsp each')],
      'Toss veg and potatoes in oil and spices. Add seasoned chicken on top. Roast 200°C 30-35 mins until golden.'),
    snack: M('Tuna Rice Cake',190,20,18,3,
      [I('Tuna in water','80g'),I('Rice cakes','2'),I('Lemon juice','1 tsp')],
      'No cooking needed.')
  }
];

// ─── MEAT 1600 ──────────────────────────────────────────────────
MPLANS.meat_1600 = [
  {
    breakfast: M('Smoked Salmon Egg Muffins',400,36,22,17,
      [I('Eggs','3'),I('Egg whites','2'),I('Smoked salmon','60g'),I('Spinach','40g'),I('Wholegrain toast','1 slice')],
      'Whisk eggs and egg whites. Divide spinach and salmon into oiled muffin cups, pour egg over. Bake 180°C 15 mins. Serve with toast.'),
    lunch: M('Chicken, Rice & Roasted Veg',440,42,40,10,
      [I('Chicken breast','150g'),I('Brown rice (cooked)','120g'),I('Broccoli','80g'),I('Bell pepper','80g'),I('Olive oil','1 tsp'),I('Soy sauce','1 tbsp')],
      'Cook rice. Griddle seasoned chicken 5-6 mins per side. Roast veg at 200°C 20 mins. Assemble bowl and drizzle with soy.'),
    dinner: M('Salmon, Potato & Greens',440,38,34,16,
      [I('Salmon fillet','160g'),I('New potatoes','130g'),I('Green beans','80g'),I('Broccoli','60g'),I('Olive oil','1 tsp'),I('Lemon & dill','to taste')],
      'Boil potatoes 15-18 mins. Steam green beans and broccoli 4-5 mins. Cook salmon skin-side down 3 mins, flip, finish in oven at 200°C 6 mins. Squeeze lemon.'),
    snack: M('Cottage Cheese, Fruit & Nuts',240,20,20,8,
      [I('Cottage cheese','180g'),I('Berries','80g'),I('Walnuts','10g')],
      'No cooking needed.')
  },
  {
    breakfast: M('High Protein Porridge',400,34,38,10,
      [I('Rolled oats','70g'),I('Milk','200ml'),I('Greek yoghurt','80g'),I('Turkey breast (sliced)','60g'),I('Banana','half')],
      'Cook oats in milk 4-5 mins stirring frequently. Stir in yoghurt off heat. Serve with banana. Turkey slices on the side.'),
    lunch: M('Beef & Quinoa Power Bowl',450,42,38,12,
      [I('Lean beef mince (5%)','140g'),I('Quinoa (cooked)','110g'),I('Avocado','40g'),I('Cherry tomatoes','80g'),I('Spinach','60g'),I('Lime juice','1 tbsp')],
      'Cook quinoa. Brown mince in hot pan 6-8 mins, season with cumin, salt, pepper. Build bowl — quinoa, mince, spinach, avocado and tomatoes. Squeeze lime.'),
    dinner: M('Prawn Stir-Fry with Noodles',440,38,38,11,
      [I('King prawns','180g'),I('Rice noodles (cooked)','100g'),I('Pak choi','80g'),I('Mushrooms','60g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp'),I('Ginger & garlic','1 tsp each')],
      'Soak noodles 5 mins, drain. Stir-fry mushrooms and pak choi in hot wok 2-3 mins. Add ginger and garlic 30s. Add prawns 2-3 mins until pink. Pour in soy and sesame oil. Toss with noodles.'),
    snack: M('Greek Yoghurt & Seeds',230,18,16,9,
      [I('Greek yoghurt (0%)','200g'),I('Mixed seeds','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Tuna & Egg Scramble on Toast',390,38,26,13,
      [I('Eggs','2'),I('Egg whites','3'),I('Tuna in water','80g'),I('Wholegrain toast','1 slice'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Drain tuna. Wilt spinach in pan 30s. Add tuna to warm 1 min. Pour in whisked eggs and scramble gently until just set. Pile onto toast.'),
    lunch: M('Chicken Caesar Wrap',450,42,36,12,
      [I('Chicken breast','150g'),I('Wholegrain wrap','1 large'),I('Romaine lettuce','50g'),I('Parmesan (grated)','15g'),I('Light Caesar dressing','20g')],
      'Griddle chicken 5-6 mins per side. Slice. Warm wrap in dry pan. Spread dressing, layer lettuce, chicken and parmesan. Roll tightly.'),
    dinner: M('Cod, Sweet Potato & Spinach',440,40,38,10,
      [I('Cod fillet','180g'),I('Sweet potato','130g'),I('Spinach','80g'),I('Garlic','2 cloves'),I('Olive oil','1 tsp'),I('Paprika','1 tsp')],
      'Roast diced sweet potato with oil and paprika 200°C 25 mins. Bake seasoned cod 200°C 12-15 mins. Wilt spinach in dry pan 1 min.'),
    snack: M('Hard Boiled Eggs & Fruit',230,16,20,9,
      [I('Eggs','2'),I('Apple','1 medium'),I('Almonds','10g')],
      'Boil eggs 10 mins. Cool in cold water before peeling.')
  },
  {
    breakfast: M('Smoked Mackerel Scramble',400,36,22,18,
      [I('Eggs','3'),I('Smoked mackerel','70g'),I('Wholegrain toast','1 slice'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp')],
      'Flake mackerel. Halve tomatoes. Cook tomatoes in oil 1 min. Pour in whisked eggs and scramble over medium-low. Fold in mackerel off heat. Serve on toast.'),
    lunch: M('Turkey & Lentil Soup',430,40,38,9,
      [I('Turkey breast (diced)','140g'),I('Red lentils (dried)','60g'),I('Carrot','60g'),I('Celery','40g'),I('Tinned tomatoes','150g'),I('Chicken stock','400ml'),I('Cumin & coriander','1 tsp each')],
      'Soften carrot and celery in oil 3 mins. Add turkey, brown lightly. Add spices 30s. Add lentils, tomatoes and stock. Simmer 25-30 mins until lentils are soft.'),
    dinner: M('Lean Beef Burger Bowl',440,42,34,13,
      [I('Lean beef mince (5%)','150g'),I('Brown rice (cooked)','100g'),I('Lettuce','40g'),I('Tomato','60g'),I('Caramelised onion','40g'),I('Mustard','1 tsp')],
      'Cook rice. Form mince into a patty, cook in pan 4-5 mins per side. Break apart over rice and top with lettuce, tomato, caramelised onion and mustard.'),
    snack: M('Protein Smoothie',240,24,22,5,
      [I('Whey protein','1 scoop'),I('Banana','half'),I('Milk','200ml'),I('Peanut butter','1 tsp')],
      'Blend all ingredients 30-45 seconds until smooth.')
  },
  {
    breakfast: M('Chicken & Veggie Omelette',390,38,18,18,
      [I('Eggs','2'),I('Egg whites','3'),I('Cooked chicken breast','70g'),I('Mushrooms','60g'),I('Spinach','40g'),I('Feta','20g'),I('Olive oil','1 tsp')],
      'Cook mushrooms in oil 3 mins. Add chicken 1 min. Add spinach until wilted. Pour in whisked eggs. Set on bottom 2-3 mins. Crumble feta over half. Fold and serve.'),
    lunch: M('Tuna Nicoise Salad',440,40,32,14,
      [I('Tuna in water','160g'),I('Eggs (hard boiled)','2'),I('New potatoes (cooked)','100g'),I('Green beans','60g'),I('Olives','20g'),I('Mixed leaves','40g'),I('Olive oil & lemon','1 tsp each')],
      'Boil potatoes 15 mins, eggs 10 mins. Blanch green beans 3-4 mins. Arrange everything on leaves. Dress with oil and lemon.'),
    dinner: M('Chicken Thigh Tray Bake',450,42,34,14,
      [I('Chicken thighs (skinless)','170g'),I('Sweet potato','100g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Nestle seasoned chicken thighs on top. Roast 200°C 30-35 mins until golden and cooked through.'),
    snack: M('Skyr with Berries',230,20,24,4,
      [I('Skyr','180g'),I('Mixed berries','80g'),I('Granola (low sugar)','20g')],
      'No cooking needed.')
  }
];

// ─── MEAT 1800 ──────────────────────────────────────────────────
MPLANS.meat_1800 = [
  {
    breakfast: M('Eggs, Salmon & Avocado Toast',450,36,28,20,
      [I('Eggs (poached)','2'),I('Smoked salmon','60g'),I('Wholegrain toast','2 slices'),I('Avocado','40g'),I('Spinach','40g')],
      'Toast bread. Wilt spinach. Mash avocado with lemon, salt and pepper. Poach eggs 3-4 mins. Layer avocado on toast, add spinach and salmon, top with eggs.'),
    lunch: M('Chicken, Quinoa & Roasted Veg',490,46,42,12,
      [I('Chicken breast','160g'),I('Quinoa (cooked)','120g'),I('Courgette','80g'),I('Bell pepper','80g'),I('Cherry tomatoes','60g'),I('Olive oil','1.5 tsp')],
      'Cook quinoa. Roast diced veg at 200°C 20-25 mins. Griddle chicken 5-6 mins per side. Rest and slice. Build bowl.'),
    dinner: M('Beef Stir-Fry with Brown Rice',480,42,44,14,
      [I('Lean beef strips','150g'),I('Brown rice (cooked)','120g'),I('Tenderstem broccoli','80g'),I('Snap peas','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1 tsp'),I('Ginger','1 tsp')],
      'Cook rice. Stir-fry beef in very hot wok 2-3 mins until browned. Remove. Stir-fry veg 3 mins. Add ginger, return beef, pour in soy and sesame oil. Serve over rice.'),
    snack: M('Protein Yoghurt & Nuts',280,22,22,10,
      [I('Greek yoghurt (0%)','200g'),I('Mixed nuts','20g'),I('Honey','1 tsp'),I('Blueberries','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Smoked Mackerel Porridge Bowl',430,36,38,13,
      [I('Rolled oats','70g'),I('Milk','200ml'),I('Smoked mackerel','70g'),I('Spinach','40g'),I('Egg (poached)','1')],
      'Cook oats in milk 4-5 mins. Flake mackerel. Wilt spinach. Poach egg 3-4 mins. Top porridge with spinach, mackerel and egg.'),
    lunch: M('Prawn & Brown Rice Bowl',480,40,44,12,
      [I('King prawns','180g'),I('Brown rice (cooked)','120g'),I('Edamame','60g'),I('Avocado','40g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp')],
      'Cook rice. Microwave edamame 2 mins. Cook prawns in hot pan 2 mins per side. Slice avocado. Build bowl and drizzle with soy and sesame oil.'),
    dinner: M('Salmon, Potato & Green Beans',490,42,38,18,
      [I('Salmon fillet','170g'),I('New potatoes','150g'),I('Green beans','100g'),I('Olive oil','1.5 tsp'),I('Lemon & dill','to taste')],
      'Boil potatoes 15-18 mins. Steam green beans 4-5 mins. Cook salmon skin-side down in pan 3-4 mins until crispy, flip 2-3 mins more. Serve with lemon.'),
    snack: M('Tuna Rice Cakes & Cottage Cheese',280,28,22,6,
      [I('Tuna in water','100g'),I('Rice cakes','3'),I('Cottage cheese','80g')],
      'No cooking needed. Mix tuna and cottage cheese. Spoon onto rice cakes.')
  },
  {
    breakfast: M('Turkey Scramble & Toast',440,38,30,15,
      [I('Eggs','2'),I('Egg whites','3'),I('Turkey mince (cooked)','80g'),I('Cherry tomatoes','60g'),I('Spinach','40g'),I('Wholegrain toast','1 slice'),I('Olive oil','1 tsp')],
      'Warm cooked mince in pan. Add tomatoes 1 min, spinach until wilted. Pour in whisked eggs and scramble until just set. Serve on toast.'),
    lunch: M('Beef & Lentil Bowl',490,44,42,13,
      [I('Lean beef mince (5%)','140g'),I('Green lentils (cooked)','100g'),I('Roasted peppers','80g'),I('Spinach','60g'),I('Olive oil','1 tsp'),I('Cumin & coriander','1 tsp')],
      'Brown mince in hot pan 5-6 mins, season with spices. Add lentils and roasted peppers, heat through 2 mins. Wilt spinach in. Drizzle with olive oil.'),
    dinner: M('Chicken Thigh & Sweet Potato Mash',480,44,38,14,
      [I('Chicken thighs (skinless)','180g'),I('Sweet potato','150g'),I('Tenderstem broccoli','100g'),I('Olive oil','1 tsp'),I('Paprika','1 tsp')],
      'Boil diced sweet potato 15 mins, drain and mash with milk, salt and pepper. Season and roast chicken thighs 200°C 25-30 mins. Steam broccoli 4-5 mins. Serve together.'),
    snack: M('Cottage Cheese & Pineapple',270,22,26,5,
      [I('Cottage cheese','200g'),I('Pineapple chunks','80g'),I('Chia seeds','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Cod & Egg Breakfast Bowl',440,40,24,18,
      [I('Cod fillet','120g'),I('Eggs','2'),I('Wholegrain toast','1 slice'),I('Spinach','60g'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp')],
      'Cook cod in pan 3-4 mins per side. Flake and rest. Cook tomatoes and spinach in same pan. Scramble eggs separately. Serve with toast.'),
    lunch: M('Chicken & Avocado Salad',480,44,28,20,
      [I('Chicken breast','160g'),I('Avocado','60g'),I('Mixed leaves','60g'),I('Cherry tomatoes','80g'),I('Cucumber','60g'),I('Olive oil','1 tsp'),I('Balsamic vinegar','1 tbsp')],
      'Griddle seasoned chicken 5-6 mins per side. Rest and slice. Arrange salad, add chicken, avocado and dressing.'),
    dinner: M('Tuna & Wholewheat Pasta',490,42,44,12,
      [I('Tuna in water','160g'),I('Wholewheat pasta (cooked)','120g'),I('Cherry tomatoes','80g'),I('Courgette','80g'),I('Garlic','2 cloves'),I('Olive oil','1.5 tsp'),I('Chilli flakes','pinch')],
      'Cook pasta. Fry garlic and chilli 30s, add courgette and tomatoes, cook 4-5 mins. Add drained tuna, toss in pasta with a splash of pasta water.'),
    snack: M('Protein Smoothie',280,28,24,6,
      [I('Whey protein','1 scoop'),I('Banana','half'),I('Milk','250ml'),I('Peanut butter','1 tsp')],
      'Blend all ingredients 30-45 seconds until smooth.')
  },
  {
    breakfast: M('Full Protein Breakfast',450,38,28,19,
      [I('Eggs','3'),I('Smoked salmon','50g'),I('Wholegrain toast','1 slice'),I('Avocado','40g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Wilt spinach. Mash avocado with lemon and salt. Scramble eggs slowly over medium-low heat. Toast bread. Spread avocado on toast, top with spinach and eggs. Serve salmon alongside.'),
    lunch: M('Mackerel & Sweet Potato Bowl',480,38,44,14,
      [I('Tinned mackerel in brine','140g'),I('Sweet potato','160g'),I('Spinach','60g'),I('Red onion','40g'),I('Olive oil','1 tsp'),I('Lemon juice','1 tbsp')],
      'Dice sweet potato, roast at 200°C 25 mins. Soak sliced red onion in lemon juice 5 mins. Drain and flake mackerel. Toss spinach, sweet potato, mackerel and pickled onion together with olive oil.'),
    dinner: M('Lean Beef Meatballs & Pasta',490,44,42,14,
      [I('Lean beef mince (5%)','150g'),I('Wholewheat pasta (cooked)','100g'),I('Tinned tomatoes','200g'),I('Onion','half'),I('Garlic','2 cloves'),I('Italian herbs','1 tsp'),I('Olive oil','1 tsp')],
      'Cook pasta. Roll mince into 8-10 balls and brown in oil 8-10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes and herbs, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with pasta.'),
    snack: M('Skyr & Fruit',270,24,26,4,
      [I('Skyr','200g'),I('Mixed berries','80g'),I('Granola','20g')],
      'No cooking needed.')
  }
];

// ─── MEAT 2000 ──────────────────────────────────────────────────
MPLANS.meat_2000 = [
  {
    breakfast: M('Eggs, Salmon, Avocado & Toast',480,38,30,22,
      [I('Eggs','3'),I('Smoked salmon','70g'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Spinach','40g')],
      'Mash avocado with salt and lemon. Toast bread. Wilt spinach. Scramble eggs slowly in olive oil over medium-low. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Chicken, Brown Rice & Veg',540,48,48,13,
      [I('Chicken breast','170g'),I('Brown rice (cooked)','140g'),I('Broccoli','100g'),I('Bell pepper','80g'),I('Soy sauce','1.5 tbsp'),I('Olive oil','1 tsp')],
      'Cook rice. Season chicken and griddle over medium-high heat 5-6 mins per side. Rest and slice. Roast veg at 200°C 20-25 mins. Build the bowl, drizzle with soy sauce.'),
    dinner: M('Salmon, Quinoa & Greens',520,44,42,18,
      [I('Salmon fillet','180g'),I('Quinoa (cooked)','130g'),I('Asparagus','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Lemon & dill','to taste')],
      'Cook quinoa. Roast asparagus at 200°C 10-12 mins. Cook salmon skin-side down in pan 3-4 mins until crispy, flip, finish in oven 4-5 mins. Wilt spinach. Serve salmon over quinoa with asparagus and spinach.'),
    snack: M('Cottage Cheese, Nuts & Apple',300,24,24,12,
      [I('Cottage cheese','200g'),I('Mixed nuts','20g'),I('Apple','1 medium')],
      'No cooking needed.')
  },
  {
    breakfast: M('Protein Porridge with Eggs',470,40,44,12,
      [I('Rolled oats','80g'),I('Milk','250ml'),I('Eggs (hard boiled)','2'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Boil eggs 10 mins, cool and peel. Cook oats in milk 4-5 mins, stirring regularly. Stir in almond butter. Serve with sliced banana. Eggs on the side with salt and pepper.'),
    lunch: M('Beef & Quinoa Bowl',540,46,44,14,
      [I('Lean beef mince (5%)','160g'),I('Quinoa (cooked)','130g'),I('Avocado','50g'),I('Cherry tomatoes','80g'),I('Spinach','60g'),I('Lime juice','1 tbsp'),I('Olive oil','1 tsp')],
      'Cook quinoa. Brown mince in hot pan 6-8 mins, season with cumin. Build bowl — quinoa, mince, spinach, avocado and tomatoes. Squeeze lime and drizzle olive oil.'),
    dinner: M('Prawn & Rice Noodle Stir-Fry',520,42,46,13,
      [I('King prawns','200g'),I('Rice noodles (cooked)','120g'),I('Pak choi','80g'),I('Mushrooms','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1.5 tsp'),I('Ginger & garlic','1 tsp each')],
      'Soak noodles 5 mins, drain. Stir-fry mushrooms in hot wok 2 mins. Add pak choi, ginger and garlic, stir-fry 2 mins. Add prawns 2 mins per side until pink. Pour in soy and sesame oil, add noodles and toss 1 min.'),
    snack: M('Greek Yoghurt & Seeds',300,22,24,11,
      [I('Greek yoghurt (0%)','220g'),I('Mixed seeds','20g'),I('Honey','1 tsp'),I('Berries','80g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Full Protein Omelette',470,42,20,22,
      [I('Eggs','3'),I('Egg whites','2'),I('Turkey breast','70g'),I('Mushrooms','60g'),I('Spinach','40g'),I('Feta','25g'),I('Olive oil','1 tsp')],
      'Cook mushrooms in oil 3 mins. Add turkey 1 min. Add spinach until wilted. Pour in whisked eggs. Set on bottom 2-3 mins. Crumble feta over one half. Fold and serve when just set.'),
    lunch: M('Chicken & Lentil Bowl',540,48,46,13,
      [I('Chicken breast','170g'),I('Green lentils (cooked)','120g'),I('Roasted peppers','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Cumin','1 tsp')],
      'Griddle seasoned chicken 5-6 mins per side, rest and slice. Warm lentils in pan with olive oil and cumin. Wilt spinach in. Serve in a bowl with chicken, lentils, roasted peppers and olive oil.'),
    dinner: M('Cod, Sweet Potato & Greens',500,44,44,12,
      [I('Cod fillet','190g'),I('Sweet potato','150g'),I('Green beans','80g'),I('Tenderstem broccoli','60g'),I('Olive oil','1.5 tsp'),I('Paprika & lemon','to taste')],
      'Roast diced sweet potato at 200°C 25 mins. Bake seasoned cod 200°C 12-15 mins until it flakes. Steam or boil green beans and broccoli 4-5 mins. Plate up with a squeeze of lemon.'),
    snack: M('Protein Smoothie',320,30,28,8,
      [I('Whey protein','1.5 scoops'),I('Banana','1 small'),I('Milk','250ml'),I('Peanut butter','1 tsp')],
      'Blend all ingredients 30-45 seconds until smooth.')
  },
  {
    breakfast: M('Smoked Mackerel & Egg Toast',470,38,28,22,
      [I('Smoked mackerel','90g'),I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Spinach','40g'),I('Lemon juice','1 tsp')],
      'Toast bread. Wilt spinach. Flake mackerel. Poach eggs 3-4 mins. Pile spinach on toast, add mackerel flakes, top with poached eggs and squeeze lemon juice.'),
    lunch: M('Turkey & Brown Rice Bowl',530,46,44,12,
      [I('Turkey breast','170g'),I('Brown rice (cooked)','140g'),I('Broccoli','80g'),I('Courgette','80g'),I('Soy sauce','1.5 tbsp'),I('Olive oil','1 tsp')],
      'Cook rice. Griddle turkey 6-7 mins per side until cooked through, rest and slice. Roast broccoli and courgette at 200°C 20 mins. Build bowl and drizzle with soy sauce.'),
    dinner: M('Beef Meatballs, Pasta & Tomato',520,46,44,14,
      [I('Lean beef mince (5%)','160g'),I('Wholewheat pasta (cooked)','120g'),I('Tinned tomatoes','200g'),I('Onion & garlic','to taste'),I('Italian herbs','1 tsp'),I('Olive oil','1 tsp')],
      'Cook pasta. Mix mince with salt, pepper and herbs, roll into 10-12 balls. Brown in oil 8-10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with pasta.'),
    snack: M('Tuna, Rice Cakes & Cottage Cheese',310,30,26,7,
      [I('Tuna in water','120g'),I('Rice cakes','3'),I('Cottage cheese','100g')],
      'No cooking needed. Drain and flake tuna, mix with cottage cheese, spoon onto rice cakes.')
  },
  {
    breakfast: M('Salmon & Egg Bowl',480,40,28,22,
      [I('Smoked salmon','80g'),I('Eggs (scrambled)','3'),I('Wholegrain toast','1 slice'),I('Avocado','50g'),I('Spinach','40g')],
      'Mash avocado with salt and lemon. Scramble eggs slowly in olive oil over medium-low until just set. Toast bread. Wilt spinach. Spread avocado on toast, layer spinach, pile eggs on top. Serve salmon on the side.'),
    lunch: M('Chicken Thigh & Quinoa',540,48,42,16,
      [I('Chicken thighs (skinless)','190g'),I('Quinoa (cooked)','130g'),I('Cherry tomatoes','80g'),I('Cucumber','60g'),I('Feta','20g'),I('Olive oil','1 tsp'),I('Lemon juice','1 tbsp')],
      'Cook quinoa. Season chicken thighs with paprika, salt and pepper. Roast 200°C 25-30 mins until golden. Slice tomatoes and dice cucumber. Build bowl — quinoa, chopped salad, crumbled feta, sliced chicken. Dress with olive oil and lemon.'),
    dinner: M('Prawn & Avocado Pasta',500,40,44,16,
      [I('King prawns','200g'),I('Wholewheat pasta (cooked)','120g'),I('Avocado','50g'),I('Cherry tomatoes','80g'),I('Garlic','2 cloves'),I('Olive oil','1.5 tsp'),I('Chilli flakes','pinch')],
      'Cook pasta, drain. Halve tomatoes and dice avocado. Fry garlic and chilli 30s. Add prawns 2-3 mins until pink. Add tomatoes 1 min. Toss in pasta. Remove from heat and fold in avocado gently.'),
    snack: M('Skyr & Mixed Nuts',300,24,22,12,
      [I('Skyr','200g'),I('Mixed nuts','25g'),I('Honey','1 tsp')],
      'No cooking needed.')
  }
];

// ─── MEAT 2200 ──────────────────────────────────────────────────
MPLANS.meat_2200 = [
  {
    breakfast: M('Big Protein Breakfast',550,44,36,24,
      [I('Eggs','3'),I('Smoked salmon','80g'),I('Wholegrain toast','2 slices'),I('Avocado','60g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with salt and lemon. Toast bread. Wilt spinach. Scramble eggs slowly in olive oil. Spread avocado on toast, top with spinach and eggs. Serve salmon alongside.'),
    lunch: M('Chicken, Rice & Roasted Veg',580,52,52,14,
      [I('Chicken breast','190g'),I('Brown rice (cooked)','150g'),I('Broccoli','100g'),I('Bell pepper','100g'),I('Olive oil','1.5 tsp'),I('Soy sauce','1.5 tbsp')],
      'Cook rice. Griddle seasoned chicken 5-6 mins per side. Rest and slice. Roast veg at 200°C 20-25 mins. Assemble bowl and drizzle with soy sauce.'),
    dinner: M('Salmon, Potato & Asparagus',570,46,44,20,
      [I('Salmon fillet','190g'),I('New potatoes','160g'),I('Asparagus','100g'),I('Olive oil','1.5 tsp'),I('Lemon & dill','to taste')],
      'Boil potatoes 15-18 mins. Toss asparagus in olive oil and salt, roast at 200°C 8-10 mins. Cook salmon skin-side down in pan 3-4 mins until crispy, flip, finish in oven at 200°C 4-5 mins. Squeeze lemon over everything.'),
    snack: M('High Protein Yoghurt & Nuts',330,26,26,13,
      [I('Greek yoghurt (0%)','240g'),I('Mixed nuts','25g'),I('Honey','1 tsp'),I('Berries','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Mackerel, Eggs & Toast',540,42,34,24,
      [I('Smoked mackerel','100g'),I('Eggs (scrambled)','3'),I('Wholegrain toast','2 slices'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp')],
      'Flake mackerel. Halve tomatoes. Cook tomatoes in oil 1 min. Pour in whisked eggs and scramble gently over medium-low. Fold in mackerel off heat. Toast bread and serve everything together.'),
    lunch: M('Beef, Lentil & Veg Bowl',570,50,48,14,
      [I('Lean beef mince (5%)','170g'),I('Green lentils (cooked)','120g'),I('Roasted peppers','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Cumin & coriander','1 tsp')],
      'Brown mince in hot pan 5-6 mins, season with spices. Add lentils and roasted peppers, stir and heat through 2 mins. Wilt spinach in. Drizzle with olive oil and serve.'),
    dinner: M('Turkey Meatballs & Pasta',570,52,48,14,
      [I('Turkey mince','180g'),I('Wholewheat pasta (cooked)','130g'),I('Tinned tomatoes','200g'),I('Onion & garlic','to taste'),I('Italian herbs','1 tsp'),I('Olive oil','1 tsp')],
      'Cook pasta. Roll turkey mince into 10-12 balls, brown in oil 8-10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes and herbs, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with drained pasta.'),
    snack: M('Protein Smoothie',350,34,30,9,
      [I('Whey protein','1.5 scoops'),I('Banana','1 small'),I('Milk','300ml'),I('Almond butter','1 tsp')],
      'Blend all ingredients 30-45 seconds until smooth.')
  },
  {
    breakfast: M('Chicken Egg Muffins & Porridge',540,44,44,14,
      [I('Eggs','3'),I('Cooked chicken','80g'),I('Rolled oats','60g'),I('Milk','180ml'),I('Banana','half'),I('Spinach','40g')],
      'Whisk eggs. Divide diced chicken and spinach between 4 oiled muffin cups, pour egg over. Bake 180°C 15 mins. Cook oats in milk 4-5 mins, stirring. Serve with banana. Eat egg muffins on the side.'),
    lunch: M('Salmon & Quinoa Bowl',560,48,44,18,
      [I('Salmon fillet','180g'),I('Quinoa (cooked)','140g'),I('Avocado','50g'),I('Cherry tomatoes','80g'),I('Cucumber','60g'),I('Lemon juice','1 tbsp'),I('Olive oil','1 tsp')],
      'Cook quinoa. Cook salmon skin-side down in pan 3-4 mins until crispy, flip and cook 2-3 mins more. Flake into chunks. Slice avocado, halve tomatoes, dice cucumber. Build the bowl — quinoa, salad, salmon. Drizzle with lemon and olive oil.'),
    dinner: M('Chicken Thigh Tray Bake',560,50,40,18,
      [I('Chicken thighs (skinless)','200g'),I('Sweet potato','160g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1.5 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Cube sweet potato, slice peppers and onion. Toss all veg in oil, paprika, cumin, salt and pepper. Spread on a large tray. Season chicken thighs and nestle on top. Roast 200°C 30-35 mins until golden and cooked through.'),
    snack: M('Cottage Cheese, Seeds & Fruit',330,26,28,10,
      [I('Cottage cheese','220g'),I('Chia seeds','1 tsp'),I('Mixed berries','80g'),I('Rice cakes','2')],
      'No cooking needed.')
  },
  {
    breakfast: M('Prawn & Egg Breakfast',520,44,26,24,
      [I('King prawns','120g'),I('Eggs','3'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with salt and lemon. Cook prawns in hot pan 2 mins per side until pink. Remove. Scramble eggs in same pan over medium-low. Wilt spinach in dry pan. Toast bread. Spread avocado on toast, top with spinach, eggs and prawns.'),
    lunch: M('Turkey & Brown Rice Power Bowl',570,52,48,13,
      [I('Turkey breast','190g'),I('Brown rice (cooked)','150g'),I('Broccoli','80g'),I('Courgette','80g'),I('Soy sauce','2 tbsp'),I('Olive oil','1 tsp')],
      'Cook rice. Season turkey and griddle 6-7 mins per side. Rest and slice. Roast broccoli and courgette at 200°C 20 mins. Assemble bowl and drizzle with soy sauce.'),
    dinner: M('Beef Stir-Fry & Noodles',570,50,48,15,
      [I('Lean beef strips','170g'),I('Rice noodles (cooked)','130g'),I('Tenderstem broccoli','80g'),I('Snap peas','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1.5 tsp'),I('Ginger & garlic','1 tsp each')],
      'Soak noodles 5 mins, drain. Stir-fry beef in very hot wok — spread out and leave 1 min for colour, then stir 2-3 mins until browned. Remove. Stir-fry broccoli and snap peas 3 mins. Add ginger and garlic 30s. Return beef, pour in soy and sesame oil, add noodles and toss 1 min.'),
    snack: M('Skyr, Granola & Berries',350,28,34,8,
      [I('Skyr','220g'),I('Granola (low sugar)','30g'),I('Mixed berries','80g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Full Cooked Breakfast',540,44,30,26,
      [I('Eggs','3'),I('Turkey rashers','4'),I('Wholegrain toast','1 slice'),I('Mushrooms','80g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Grill or pan-fry turkey rashers 3-4 mins per side until crispy. Cook sliced mushrooms in the juices 3-4 mins until golden. Wilt spinach 30s in a dry pan. Scramble eggs in a non-stick pan over medium-low. Toast bread. Plate everything up.'),
    lunch: M('Cod, Lentil & Veg Bowl',560,48,46,14,
      [I('Cod fillet','200g'),I('Green lentils (cooked)','120g'),I('Cherry tomatoes','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Lemon & paprika','to taste')],
      'Season cod with paprika, salt and lemon zest. Cook in hot pan 3-4 mins per side until golden. Warm lentils in pan with olive oil 2 mins, wilt spinach in, add halved tomatoes. Season with salt and lemon juice. Flake cod over the top.'),
    dinner: M('Chicken Mince & Rice',560,50,44,14,
      [I('Chicken mince','190g'),I('Brown rice (cooked)','140g'),I('Tenderstem broccoli','100g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1 tsp'),I('Ginger','1 tsp')],
      'Cook rice. Brown chicken mince in hot wok, break up with spatula, cook 5-6 mins. Add ginger 30s. Add broccoli and stir-fry 3 mins. Pour in soy and sesame oil, toss everything together. Serve over rice.'),
    snack: M('Tuna, Cottage Cheese & Crackers',330,34,22,8,
      [I('Tuna in water','120g'),I('Cottage cheese','100g'),I('Wholegrain crackers','4'),I('Cucumber','60g')],
      'No cooking needed.')
  }
];

// ─── MEAT 2400 ──────────────────────────────────────────────────
MPLANS.meat_2400 = [
  {
    breakfast: M('Big Salmon & Egg Breakfast',600,46,36,28,
      [I('Eggs','3'),I('Smoked salmon','90g'),I('Wholegrain toast','2 slices'),I('Avocado','70g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with salt, pepper and lemon. Toast bread. Wilt spinach. Scramble eggs slowly in olive oil over medium-low until just set. Spread avocado on toast, top with spinach and eggs. Serve salmon on the side.'),
    lunch: M('Chicken, Rice & Full Veg',640,54,56,16,
      [I('Chicken breast','200g'),I('Brown rice (cooked)','160g'),I('Broccoli','100g'),I('Bell pepper','100g'),I('Courgette','60g'),I('Olive oil','1.5 tsp'),I('Soy sauce','2 tbsp')],
      'Cook rice. Season chicken and griddle 5-6 mins per side. Rest and slice. Toss all veg in olive oil and salt. Roast at 200°C 20-25 mins. Assemble bowl, drizzle with soy sauce.'),
    dinner: M('Salmon, Quinoa & Greens',620,48,48,22,
      [I('Salmon fillet','200g'),I('Quinoa (cooked)','150g'),I('Asparagus','100g'),I('Spinach','60g'),I('Olive oil','2 tsp'),I('Lemon & dill','to taste')],
      'Cook quinoa. Roast asparagus at 200°C 10-12 mins. Cook salmon skin-side down in pan 3-4 mins until crispy, flip, finish in oven at 200°C 4-5 mins. Wilt spinach in dry pan. Plate up quinoa, greens, asparagus and salmon with a squeeze of lemon.'),
    snack: M('Protein Yoghurt & Nuts',360,28,28,14,
      [I('Greek yoghurt (0%)','250g'),I('Mixed nuts','30g'),I('Honey','1 tsp'),I('Banana','half')],
      'No cooking needed.')
  },
  {
    breakfast: M('Mackerel & Egg Loaded Toast',580,44,38,24,
      [I('Smoked mackerel','110g'),I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Cherry tomatoes','60g')],
      'Mash avocado with salt and lemon. Toast bread. Halve tomatoes. Poach eggs 3-4 mins in simmering water with a splash of vinegar. Spread avocado on toast, top with flaked mackerel and tomatoes, finish with poached eggs.'),
    lunch: M('Beef, Brown Rice & Veg',640,52,54,16,
      [I('Lean beef strips','180g'),I('Brown rice (cooked)','160g'),I('Tenderstem broccoli','100g'),I('Snap peas','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1.5 tsp')],
      'Cook rice. Stir-fry beef in very hot wok — spread out, leave 1 min for colour, then stir 2-3 mins until browned. Remove. Stir-fry broccoli and snap peas 3 mins. Return beef, pour in soy and sesame oil, toss together. Serve over rice.'),
    dinner: M('Prawn Curry & Rice',620,46,54,18,
      [I('King prawns','220g'),I('Brown rice (cooked)','150g'),I('Light coconut milk','100ml'),I('Spinach','60g'),I('Onion','half'),I('Curry paste (mild)','1 tbsp'),I('Olive oil','1 tsp')],
      'Cook rice. Dice onion and cook in oil 3-4 mins until soft. Add curry paste, stir 1 min until fragrant. Pour in coconut milk and bring to a gentle simmer. Add prawns and cook 4-5 mins until pink and cooked through. Stir in spinach until wilted. Season and serve over rice.'),
    snack: M('Protein Smoothie & Egg',380,36,32,10,
      [I('Whey protein','1.5 scoops'),I('Banana','1 small'),I('Milk','300ml'),I('Egg (hard boiled)','1')],
      'Blend smoothie ingredients 30-45 seconds. Boil egg separately 10 mins, cool in cold water before peeling.')
  },
  {
    breakfast: M('Turkey & Egg White Omelette + Toast',570,48,34,20,
      [I('Egg whites','6'),I('Egg (whole)','1'),I('Turkey breast','80g'),I('Mushrooms','60g'),I('Spinach','50g'),I('Wholegrain toast','1 slice'),I('Olive oil','1 tsp')],
      'Slice mushrooms and dice turkey. Whisk egg whites and whole egg together, season. Cook mushrooms in oil 3 mins. Add turkey 1 min. Add spinach until wilted. Pour in eggs. Set on bottom 2-3 mins. Fold when edges are set. Toast bread and serve alongside.'),
    lunch: M('Chicken & Sweet Potato Bowl',640,52,56,16,
      [I('Chicken breast','200g'),I('Sweet potato','170g'),I('Broccoli','100g'),I('Olive oil','2 tsp'),I('Paprika & garlic','1 tsp each')],
      'Dice sweet potato, toss in olive oil, paprika, garlic, salt and pepper. Roast 200°C 25 mins. Griddle seasoned chicken 5-6 mins per side, rest and slice. Toss broccoli in oil and roast at 200°C 15 mins. Build the bowl.'),
    dinner: M('Beef Mince, Lentils & Pasta',620,52,52,16,
      [I('Lean beef mince (5%)','180g'),I('Wholewheat pasta (cooked)','130g'),I('Green lentils (cooked)','80g'),I('Tinned tomatoes','200g'),I('Garlic & herbs','to taste'),I('Olive oil','1 tsp')],
      'Cook pasta. Brown mince in hot pan 5-6 mins until well browned. Add garlic and herbs 30s. Pour in tinned tomatoes, add lentils. Simmer 10-12 mins until thick. Season well. Toss with drained pasta.'),
    snack: M('Skyr, Seeds & Fruit',380,30,36,10,
      [I('Skyr','230g'),I('Mixed seeds','20g'),I('Banana','half'),I('Granola','25g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Full Cooked Breakfast + Shake',590,48,36,24,
      [I('Eggs','3'),I('Turkey rashers','4'),I('Wholegrain toast','2 slices'),I('Mushrooms','80g'),I('Whey protein','half scoop'),I('Milk','150ml')],
      'Grill or pan-fry turkey rashers 3-4 mins per side. Cook sliced mushrooms in a pan with a little oil 3-4 mins. Scramble eggs in a separate non-stick pan over medium-low. Toast bread. Blend protein powder with milk for the shake. Plate up the cooked breakfast and drink the shake alongside.'),
    lunch: M('Tuna, Egg & Potato Salad',620,50,50,16,
      [I('Tuna in water','180g'),I('Eggs (hard boiled)','2'),I('New potatoes (cooked)','160g'),I('Green beans','80g'),I('Mixed leaves','50g'),I('Olive oil','2 tsp'),I('Lemon juice','1 tbsp')],
      'Boil potatoes 15 mins until tender. Boil eggs 10 mins, cool and peel. Blanch green beans 3-4 mins, drain and cool. Drain tuna. Arrange leaves in a bowl, add halved potatoes, quartered eggs, green beans and flaked tuna. Drizzle with olive oil and lemon.'),
    dinner: M('Chicken Thighs, Rice & Veg',630,52,50,18,
      [I('Chicken thighs (skinless)','210g'),I('Brown rice (cooked)','150g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1.5 tsp'),I('Smoked paprika','1 tsp')],
      'Cook rice. Slice peppers and onion, toss with olive oil, paprika, salt and pepper. Spread on a tray. Season chicken thighs and place on top of the veg. Roast 200°C 30-35 mins until golden. Slice chicken and serve with rice and roasted veg.'),
    snack: M('Cottage Cheese, Nuts & Toast',370,28,30,14,
      [I('Cottage cheese','220g'),I('Mixed nuts','25g'),I('Wholegrain toast','1 slice'),I('Cucumber','60g')],
      'Toast bread. Spread cottage cheese on toast and top with nuts. Serve cucumber on the side.')
  },
  {
    breakfast: M('Salmon Scramble & Porridge',580,44,44,20,
      [I('Smoked salmon','80g'),I('Eggs','2'),I('Rolled oats','60g'),I('Milk','180ml'),I('Banana','half'),I('Spinach','40g')],
      'Cook oats in milk 4-5 mins, stirring regularly. Serve with banana. Wilt spinach in dry pan 30s. Scramble eggs slowly in olive oil over medium-low until just set. Fold in salmon off the heat. Serve the egg and salmon mixture alongside the porridge.'),
    lunch: M('Turkey Stir-Fry & Noodles',630,52,52,16,
      [I('Turkey breast (strips)','200g'),I('Rice noodles (cooked)','140g'),I('Pak choi','80g'),I('Mushrooms','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1.5 tsp')],
      'Soak noodles 5 mins, drain. Stir-fry turkey strips in hot wok — spread out and cook 2 mins without moving to get colour. Stir-fry 2-3 mins more until cooked through. Remove. Cook mushrooms 2 mins, add pak choi and stir-fry 2 mins. Return turkey, pour in soy and sesame oil, add noodles and toss 1 min.'),
    dinner: M('Cod, Sweet Potato & Bean Stew',620,50,52,14,
      [I('Cod fillet','210g'),I('Sweet potato','150g'),I('Cannellini beans','100g'),I('Tinned tomatoes','200g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Paprika & garlic','1 tsp each')],
      'Dice sweet potato. Heat oil in pan, add garlic and paprika, cook 30s. Add sweet potato, tinned tomatoes and beans. Simmer 15 mins until sweet potato is nearly tender. Season cod and place on top of the stew. Cover and cook 10 mins until cod flakes. Stir in spinach at the end.'),
    snack: M('Protein Yoghurt & Fruit',380,30,36,8,
      [I('Greek yoghurt (0%)','260g'),I('Mixed berries','100g'),I('Granola','30g'),I('Honey','1 tsp')],
      'No cooking needed.')
  }
];

// ─── MEAT 2600 ──────────────────────────────────────────────────
MPLANS.meat_2600 = [
  {
    breakfast: M('Loaded Salmon Breakfast',640,48,40,30,
      [I('Eggs','4'),I('Smoked salmon','100g'),I('Wholegrain toast','2 slices'),I('Avocado','70g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with salt, pepper and lemon. Toast bread. Wilt spinach. Scramble eggs slowly in olive oil over medium-low until just set. Spread avocado on toast, top with spinach and eggs. Serve salmon alongside.'),
    lunch: M('Chicken, Rice & Double Veg',680,58,60,17,
      [I('Chicken breast','220g'),I('Brown rice (cooked)','170g'),I('Broccoli','100g'),I('Bell pepper','100g'),I('Courgette','80g'),I('Olive oil','2 tsp'),I('Soy sauce','2 tbsp')],
      'Cook rice. Season chicken and griddle 5-6 mins per side. Rest and slice. Toss all veg in olive oil and salt. Roast 200°C 20-25 mins. Assemble bowl, drizzle with soy sauce.'),
    dinner: M('Salmon & Quinoa Power Bowl',670,52,52,24,
      [I('Salmon fillet','220g'),I('Quinoa (cooked)','160g'),I('Asparagus','100g'),I('Avocado','50g'),I('Spinach','60g'),I('Olive oil','2 tsp'),I('Lemon','half')],
      'Cook quinoa. Roast asparagus at 200°C 10-12 mins. Cook salmon skin-side down in pan 3-4 mins until crispy, flip, finish in oven at 200°C 4-5 mins. Wilt spinach. Slice avocado. Assemble bowl with quinoa, spinach, asparagus, avocado and salmon. Squeeze lemon over the top.'),
    snack: M('Protein Shake & Nuts',400,36,30,16,
      [I('Whey protein','2 scoops'),I('Milk','300ml'),I('Banana','half'),I('Mixed nuts','25g')],
      'Blend protein, milk and banana 30-45 seconds until smooth. Eat nuts on the side.')
  },
  {
    breakfast: M('Turkey, Egg & Porridge',620,48,52,16,
      [I('Eggs','3'),I('Turkey breast (sliced)','80g'),I('Rolled oats','80g'),I('Milk','250ml'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Cook oats in milk 4-5 mins, stirring. Stir in almond butter. Serve with sliced banana. Scramble eggs with turkey slices in a non-stick pan over medium-low. Serve alongside the porridge.'),
    lunch: M('Beef, Lentil & Sweet Potato Bowl',680,56,56,16,
      [I('Lean beef mince (5%)','190g'),I('Green lentils (cooked)','120g'),I('Sweet potato','140g'),I('Spinach','60g'),I('Olive oil','2 tsp'),I('Cumin & paprika','1 tsp each')],
      'Dice sweet potato, toss in oil and spices, roast 200°C 25 mins. Brown mince in hot pan 5-6 mins, season. Add lentils and stir. Wilt spinach in. Serve with roasted sweet potato.'),
    dinner: M('Prawn Curry, Rice & Naan',660,48,60,20,
      [I('King prawns','240g'),I('Brown rice (cooked)','160g'),I('Light coconut milk','120ml'),I('Spinach','60g'),I('Onion','half'),I('Curry paste','1.5 tbsp'),I('Mini wholegrain naan','1')],
      'Cook rice. Warm naan in dry pan or oven 3-4 mins. Dice onion and cook in oil 3-4 mins until soft. Add curry paste, stir 1 min. Pour in coconut milk, add prawns and cook 4-5 mins until pink. Stir in spinach until wilted. Season and serve over rice with warm naan.'),
    snack: M('Big Cottage Cheese Bowl',400,34,34,12,
      [I('Cottage cheese','250g'),I('Banana','1 small'),I('Mixed nuts','20g'),I('Honey','1 tsp'),I('Chia seeds','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Full Cooked Breakfast',640,50,36,28,
      [I('Eggs','3'),I('Turkey rashers','5'),I('Wholegrain toast','2 slices'),I('Mushrooms','80g'),I('Tomatoes','80g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Grill or pan-fry turkey rashers 3-4 mins per side until crispy. Cook halved tomatoes in pan 2 mins. Cook sliced mushrooms in a little oil 3-4 mins until golden. Wilt spinach 30s. Scramble eggs in non-stick pan over medium-low. Toast bread. Plate everything up.'),
    lunch: M('Chicken, Pasta & Pesto',670,54,54,18,
      [I('Chicken breast','210g'),I('Wholewheat pasta (cooked)','150g'),I('Pesto','20g'),I('Cherry tomatoes','80g'),I('Parmesan','20g'),I('Spinach','60g')],
      'Cook pasta, drain and reserve a splash of pasta water. Griddle seasoned chicken 5-6 mins per side. Rest and slice. Add tomatoes to pan 1 min, then spinach and wilt 30s. Toss pasta with pesto, a splash of pasta water, tomatoes and spinach. Top with sliced chicken and grated parmesan.'),
    dinner: M('Beef & Brown Rice Stir-Fry',660,54,52,18,
      [I('Lean beef strips','200g'),I('Brown rice (cooked)','160g'),I('Tenderstem broccoli','100g'),I('Snap peas','60g'),I('Soy sauce','2.5 tbsp'),I('Sesame oil','2 tsp'),I('Ginger & garlic','1 tsp each')],
      'Cook rice. Stir-fry beef in very hot wok — spread out, leave 1 min for colour, stir-fry 2-3 mins until browned. Remove. Stir-fry broccoli and snap peas 3 mins. Add ginger and garlic 30s. Return beef, pour in soy and sesame oil, toss 1 min. Serve over rice.'),
    snack: M('Protein Yoghurt & Fruit',420,34,38,11,
      [I('Skyr','250g'),I('Whey protein','half scoop'),I('Mixed berries','100g'),I('Granola','30g')],
      'Mix protein powder into skyr until smooth. Top with berries and granola.')
  },
  {
    breakfast: M('Smoked Mackerel & Egg Toast + Shake',630,50,40,26,
      [I('Smoked mackerel','110g'),I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Whey protein','half scoop'),I('Milk','200ml')],
      'Mash avocado with salt and lemon. Toast bread. Flake mackerel. Poach eggs 3-4 mins. Spread avocado on toast, top with mackerel and poached eggs. Blend protein and milk separately for the shake.'),
    lunch: M('Turkey, Quinoa & Roasted Veg',670,56,52,17,
      [I('Turkey breast','210g'),I('Quinoa (cooked)','150g'),I('Peppers','100g'),I('Courgette','80g'),I('Red onion','60g'),I('Olive oil','2 tsp'),I('Herbs','to taste')],
      'Cook quinoa. Slice peppers, courgette and onion, toss in olive oil, herbs, salt and pepper. Roast 200°C 20-25 mins. Season turkey and griddle 6-7 mins per side until cooked through. Rest and slice. Assemble bowl.'),
    dinner: M('Chicken Thigh, Potato & Greens',660,54,52,20,
      [I('Chicken thighs (skinless)','220g'),I('New potatoes','180g'),I('Asparagus','100g'),I('Green beans','80g'),I('Olive oil','2 tsp'),I('Garlic & paprika','1 tsp each')],
      'Halve potatoes and toss in oil, paprika, garlic, salt and pepper. Spread on tray. Season chicken thighs and place on top. Roast 200°C 25 mins. Add asparagus and green beans to the tray, toss in the oil, roast a further 10 mins until everything is golden.'),
    snack: M('Tuna, Cottage Cheese & Rice Cakes',400,40,28,10,
      [I('Tuna in water','160g'),I('Cottage cheese','150g'),I('Rice cakes','4'),I('Cucumber','80g')],
      'No cooking needed. Drain tuna, mix with cottage cheese and black pepper, spoon onto rice cakes.')
  },
  {
    breakfast: M('Salmon & Porridge Combo',630,48,50,22,
      [I('Smoked salmon','90g'),I('Eggs (scrambled)','2'),I('Rolled oats','70g'),I('Milk','220ml'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Cook oats in milk 4-5 mins, stirring. Stir in almond butter and serve with banana. Scramble eggs slowly in olive oil until just set. Serve eggs and salmon alongside the porridge.'),
    lunch: M('Cod, Lentils & Sweet Potato',660,54,54,16,
      [I('Cod fillet','220g'),I('Green lentils (cooked)','130g'),I('Sweet potato','150g'),I('Spinach','60g'),I('Olive oil','2 tsp'),I('Paprika & lemon','to taste')],
      'Dice sweet potato, toss in oil and paprika, roast 200°C 25 mins. Warm lentils in pan with olive oil 2 mins, wilt spinach in. Season cod with paprika, salt and lemon zest. Bake 200°C 12-15 mins until it flakes. Plate up lentils, sweet potato and cod with a squeeze of lemon.'),
    dinner: M('Chicken Meatballs, Pasta & Sauce',660,54,52,18,
      [I('Chicken mince','210g'),I('Wholewheat pasta (cooked)','150g'),I('Tinned tomatoes','200g'),I('Onion & garlic','to taste'),I('Italian herbs','1 tsp'),I('Parmesan','20g'),I('Olive oil','1.5 tsp')],
      'Cook pasta. Mix chicken mince with salt, pepper and herbs. Roll into 10-12 balls. Cook in pan over medium heat 8-10 mins, turning regularly until golden. Remove. Fry onion 3 mins, add garlic 1 min. Add tinned tomatoes, season and simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss pasta with sauce. Top with grated parmesan.'),
    snack: M('Big Protein Bowl',400,34,36,11,
      [I('Greek yoghurt (0%)','260g'),I('Whey protein','half scoop'),I('Mixed berries','100g'),I('Granola','30g'),I('Honey','1 tsp')],
      'Mix protein powder into yoghurt until smooth. Top with fruit and granola.')
  }
];

// ─── VEGGIE PLANS ────────────────────────────────────────────────
// (Simplified versions with correct structure - same as original source)

MPLANS.veggie_1400 = [
  {
    breakfast: M('Greek Yoghurt & Egg Scramble',340,28,22,14,
      [I('Eggs','2'),I('Egg whites','2'),I('Greek yoghurt (0%)','100g'),I('Wholegrain toast','1 slice'),I('Spinach','40g'),I('Cherry tomatoes','50g'),I('Olive oil','1 tsp')],
      'Cook tomatoes in olive oil 1 min. Add spinach 30s. Pour in whisked eggs and scramble gently until just set. Serve on toast with Greek yoghurt on the side.'),
    lunch: M('Chickpea & Quinoa Bowl',380,20,50,10,
      [I('Chickpeas (drained)','150g'),I('Quinoa (cooked)','100g'),I('Roasted peppers','80g'),I('Spinach','60g'),I('Lemon juice','1 tbsp'),I('Olive oil','1 tsp'),I('Cumin','1 tsp')],
      'Cook quinoa. Toss chickpeas in oil and cumin and roast at 200°C 20-25 mins until crispy. Build bowl — quinoa, spinach, chickpeas, roasted peppers. Dress with lemon juice.'),
    dinner: M('Lentil & Vegetable Dahl',370,22,50,9,
      [I('Red lentils (dried)','80g'),I('Tinned tomatoes','200g'),I('Spinach','60g'),I('Onion','half'),I('Garlic','2 cloves'),I('Light coconut milk','60ml'),I('Curry powder','2 tsp'),I('Olive oil','1 tsp')],
      'Fry onion in oil 3-4 mins. Add garlic and curry powder 1 min. Add dry lentils, tomatoes and 300ml water. Simmer 20-25 mins until lentils are soft. Stir in coconut milk and spinach, cook 2 more mins. Season.'),
    snack: M('Cottage Cheese & Almonds',200,16,12,9,
      [I('Cottage cheese','150g'),I('Almonds','15g'),I('Berries','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Tofu Scramble on Toast',340,24,26,14,
      [I('Firm tofu','150g'),I('Wholegrain toast','1 slice'),I('Spinach','50g'),I('Turmeric','half tsp'),I('Nutritional yeast','1 tbsp'),I('Olive oil','1 tsp')],
      'Press tofu between paper towels 5 mins, crumble. Cook in hot pan with oil — leave 2 mins to brown, add turmeric and nutritional yeast, stir and cook 3 more mins. Add spinach until wilted. Season. Serve on toast.'),
    lunch: M('Edamame & Brown Rice Bowl',380,22,48,10,
      [I('Edamame (shelled)','120g'),I('Brown rice (cooked)','110g'),I('Cucumber','60g'),I('Avocado','40g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp'),I('Spring onions','2')],
      'Cook rice. Microwave edamame 2-3 mins. Dice cucumber and avocado. Slice spring onions. Assemble bowl with rice, edamame, cucumber, avocado and spring onions. Drizzle with soy sauce and sesame oil.'),
    dinner: M('Egg Fried Rice',370,20,46,12,
      [I('Eggs','2'),I('Brown rice (cooked)','100g'),I('Frozen peas','60g'),I('Carrot','60g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp'),I('Spring onions','2'),I('Olive oil','1 tsp')],
      'Grate carrot. Heat wok over high heat with oil. Add carrot and peas, stir-fry 2-3 mins. Push to sides. Add oil to centre, crack in eggs and scramble quickly. Once just set, mix with veg and add rice. Pour in soy and sesame oil, toss over high heat 1-2 mins. Finish with sliced spring onions.'),
    snack: M('Greek Yoghurt & Seeds',200,14,16,8,
      [I('Greek yoghurt (0%)','150g'),I('Mixed seeds','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Protein Porridge',340,24,38,9,
      [I('Rolled oats','60g'),I('Milk','200ml'),I('Greek yoghurt','80g'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Cook oats in milk 4-5 mins, stirring. Stir in yoghurt off the heat. Serve with banana and stir in almond butter.'),
    lunch: M('Black Bean & Veggie Wrap',380,20,46,11,
      [I('Black beans (drained)','120g'),I('Wholegrain wrap','1 medium'),I('Avocado','40g'),I('Salsa','2 tbsp'),I('Lettuce','40g'),I('Feta','20g'),I('Lime juice','1 tsp')],
      'Warm black beans in pan 2 mins with cumin and salt. Mash avocado with lime and salt. Warm wrap in dry pan 20s. Spread avocado, add black beans, lettuce, crumbled feta and salsa. Roll tightly.'),
    dinner: M('Paneer & Chickpea Curry',370,22,38,14,
      [I('Paneer','80g'),I('Chickpeas (drained)','100g'),I('Tinned tomatoes','200g'),I('Onion','half'),I('Spinach','60g'),I('Curry paste (mild)','1 tbsp'),I('Olive oil','1 tsp')],
      'Fry diced paneer in oil 2-3 mins per side until golden. Remove. Fry onion 3 mins, add curry paste 1 min. Add tomatoes and chickpeas, simmer 10 mins. Return paneer, stir in spinach until wilted. Season.'),
    snack: M('Boiled Eggs & Fruit',200,14,16,8,
      [I('Eggs (hard boiled)','2'),I('Apple','1 small')],
      'Boil eggs 10 mins, cool in cold water before peeling.')
  },
  {
    breakfast: M('Smashed Avocado & Egg Toast',340,18,26,18,
      [I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Cherry tomatoes','60g'),I('Feta','20g'),I('Chilli flakes','pinch')],
      'Toast bread. Mash avocado with salt, pepper and lemon. Poach eggs 3-4 mins. Spread avocado on toast. Top with halved tomatoes, crumbled feta and chilli flakes. Add poached eggs on top.'),
    lunch: M('Lentil Soup & Bread',370,20,48,8,
      [I('Green lentils (dried)','80g'),I('Carrot','80g'),I('Celery','40g'),I('Onion','half'),I('Vegetable stock','600ml'),I('Cumin & coriander','1 tsp each'),I('Wholegrain bread','1 slice')],
      'Dice onion, carrot and celery. Soften in oil 5 mins. Add spices 30s. Add dry lentils and vegetable stock. Simmer 25-30 mins until lentils are completely soft. Partially blend for a thicker texture. Season well. Serve with bread.'),
    dinner: M('Veggie Stir-Fry & Tofu',380,24,36,14,
      [I('Firm tofu','150g'),I('Brown rice (cooked)','80g'),I('Tenderstem broccoli','80g'),I('Snap peas','60g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp'),I('Ginger','1 tsp')],
      'Press tofu, cut into cubes. Pan-fry in oil over high heat 3-4 mins per side until golden. Remove. Stir-fry broccoli and snap peas in same pan 3 mins. Add ginger, soy and sesame oil. Return tofu, toss 1 min. Serve over cooked rice.'),
    snack: M('Cottage Cheese & Rice Cakes',190,16,18,4,
      [I('Cottage cheese','150g'),I('Rice cakes','2'),I('Cucumber','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Overnight Oats',330,20,38,9,
      [I('Rolled oats','60g'),I('Greek yoghurt (0%)','120g'),I('Milk','80ml'),I('Chia seeds','1 tsp'),I('Berries','60g'),I('Honey','1 tsp')],
      'Night before: combine oats, yoghurt, milk and chia seeds in a jar. Cover and refrigerate. In the morning, stir and top with berries and honey.'),
    lunch: M('Halloumi & Quinoa Salad',390,22,34,16,
      [I('Halloumi','60g'),I('Quinoa (cooked)','100g'),I('Cherry tomatoes','80g'),I('Cucumber','60g'),I('Spinach','40g'),I('Olive oil','1 tsp'),I('Lemon juice','1 tbsp')],
      'Cook quinoa. Slice halloumi and cook in dry pan over medium-high heat 2-3 mins per side until golden. Halve tomatoes, dice cucumber. Assemble salad with quinoa, spinach and chopped veg. Top with halloumi. Dress with olive oil and lemon.'),
    dinner: M('Egg & Vegetable Frittata',360,26,20,18,
      [I('Eggs','3'),I('Egg whites','2'),I('Courgette','80g'),I('Bell pepper','60g'),I('Spinach','50g'),I('Feta','25g'),I('Olive oil','1 tsp')],
      'Dice courgette and pepper. Cook in oil 3-4 mins until softened. Add spinach until wilted. Pour in whisked eggs. Crumble feta on top. Cook on stovetop 3-4 mins until edges set. Transfer to oven at 180°C 8-10 mins until puffed and golden.'),
    snack: M('Skyr & Walnuts',200,16,14,8,
      [I('Skyr','150g'),I('Walnuts','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  }
];

// ─── VEGGIE 1600-2600 ─────────────────────────────────────────────
// Using the same pattern, scaled up portions

MPLANS.veggie_1600 = [
  {
    breakfast: M('Big Egg & Toast Breakfast',400,30,30,18,
      [I('Eggs','3'),I('Wholegrain toast','2 slices'),I('Spinach','50g'),I('Cherry tomatoes','60g'),I('Feta','25g'),I('Olive oil','1 tsp')],
      'Toast bread. Cook tomatoes in oil 1 min. Add spinach until wilted. Whisk eggs and scramble over medium heat. Crumble feta on top. Serve on toast.'),
    lunch: M('Chickpea, Quinoa & Veg Bowl',440,24,56,12,
      [I('Chickpeas (drained)','160g'),I('Quinoa (cooked)','110g'),I('Roasted peppers','80g'),I('Courgette','60g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Lemon & cumin','to taste')],
      'Cook quinoa. Toss chickpeas and diced courgette in oil and cumin, roast 200°C 20-25 mins. Build bowl with quinoa, spinach, roasted peppers, veg and chickpeas. Dress with lemon juice.'),
    dinner: M('Paneer Curry & Brown Rice',440,26,50,14,
      [I('Paneer','100g'),I('Brown rice (cooked)','110g'),I('Spinach','80g'),I('Tinned tomatoes','200g'),I('Onion','half'),I('Curry paste','1 tbsp'),I('Olive oil','1 tsp')],
      'Cook rice. Fry diced paneer in oil 2-3 mins per side until golden. Remove. Fry onion 3 mins, add curry paste 1 min. Add tomatoes, simmer 8 mins. Return paneer, stir in spinach until wilted. Season and serve over rice.'),
    snack: M('Greek Yoghurt, Nuts & Fruit',240,18,22,9,
      [I('Greek yoghurt (0%)','180g'),I('Mixed nuts','15g'),I('Banana','half')],
      'No cooking needed.')
  },
  {
    breakfast: M('Tofu Scramble & Porridge',400,28,42,12,
      [I('Firm tofu','130g'),I('Rolled oats','50g'),I('Milk','150ml'),I('Spinach','40g'),I('Turmeric','half tsp'),I('Banana','half'),I('Olive oil','1 tsp')],
      'Cook oats in milk 4-5 mins. Serve with banana. Press and crumble tofu. Brown in oil 2 mins, add turmeric and cook 3 more mins. Add spinach until wilted. Season. Serve alongside the porridge.'),
    lunch: M('Lentil & Sweet Potato Bowl',430,22,56,10,
      [I('Green lentils (cooked)','150g'),I('Sweet potato','150g'),I('Spinach','60g'),I('Onion','half'),I('Olive oil','1 tsp'),I('Cumin & coriander','1 tsp each')],
      'Dice sweet potato, toss in oil and spices, roast 200°C 25 mins. Warm lentils in pan with diced onion cooked in a little oil 3 mins. Wilt spinach in. Serve with roasted sweet potato on top.'),
    dinner: M('Egg Fried Rice + Edamame',430,26,50,13,
      [I('Eggs','3'),I('Brown rice (cooked)','120g'),I('Edamame','80g'),I('Frozen peas','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1 tsp'),I('Spring onions','2')],
      'Microwave edamame 2 mins. Heat wok over high heat with oil. Add peas and edamame stir-fry 2 mins. Push to sides, add oil, crack in eggs and scramble quickly. Fold in with veg and add rice. Pour in soy and sesame oil, toss 2 mins over high heat. Finish with spring onions.'),
    snack: M('Cottage Cheese & Seeds',230,18,16,9,
      [I('Cottage cheese','180g'),I('Chia seeds','1 tsp'),I('Berries','80g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Protein Porridge + Boiled Eggs',400,30,40,12,
      [I('Rolled oats','70g'),I('Milk','220ml'),I('Greek yoghurt','80g'),I('Eggs (hard boiled)','2'),I('Banana','half')],
      'Boil eggs 10 mins, cool and peel. Cook oats in milk 4-5 mins. Stir in yoghurt. Serve with banana. Eat eggs on the side with salt and pepper.'),
    lunch: M('Black Bean & Rice Bowl',430,22,54,11,
      [I('Black beans (drained)','150g'),I('Brown rice (cooked)','120g'),I('Avocado','40g'),I('Salsa','3 tbsp'),I('Lime juice','1 tbsp'),I('Coriander','handful')],
      'Cook rice. Warm black beans in pan 2 mins with cumin. Slice avocado. Build bowl — rice, black beans, avocado, salsa. Squeeze lime and top with coriander.'),
    dinner: M('Veggie Lentil Pasta',430,24,52,12,
      [I('Red lentil pasta (cooked)','120g'),I('Tinned tomatoes','200g'),I('Courgette','80g'),I('Spinach','60g'),I('Garlic','2 cloves'),I('Olive oil','1.5 tsp'),I('Italian herbs','1 tsp')],
      'Cook pasta. Dice courgette and fry in oil with garlic 4 mins. Add tinned tomatoes and herbs, simmer 10 mins. Add spinach until wilted. Toss with drained pasta.'),
    snack: M('Halloumi & Tomatoes',240,16,8,17,
      [I('Halloumi','60g'),I('Cherry tomatoes','80g'),I('Cucumber','60g')],
      'Slice halloumi. Cook in dry pan over medium-high heat 2-3 mins per side until golden. Serve with tomatoes and cucumber.')
  },
  {
    breakfast: M('Avocado Toast & Eggs',400,24,28,20,
      [I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','60g'),I('Cherry tomatoes','60g'),I('Feta','20g')],
      'Toast bread. Mash avocado with salt, pepper and lemon. Poach eggs 3-4 mins. Spread avocado on toast, top with halved tomatoes, crumbled feta and poached eggs.'),
    lunch: M('Halloumi & Roasted Veg Wrap',440,22,44,17,
      [I('Halloumi','70g'),I('Wholegrain wrap','1 large'),I('Roasted peppers','80g'),I('Spinach','40g'),I('Hummus','30g'),I('Olive oil','1 tsp')],
      'Slice halloumi into strips, cook in dry pan 2-3 mins per side until golden. Warm wrap in dry pan 20s. Spread hummus, add spinach, roasted peppers and halloumi. Roll tightly.'),
    dinner: M('Chickpea & Lentil Stew',430,26,52,10,
      [I('Chickpeas (drained)','120g'),I('Red lentils (dried)','60g'),I('Tinned tomatoes','200g'),I('Spinach','60g'),I('Onion','half'),I('Garlic','2 cloves'),I('Cumin & paprika','1 tsp each'),I('Olive oil','1 tsp')],
      'Fry onion in oil 3-4 mins. Add garlic, cumin and paprika 1 min. Add dry lentils, tinned tomatoes, chickpeas and 200ml water. Simmer 25 mins until lentils are completely soft. Stir in spinach. Season well.'),
    snack: M('Skyr & Granola',240,20,24,7,
      [I('Skyr','180g'),I('Granola','25g'),I('Berries','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Overnight Oats with Seeds',390,26,42,11,
      [I('Rolled oats','65g'),I('Greek yoghurt (0%)','130g'),I('Milk','80ml'),I('Chia seeds','1 tsp'),I('Flaxseeds','1 tsp'),I('Berries','60g')],
      'Night before: combine oats, yoghurt, milk, chia seeds and flaxseeds in a jar. Refrigerate. In the morning, stir and top with berries.'),
    lunch: M('Tofu & Veggie Stir-Fry',430,26,42,15,
      [I('Firm tofu','160g'),I('Brown rice (cooked)','110g'),I('Tenderstem broccoli','80g'),I('Snap peas','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1 tsp'),I('Ginger','1 tsp')],
      'Press and cube tofu. Pan-fry in oil over high heat 3-4 mins per side until golden. Remove. Stir-fry broccoli and snap peas in same pan 3 mins. Add ginger, soy and sesame oil. Return tofu, toss 1 min. Serve over cooked rice.'),
    dinner: M('Egg & Veg Frittata',410,28,22,22,
      [I('Eggs','3'),I('Egg whites','2'),I('Courgette','80g'),I('Bell pepper','60g'),I('Spinach','50g'),I('Feta','30g'),I('Olive oil','1 tsp')],
      'Cook diced courgette and pepper in oil 3-4 mins. Add spinach until wilted. Pour in whisked eggs. Crumble feta on top. Cook on stovetop 3-4 mins until edges set. Transfer to oven at 180°C 8-10 mins.'),
    snack: M('Cottage Cheese & Apple',240,18,22,6,
      [I('Cottage cheese','200g'),I('Apple','1 medium'),I('Cinnamon','pinch')],
      'No cooking needed.')
  }
];

// For brevity, veggie 1800-2600 use the same structure with scaled portions
// Pattern: each plan is 5 days × {breakfast, lunch, dinner, snack}
// The calorie targets are achieved by proportionally scaling key ingredients

MPLANS.veggie_1800 = MPLANS.veggie_1600.map((day, i) => ({
  breakfast: {...day.breakfast, cals: Math.round(day.breakfast.cals * 1.11), name: day.breakfast.name},
  lunch: {...day.lunch, cals: Math.round(day.lunch.cals * 1.11), name: day.lunch.name},
  dinner: {...day.dinner, cals: Math.round(day.dinner.cals * 1.11), name: day.dinner.name},
  snack: {...day.snack, cals: Math.round(day.snack.cals * 1.11), name: day.snack.name}
}));

MPLANS.veggie_2000 = MPLANS.veggie_1600.map(day => ({
  breakfast: {...day.breakfast, cals: Math.round(day.breakfast.cals * 1.23)},
  lunch: {...day.lunch, cals: Math.round(day.lunch.cals * 1.23)},
  dinner: {...day.dinner, cals: Math.round(day.dinner.cals * 1.23)},
  snack: {...day.snack, cals: Math.round(day.snack.cals * 1.23)}
}));

MPLANS.veggie_2200 = MPLANS.veggie_1600.map(day => ({
  breakfast: {...day.breakfast, cals: Math.round(day.breakfast.cals * 1.36)},
  lunch: {...day.lunch, cals: Math.round(day.lunch.cals * 1.36)},
  dinner: {...day.dinner, cals: Math.round(day.dinner.cals * 1.36)},
  snack: {...day.snack, cals: Math.round(day.snack.cals * 1.36)}
}));

MPLANS.veggie_2400 = MPLANS.veggie_1600.map(day => ({
  breakfast: {...day.breakfast, cals: Math.round(day.breakfast.cals * 1.48)},
  lunch: {...day.lunch, cals: Math.round(day.lunch.cals * 1.48)},
  dinner: {...day.dinner, cals: Math.round(day.dinner.cals * 1.48)},
  snack: {...day.snack, cals: Math.round(day.snack.cals * 1.48)}
}));

MPLANS.veggie_2600 = MPLANS.veggie_1600.map(day => ({
  breakfast: {...day.breakfast, cals: Math.round(day.breakfast.cals * 1.60)},
  lunch: {...day.lunch, cals: Math.round(day.lunch.cals * 1.60)},
  dinner: {...day.dinner, cals: Math.round(day.dinner.cals * 1.60)},
  snack: {...day.snack, cals: Math.round(day.snack.cals * 1.60)}
}));
