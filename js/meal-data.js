// ═══════════════════════════════════════════════════════════════
// MEAL PLAN DATA — The Ultimate Performer
// ═══════════════════════════════════════════════════════════════

const MEAL_MACROS = {
  1400:{p:140,c:105,f:47}, 1600:{p:160,c:120,f:53}, 1800:{p:180,c:135,f:60},
  2000:{p:200,c:150,f:67}, 2200:{p:210,c:165,f:73}, 2400:{p:220,c:180,f:80}, 2600:{p:240,c:195,f:87}
};
const MEAL_VMACROS = {
  1400:{p:105,c:140,f:47}, 1600:{p:120,c:160,f:53}, 1800:{p:135,c:180,f:60},
  2000:{p:150,c:200,f:67}, 2200:{p:160,c:220,f:73}, 2400:{p:170,c:240,f:80}, 2600:{p:175,c:260,f:87}
};

function M(name,cals,p,c,f,ingredients,method,prepNote){return{name,cals,p,c,f,ingredients,method,prepNote:prepNote||null};}
function I(item,amount){return{item,amount};}

// ─── PREP NOTE HELPER ────────────────────────────────────────────
// prepNote: shown as a badge on the meal card
// "🍳 Cook double tonight — covers tomorrow's lunch"
// "♻️ Uses chicken from last night"

const MPLANS = {};

// ═══════════════════════════════════════════════════════════════
// MEAT 1400
// Week theme: Mon/Tue chicken batch · Wed/Thu salmon batch · Fri standalone
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_1400 = [
  // Monday
  {
    breakfast: M('Scrambled Eggs & Smoked Salmon on Toast',350,32,18,16,
      [I('Eggs','3 large'),I('Smoked salmon','50g'),I('Wholegrain toast','1 slice'),I('Spinach','handful'),I('Olive oil','1 tsp')],
      'Heat non-stick pan over medium-low with oil. Whisk eggs, season, stir slowly until just set. Toast bread. Layer salmon and wilted spinach on toast, pile eggs on top.'),
    lunch: M('Chicken & Avocado Rice Bowl',380,38,32,9,
      [I('Chicken breast','130g'),I('Brown rice (cooked)','100g'),I('Avocado','40g'),I('Cherry tomatoes','80g'),I('Cucumber','50g'),I('Lime juice','1 tbsp'),I('Olive oil','1 tsp')],
      'Griddle seasoned chicken 5–6 mins per side. Rest and slice. Build bowl — rice, chopped salad, avocado. Top with chicken. Squeeze lime and drizzle oil.'),
    dinner: M('Chicken Fajita Bowl',370,40,28,10,
      [I('Chicken breast','150g'),I('Brown rice (cooked)','80g'),I('Bell peppers','100g'),I('Red onion','60g'),I('Smoked paprika & cumin','1 tsp each'),I('Salsa','2 tbsp'),I('Greek yoghurt','30g'),I('Olive oil','1 tsp')],
      'Season chicken with paprika, cumin, salt and pepper. Griddle 5–6 mins per side. Slice peppers and onion, cook in same pan 4 mins. Rest chicken and slice. Serve over rice with peppers, salsa and yoghurt.','🍳 Cook double chicken tonight — covers tomorrow\'s lunch wrap'),
    snack: M('Greek Yoghurt & Almonds',200,14,12,10,
      [I('Greek yoghurt (0%)','150g'),I('Almonds','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  },
  // Tuesday
  {
    breakfast: M('Banana Protein Oats',330,28,38,7,
      [I('Rolled oats','60g'),I('Milk','200ml'),I('Greek yoghurt','80g'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Cook oats in milk 4–5 mins stirring frequently. Stir in yoghurt off heat. Top with sliced banana and almond butter.'),
    lunch: M('Leftover Chicken Fajita Wrap',390,40,32,9,
      [I('Leftover fajita chicken (sliced)','130g'),I('Wholegrain wrap','1 medium'),I('Leftover peppers & onion','80g'),I('Salsa','2 tbsp'),I('Lettuce','40g'),I('Greek yoghurt','20g')],
      'Warm wrap in dry pan 20s. Layer yoghurt, lettuce, peppers and sliced chicken. Add salsa. Roll tightly.','♻️ Uses chicken & peppers from last night\'s fajita bowl'),
    dinner: M('Teriyaki Salmon & Jasmine Rice',390,36,32,13,
      [I('Salmon fillet','150g'),I('Jasmine rice (cooked)','100g'),I('Tenderstem broccoli','80g'),I('Soy sauce','1.5 tbsp'),I('Honey','1 tsp'),I('Garlic','1 clove'),I('Sesame seeds','1 tsp')],
      'Mix soy, honey and garlic. Marinate salmon 5 mins. Sear salmon in hot pan 3 mins per side, baste with remaining marinade last minute. Steam broccoli 4 mins. Serve over rice, scatter sesame seeds.','🍳 Cook double salmon — flakes into a rice bowl for tomorrow\'s lunch'),
    snack: M('Cottage Cheese & Rice Cakes',190,18,20,3,
      [I('Cottage cheese','150g'),I('Rice cakes','2'),I('Cucumber','50g')],
      'No cooking needed.')
  },
  // Wednesday
  {
    breakfast: M('Avocado & Egg Toast',340,22,24,16,
      [I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Cherry tomatoes','60g'),I('Chilli flakes','pinch')],
      'Toast bread. Mash avocado with salt, pepper and lemon. Halve tomatoes. Poach eggs 3–4 mins. Spread avocado on toast, top with tomatoes, chilli flakes and eggs.'),
    lunch: M('Teriyaki Salmon Rice Bowl',380,36,30,12,
      [I('Leftover teriyaki salmon (flaked)','130g'),I('Jasmine rice (cooked)','90g'),I('Edamame','60g'),I('Cucumber','60g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'Microwave edamame 2 mins. Dice cucumber. Build bowl — rice, edamame, cucumber, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from last night'),
    dinner: M('Beef Burrito Bowl',370,38,28,11,
      [I('Lean beef mince (5%)','130g'),I('Brown rice (cooked)','80g'),I('Black beans (drained)','60g'),I('Salsa','3 tbsp'),I('Avocado','40g'),I('Lime juice','1 tbsp'),I('Cumin & paprika','1 tsp each'),I('Greek yoghurt','20g')],
      'Brown mince in hot pan 5–6 mins, season with cumin, paprika, salt and pepper. Drain. Build bowl — rice, beans, mince. Top with salsa, diced avocado, yoghurt, squeeze of lime.','🍳 Cook double beef tonight — covers tomorrow\'s lunch bowl'),
    snack: M('Protein Yoghurt & Berries',200,18,18,4,
      [I('Skyr or high-protein yoghurt','150g'),I('Mixed berries','80g')],
      'No cooking needed.')
  },
  // Thursday
  {
    breakfast: M('Turkey & Egg White Omelette',330,36,14,12,
      [I('Egg whites','5'),I('Turkey breast','60g'),I('Bell pepper','50g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Cook diced pepper in oil 2 mins. Add spinach 30s. Pour seasoned egg whites over veg and turkey. Set on bottom 2–3 mins. Fold and serve.'),
    lunch: M('Leftover Beef Burrito Bowl',380,38,30,10,
      [I('Leftover beef mince','110g'),I('Brown rice (cooked)','80g'),I('Black beans (drained)','60g'),I('Salsa','2 tbsp'),I('Lettuce','40g'),I('Lime juice','1 tsp')],
      'Reheat beef in pan or microwave. Build bowl — rice, beans, beef, lettuce, salsa. Squeeze lime.','♻️ Uses beef mince from last night\'s burrito bowl'),
    dinner: M('Prawn & Courgette Pasta',370,36,32,8,
      [I('King prawns','150g'),I('Wholewheat pasta (cooked)','80g'),I('Courgette','100g'),I('Cherry tomatoes','80g'),I('Garlic','2 cloves'),I('Olive oil','1 tsp'),I('Chilli flakes','pinch')],
      'Cook pasta. Fry garlic and chilli 30s. Add courgette and tomatoes 3–4 mins. Add prawns 2–3 mins until pink. Toss with pasta and a splash of pasta water.'),
    snack: M('Hard Boiled Eggs & Cherry Tomatoes',190,16,4,11,
      [I('Eggs','2 large'),I('Cherry tomatoes','80g')],
      'Boil eggs 10 mins. Cool in cold water before peeling.')
  },
  // Friday
  {
    breakfast: M('Smoked Mackerel & Poached Eggs',360,34,16,17,
      [I('Eggs (poached)','2'),I('Smoked mackerel','70g'),I('Wholegrain toast','1 slice'),I('Spinach','40g')],
      'Wilt spinach. Toast bread. Poach eggs 3–4 mins. Layer spinach and flaked mackerel on toast, top with eggs.'),
    lunch: M('Tuna Nicoise Salad',380,38,22,13,
      [I('Tuna in water','160g'),I('Eggs (hard boiled)','2'),I('New potatoes (cooked)','80g'),I('Green beans (blanched)','60g'),I('Mixed leaves','50g'),I('Olive oil & lemon','1 tsp each')],
      'Boil potatoes 15 mins, eggs 10 mins. Blanch green beans 3 mins. Arrange on leaves. Dress with oil and lemon.'),
    dinner: M('Chicken Thigh Tray Bake',390,40,26,13,
      [I('Chicken thighs (skinless)','160g'),I('Sweet potato','100g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1 tsp'),I('Smoked paprika & garlic powder','1 tsp each')],
      'Toss veg in oil and spices. Add seasoned chicken on top. Roast 200°C 30–35 mins until golden.'),
    snack: M('Tuna & Rice Cakes',190,20,18,3,
      [I('Tuna in water','80g'),I('Rice cakes','2'),I('Lemon juice','1 tsp')],
      'No cooking needed.')
  }
];

// ═══════════════════════════════════════════════════════════════
// MEAT 1600
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_1600 = [
  // Monday
  {
    breakfast: M('Smoked Salmon Eggs & Toast',400,36,24,16,
      [I('Eggs','3'),I('Smoked salmon','70g'),I('Wholegrain toast','2 slices'),I('Avocado','40g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Mash avocado with lemon and salt. Toast bread. Wilt spinach. Scramble eggs slowly over medium-low. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Teriyaki Chicken Rice Bowl',440,44,38,10,
      [I('Chicken breast','160g'),I('Brown rice (cooked)','120g'),I('Tenderstem broccoli','80g'),I('Soy sauce','1.5 tbsp'),I('Honey','1 tsp'),I('Garlic','1 clove'),I('Sesame seeds','1 tsp')],
      'Mix soy, honey and garlic. Marinate chicken 5 mins. Griddle 5–6 mins per side, basting with marinade. Steam broccoli 4 mins. Serve over rice with sesame seeds.'),
    dinner: M('Chicken Fajita Bowl',440,44,36,12,
      [I('Chicken breast','160g'),I('Brown rice (cooked)','100g'),I('Bell peppers (mixed)','100g'),I('Red onion','60g'),I('Smoked paprika & cumin','1 tsp each'),I('Salsa','3 tbsp'),I('Greek yoghurt','40g'),I('Cheddar (grated)','15g')],
      'Season chicken with paprika, cumin, salt and pepper. Griddle 5–6 mins per side. Slice peppers and onion and cook in same pan 4 mins. Slice chicken. Serve over rice with peppers, salsa, yoghurt and cheese.','🍳 Cook double chicken & peppers — covers tomorrow\'s lunch wrap'),
    snack: M('Cottage Cheese, Fruit & Nuts',240,20,20,8,
      [I('Cottage cheese','180g'),I('Mixed berries','80g'),I('Walnuts','10g')],
      'No cooking needed.')
  },
  // Tuesday
  {
    breakfast: M('High Protein Porridge',400,32,40,10,
      [I('Rolled oats','70g'),I('Milk','200ml'),I('Greek yoghurt','80g'),I('Banana','half'),I('Peanut butter','1 tsp')],
      'Cook oats in milk 4–5 mins. Stir in yoghurt off heat. Top with sliced banana and peanut butter.'),
    lunch: M('Chicken Fajita Wrap',440,44,34,12,
      [I('Leftover fajita chicken (sliced)','140g'),I('Wholegrain wrap','1 large'),I('Leftover peppers & onion','80g'),I('Salsa','3 tbsp'),I('Romaine lettuce','40g'),I('Greek yoghurt','30g'),I('Cheddar (grated)','15g')],
      'Warm wrap in dry pan 20s. Spread yoghurt, layer lettuce, peppers and sliced chicken. Add salsa and cheese. Roll tightly.','♻️ Uses chicken & peppers from last night\'s fajita bowl'),
    dinner: M('Salmon & Asparagus with New Potatoes',440,40,34,16,
      [I('Salmon fillet','170g'),I('New potatoes','140g'),I('Asparagus','100g'),I('Lemon','half'),I('Olive oil','1 tsp'),I('Dill','pinch')],
      'Boil potatoes 15 mins. Toss asparagus in oil and salt. Roast asparagus at 200°C 10 mins. Cook salmon skin-side down in hot pan 3–4 mins until crispy, flip 2 mins more. Squeeze lemon before serving.','🍳 Cook double salmon tonight — flakes into tomorrow\'s lunch bowl'),
    snack: M('Greek Yoghurt & Seeds',230,18,16,9,
      [I('Greek yoghurt (0%)','200g'),I('Mixed seeds','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  },
  // Wednesday
  {
    breakfast: M('Tuna & Egg Scramble on Toast',390,38,26,13,
      [I('Eggs','2'),I('Egg whites','3'),I('Tuna in water','80g'),I('Wholegrain toast','1 slice'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Wilt spinach in pan 30s. Add drained tuna to warm 1 min. Pour in whisked eggs and scramble gently until just set. Pile onto toast.'),
    lunch: M('Salmon Rice Bowl',440,40,36,14,
      [I('Leftover salmon (flaked)','140g'),I('Brown rice (cooked)','110g'),I('Edamame','60g'),I('Cucumber','60g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp'),I('Avocado','40g')],
      'Microwave edamame 2 mins. Build bowl — rice, edamame, cucumber, avocado, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from last night'),
    dinner: M('Beef Burrito Bowl',440,44,36,13,
      [I('Lean beef mince (5%)','150g'),I('Brown rice (cooked)','100g'),I('Black beans (drained)','70g'),I('Salsa','3 tbsp'),I('Avocado','40g'),I('Lime juice','1 tbsp'),I('Cumin & paprika','1 tsp each'),I('Greek yoghurt','30g')],
      'Brown mince in hot pan 5–6 mins, season with cumin, paprika, salt. Build bowl — rice, beans, beef, avocado, salsa, yoghurt and lime.','🍳 Cook double beef tonight — covers tomorrow\'s lunch'),
    snack: M('Hard Boiled Eggs & Apple',230,16,20,9,
      [I('Eggs','2'),I('Apple','1 medium'),I('Almonds','10g')],
      'Boil eggs 10 mins. Cool in cold water before peeling.')
  },
  // Thursday
  {
    breakfast: M('Smoked Mackerel Scramble & Toast',400,36,22,18,
      [I('Eggs','3'),I('Smoked mackerel','70g'),I('Wholegrain toast','1 slice'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp')],
      'Halve tomatoes, cook in oil 1 min. Pour in whisked eggs and scramble over medium-low. Fold in flaked mackerel off heat. Serve on toast.'),
    lunch: M('Beef Taco Bowl',430,42,36,12,
      [I('Leftover beef mince','120g'),I('Brown rice (cooked)','100g'),I('Black beans (drained)','60g'),I('Salsa','3 tbsp'),I('Lettuce','50g'),I('Lime juice','1 tsp'),I('Sour cream (light)','20g')],
      'Reheat beef in pan or microwave 2 mins. Build bowl — rice, beans, lettuce, beef, salsa, sour cream. Squeeze lime.','♻️ Uses beef mince from last night\'s burrito bowl'),
    dinner: M('Prawn Stir-Fry with Egg Noodles',440,40,36,12,
      [I('King prawns','190g'),I('Egg noodles (cooked)','100g'),I('Pak choi','80g'),I('Mushrooms','60g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp'),I('Ginger & garlic','1 tsp each')],
      'Cook noodles. Stir-fry mushrooms in hot wok 2 mins. Add pak choi, ginger and garlic 1 min. Add prawns 2–3 mins until pink. Pour in soy and sesame oil. Toss with noodles.'),
    snack: M('Protein Smoothie',240,24,22,5,
      [I('Whey protein','1 scoop'),I('Banana','half'),I('Milk','200ml'),I('Peanut butter','1 tsp')],
      'Blend all ingredients 30–45 seconds until smooth.')
  },
  // Friday
  {
    breakfast: M('Chicken & Veggie Omelette',390,38,18,18,
      [I('Eggs','2'),I('Egg whites','3'),I('Cooked chicken breast','70g'),I('Mushrooms','60g'),I('Spinach','40g'),I('Feta','20g'),I('Olive oil','1 tsp')],
      'Cook mushrooms in oil 3 mins. Add chicken 1 min. Add spinach until wilted. Pour in whisked eggs. Set on bottom 2–3 mins. Crumble feta over half. Fold and serve.'),
    lunch: M('Chicken Caesar Wrap',440,42,34,14,
      [I('Chicken breast','160g'),I('Wholegrain wrap','1 large'),I('Romaine lettuce','50g'),I('Parmesan (grated)','15g'),I('Light Caesar dressing','20g')],
      'Griddle chicken 5–6 mins per side. Slice. Warm wrap in dry pan. Spread dressing, layer lettuce, chicken and parmesan. Roll tightly.'),
    dinner: M('Chicken Thigh Tray Bake',450,44,34,14,
      [I('Chicken thighs (skinless)','180g'),I('Sweet potato','110g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Nestle seasoned chicken thighs on top. Roast 200°C 30–35 mins until golden.'),
    snack: M('Skyr with Berries & Granola',230,20,24,4,
      [I('Skyr','180g'),I('Mixed berries','80g'),I('Granola (low sugar)','20g')],
      'No cooking needed.')
  }
];

// ═══════════════════════════════════════════════════════════════
// MEAT 1800
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_1800 = [
  // Monday
  {
    breakfast: M('Full Protein Breakfast',450,38,28,20,
      [I('Eggs','3'),I('Smoked salmon','60g'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Mash avocado with lemon and salt. Toast bread. Wilt spinach. Scramble eggs slowly over medium-low. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Chicken Fajita Bowl',490,46,42,12,
      [I('Chicken breast','170g'),I('Brown rice (cooked)','130g'),I('Bell peppers (mixed)','100g'),I('Red onion','60g'),I('Smoked paprika & cumin','1 tsp each'),I('Salsa','3 tbsp'),I('Greek yoghurt','40g'),I('Avocado','40g')],
      'Season chicken with paprika, cumin, salt. Griddle 5–6 mins per side. Slice peppers and onion and cook in same pan 4 mins. Slice chicken. Build bowl with rice, peppers, avocado, salsa and yoghurt.','🍳 Cook double chicken & peppers tonight — covers tomorrow\'s lunch wrap'),
    dinner: M('Teriyaki Salmon, Rice & Greens',480,42,40,16,
      [I('Salmon fillet','180g'),I('Jasmine rice (cooked)','120g'),I('Pak choi','80g'),I('Soy sauce','2 tbsp'),I('Honey','1 tsp'),I('Garlic','1 clove'),I('Sesame seeds','1 tsp'),I('Sesame oil','1 tsp')],
      'Mix soy, honey and garlic. Marinate salmon 5 mins. Sear salmon in hot pan 3 mins per side, baste with marinade last minute. Stir-fry pak choi in sesame oil 2 mins. Serve over rice with sesame seeds.','🍳 Cook double salmon tonight — covers Wednesday\'s breakfast bowl'),
    snack: M('Protein Yoghurt & Nuts',280,22,22,10,
      [I('Greek yoghurt (0%)','200g'),I('Mixed nuts','20g'),I('Honey','1 tsp'),I('Blueberries','60g')],
      'No cooking needed.')
  },
  // Tuesday
  {
    breakfast: M('Protein Oats & Banana',430,34,44,11,
      [I('Rolled oats','70g'),I('Milk','200ml'),I('Greek yoghurt','80g'),I('Banana','half'),I('Peanut butter','1.5 tsp')],
      'Cook oats in milk 4–5 mins. Stir in yoghurt off heat. Top with banana and peanut butter.'),
    lunch: M('Chicken Fajita Wrap',490,46,40,13,
      [I('Leftover fajita chicken (sliced)','150g'),I('Wholegrain wrap','1 large'),I('Leftover peppers & onion','90g'),I('Salsa','3 tbsp'),I('Romaine lettuce','40g'),I('Avocado','40g'),I('Greek yoghurt','30g')],
      'Warm wrap in dry pan 20s. Spread yoghurt, layer lettuce, peppers, avocado and sliced chicken. Add salsa. Roll tightly.','♻️ Uses chicken & peppers from last night\'s fajita bowl'),
    dinner: M('Beef Burrito Bowl',480,44,42,14,
      [I('Lean beef mince (5%)','160g'),I('Brown rice (cooked)','110g'),I('Black beans (drained)','80g'),I('Salsa','3 tbsp'),I('Avocado','50g'),I('Lime juice','1 tbsp'),I('Cumin & paprika','1 tsp each'),I('Greek yoghurt','30g')],
      'Brown mince in hot pan 5–6 mins, season with cumin, paprika, salt. Build bowl — rice, beans, beef, avocado, salsa, yoghurt and lime.','🍳 Cook double beef tonight — covers tomorrow\'s lunch'),
    snack: M('Tuna Rice Cakes & Cottage Cheese',280,28,22,6,
      [I('Tuna in water','100g'),I('Rice cakes','3'),I('Cottage cheese','80g')],
      'Mix tuna and cottage cheese. Spoon onto rice cakes.')
  },
  // Wednesday
  {
    breakfast: M('Teriyaki Salmon Rice Bowl',440,38,36,14,
      [I('Leftover teriyaki salmon (flaked)','140g'),I('Jasmine rice (cooked)','100g'),I('Edamame','60g'),I('Cucumber','60g'),I('Avocado','40g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'Microwave edamame 2 mins. Build bowl — rice, edamame, cucumber, avocado, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from Monday\'s dinner'),
    lunch: M('Leftover Beef Taco Bowl',480,44,40,13,
      [I('Leftover beef mince','130g'),I('Brown rice (cooked)','110g'),I('Black beans (drained)','70g'),I('Salsa','3 tbsp'),I('Lettuce','50g'),I('Lime juice','1 tsp'),I('Sour cream (light)','25g')],
      'Reheat beef. Build bowl — rice, beans, lettuce, beef, salsa and sour cream. Squeeze lime.','♻️ Uses beef mince from last night\'s burrito bowl'),
    dinner: M('Chicken Thigh Tray Bake',480,44,38,14,
      [I('Chicken thighs (skinless)','190g'),I('Sweet potato','150g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Season chicken thighs. Nestle on top of veg. Roast 200°C 30–35 mins until golden and cooked through.','🍳 Cook extra chicken tonight — great for tomorrow\'s wrap or salad'),
    snack: M('Cottage Cheese & Pineapple',270,22,26,5,
      [I('Cottage cheese','200g'),I('Pineapple chunks','80g'),I('Chia seeds','1 tsp')],
      'No cooking needed.')
  },
  // Thursday
  {
    breakfast: M('Turkey Scramble & Toast',440,38,30,15,
      [I('Eggs','2'),I('Egg whites','3'),I('Turkey mince (cooked)','80g'),I('Cherry tomatoes','60g'),I('Spinach','40g'),I('Wholegrain toast','1 slice'),I('Olive oil','1 tsp')],
      'Warm mince in pan. Add tomatoes 1 min, spinach until wilted. Pour in whisked eggs and scramble until just set. Serve on toast.'),
    lunch: M('Leftover Chicken Wrap',490,44,38,14,
      [I('Leftover chicken thigh (sliced)','170g'),I('Wholegrain wrap','1 large'),I('Romaine lettuce','50g'),I('Cherry tomatoes','60g'),I('Avocado','40g'),I('Light mayo','15g')],
      'Warm wrap in dry pan 20s. Layer mayo, lettuce, tomatoes, avocado and sliced chicken. Roll tightly.','♻️ Uses chicken from last night\'s tray bake'),
    dinner: M('Prawn Stir-Fry with Rice Noodles',480,40,42,13,
      [I('King prawns','200g'),I('Rice noodles (cooked)','110g'),I('Pak choi','80g'),I('Mushrooms','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1 tsp'),I('Ginger & garlic','1 tsp each')],
      'Cook noodles. Stir-fry mushrooms 2 mins. Add pak choi, ginger, garlic 1 min. Add prawns 2–3 mins until pink. Pour in soy and sesame oil. Toss with noodles.'),
    snack: M('Protein Smoothie',270,28,24,6,
      [I('Whey protein','1 scoop'),I('Banana','half'),I('Milk','250ml'),I('Peanut butter','1 tsp')],
      'Blend all ingredients 30–45 seconds until smooth.')
  },
  // Friday
  {
    breakfast: M('Smoked Mackerel & Eggs',440,38,28,19,
      [I('Eggs','3'),I('Smoked mackerel','70g'),I('Wholegrain toast','1 slice'),I('Avocado','40g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Wilt spinach. Mash avocado. Scramble eggs slowly over medium-low. Toast bread. Spread avocado on toast, top with spinach, eggs and flaked mackerel.'),
    lunch: M('Chicken & Avocado Salad',480,44,28,20,
      [I('Chicken breast','170g'),I('Avocado','60g'),I('Mixed leaves','60g'),I('Cherry tomatoes','80g'),I('Cucumber','60g'),I('Olive oil','1 tsp'),I('Balsamic vinegar','1 tbsp')],
      'Griddle seasoned chicken 5–6 mins per side. Rest and slice. Arrange salad, add chicken, avocado and dressing.'),
    dinner: M('Lean Beef Meatballs & Spaghetti',490,44,42,14,
      [I('Lean beef mince (5%)','160g'),I('Wholewheat spaghetti (cooked)','110g'),I('Tinned tomatoes','200g'),I('Onion','half'),I('Garlic','2 cloves'),I('Italian herbs','1 tsp'),I('Olive oil','1 tsp'),I('Parmesan','15g')],
      'Roll mince into balls, brown in oil 8–10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes and herbs, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with spaghetti. Top with parmesan.'),
    snack: M('Skyr & Fruit',270,24,26,4,
      [I('Skyr','200g'),I('Mixed berries','80g'),I('Granola','20g')],
      'No cooking needed.')
  }
];

// ═══════════════════════════════════════════════════════════════
// MEAT 2000
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_2000 = [
  // Monday
  {
    breakfast: M('Smoked Salmon, Avocado & Eggs',480,40,28,22,
      [I('Eggs','3'),I('Smoked salmon','80g'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Spinach','40g'),I('Olive oil','1 tsp')],
      'Mash avocado with lemon and salt. Toast bread. Wilt spinach. Scramble eggs slowly over medium-low. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Chicken Burrito Bowl',540,50,46,14,
      [I('Chicken breast','190g'),I('Brown rice (cooked)','140g'),I('Black beans (drained)','80g'),I('Salsa','3 tbsp'),I('Avocado','50g'),I('Lime juice','1 tbsp'),I('Smoked paprika & cumin','1 tsp each'),I('Greek yoghurt','30g')],
      'Season chicken with paprika, cumin, salt. Griddle 5–6 mins per side, rest and slice. Warm beans in pan 2 mins with cumin. Build bowl — rice, beans, chicken, avocado, salsa, yoghurt and lime.','🍳 Cook double chicken tonight — covers tomorrow\'s fajita wrap'),
    dinner: M('Teriyaki Salmon, Quinoa & Greens',520,44,42,18,
      [I('Salmon fillet','190g'),I('Quinoa (cooked)','130g'),I('Asparagus','80g'),I('Spinach','60g'),I('Soy sauce','2 tbsp'),I('Honey','1 tsp'),I('Garlic','1 clove'),I('Sesame oil','1 tsp')],
      'Mix soy, honey and garlic. Marinate salmon 5 mins. Sear salmon in hot pan 3–4 mins per side, baste with marinade. Roast asparagus 200°C 10 mins. Wilt spinach. Serve over quinoa.','🍳 Cook double salmon tonight — covers Wednesday\'s breakfast bowl'),
    snack: M('Cottage Cheese, Nuts & Apple',300,24,24,12,
      [I('Cottage cheese','200g'),I('Mixed nuts','20g'),I('Apple','1 medium')],
      'No cooking needed.')
  },
  // Tuesday
  {
    breakfast: M('Protein Oats with Banana',470,38,46,12,
      [I('Rolled oats','80g'),I('Milk','250ml'),I('Greek yoghurt','80g'),I('Banana','half'),I('Almond butter','1.5 tsp')],
      'Cook oats in milk 4–5 mins. Stir in yoghurt. Top with banana and almond butter.'),
    lunch: M('Chicken Fajita Wrap',540,50,40,16,
      [I('Leftover fajita chicken (sliced)','170g'),I('Wholegrain wrap','1 large'),I('Bell pepper','80g'),I('Red onion','40g'),I('Salsa','3 tbsp'),I('Avocado','50g'),I('Greek yoghurt','30g'),I('Cheddar (grated)','15g')],
      'Quickly stir-fry pepper and onion 3 mins if not already cooked. Warm wrap in dry pan. Layer yoghurt, lettuce, peppers, avocado, chicken, salsa and cheese. Roll tightly.','♻️ Uses chicken from last night\'s burrito bowl'),
    dinner: M('Beef Stir-Fry with Egg Noodles',520,44,46,14,
      [I('Lean beef strips','170g'),I('Egg noodles (cooked)','130g'),I('Tenderstem broccoli','80g'),I('Snap peas','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1.5 tsp'),I('Ginger & garlic','1 tsp each')],
      'Stir-fry beef in very hot wok — leave 1 min for colour, stir 2–3 mins. Remove. Stir-fry broccoli and snap peas 3 mins. Add ginger and garlic 30s. Return beef, pour in soy and sesame oil, add noodles and toss 1 min.','🍳 Cook extra beef tonight — covers tomorrow\'s rice bowl'),
    snack: M('Greek Yoghurt & Seeds',300,22,24,11,
      [I('Greek yoghurt (0%)','220g'),I('Mixed seeds','20g'),I('Honey','1 tsp'),I('Berries','80g')],
      'No cooking needed.')
  },
  // Wednesday
  {
    breakfast: M('Teriyaki Salmon Rice Bowl',480,42,38,16,
      [I('Leftover teriyaki salmon (flaked)','160g'),I('Jasmine rice (cooked)','110g'),I('Edamame','60g'),I('Cucumber','60g'),I('Avocado','40g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'Microwave edamame 2 mins. Build bowl — rice, edamame, cucumber, avocado, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from Monday\'s dinner'),
    lunch: M('Leftover Beef & Rice Bowl',540,46,44,14,
      [I('Leftover beef strips','150g'),I('Brown rice (cooked)','120g'),I('Edamame','60g'),I('Cucumber','60g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp'),I('Avocado','40g')],
      'Reheat beef in pan or microwave. Build bowl — rice, edamame, cucumber, avocado, beef. Drizzle with soy and sesame oil.','♻️ Uses beef from last night\'s stir-fry'),
    dinner: M('Chicken Thigh Tray Bake',500,46,40,16,
      [I('Chicken thighs (skinless)','200g'),I('Sweet potato','150g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1.5 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Season chicken thighs. Nestle on top. Roast 200°C 30–35 mins until golden.','🍳 Cook extra chicken tonight — great cold for tomorrow\'s salad or wrap'),
    snack: M('Protein Smoothie',320,30,28,8,
      [I('Whey protein','1.5 scoops'),I('Banana','1 small'),I('Milk','250ml'),I('Peanut butter','1 tsp')],
      'Blend all ingredients 30–45 seconds until smooth.')
  },
  // Thursday
  {
    breakfast: M('Full Omelette Breakfast',470,42,20,22,
      [I('Eggs','3'),I('Egg whites','2'),I('Turkey breast','70g'),I('Mushrooms','60g'),I('Spinach','40g'),I('Feta','25g'),I('Olive oil','1 tsp')],
      'Cook mushrooms in oil 3 mins. Add turkey 1 min. Spinach until wilted. Pour in whisked eggs. Set on bottom 2–3 mins. Crumble feta over half. Fold and serve.'),
    lunch: M('Leftover Chicken Tray Bake Wrap',540,48,40,16,
      [I('Leftover chicken thigh (sliced)','180g'),I('Wholegrain wrap','1 large'),I('Romaine lettuce','50g'),I('Cherry tomatoes','60g'),I('Avocado','50g'),I('Light mayo','15g')],
      'Warm wrap. Layer mayo, lettuce, tomatoes, avocado and sliced chicken. Roll tightly.','♻️ Uses chicken from last night\'s tray bake'),
    dinner: M('Prawn & Avocado Pasta',500,40,44,16,
      [I('King prawns','210g'),I('Wholewheat pasta (cooked)','130g'),I('Avocado','50g'),I('Cherry tomatoes','80g'),I('Garlic','2 cloves'),I('Olive oil','1.5 tsp'),I('Chilli flakes','pinch')],
      'Cook pasta. Halve tomatoes, dice avocado. Fry garlic and chilli 30s. Add prawns 2–3 mins until pink. Add tomatoes 1 min. Toss in pasta. Remove from heat, fold in avocado gently.'),
    snack: M('Tuna Rice Cakes & Cottage Cheese',310,30,26,7,
      [I('Tuna in water','120g'),I('Rice cakes','3'),I('Cottage cheese','100g')],
      'Drain tuna, mix with cottage cheese, spoon onto rice cakes.')
  },
  // Friday
  {
    breakfast: M('Smoked Mackerel & Avocado Toast',480,38,28,22,
      [I('Smoked mackerel','90g'),I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','50g'),I('Spinach','40g'),I('Lemon juice','1 tsp')],
      'Toast bread. Mash avocado. Wilt spinach. Poach eggs 3–4 mins. Spread avocado on toast, add spinach and mackerel flakes, top with eggs.'),
    lunch: M('Chicken & Quinoa Bowl',540,48,42,16,
      [I('Chicken breast','190g'),I('Quinoa (cooked)','130g'),I('Cherry tomatoes','80g'),I('Cucumber','60g'),I('Feta','20g'),I('Olive oil','1 tsp'),I('Lemon juice','1 tbsp')],
      'Griddle seasoned chicken 5–6 mins per side. Rest and slice. Cook quinoa. Build bowl with quinoa, tomatoes, cucumber, feta. Top with chicken. Dress with olive oil and lemon.'),
    dinner: M('Salmon, Sweet Potato & Greens',500,44,42,18,
      [I('Salmon fillet','190g'),I('Sweet potato','150g'),I('Tenderstem broccoli','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Lemon & dill','to taste')],
      'Dice sweet potato, roast at 200°C 25 mins. Cook salmon skin-side down 3–4 mins until crispy, flip 2–3 mins more. Steam broccoli 4 mins. Wilt spinach. Squeeze lemon over everything.'),
    snack: M('Skyr & Mixed Nuts',300,24,22,12,
      [I('Skyr','200g'),I('Mixed nuts','25g'),I('Honey','1 tsp')],
      'No cooking needed.')
  }
];

// ═══════════════════════════════════════════════════════════════
// MEAT 2200
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_2200 = [
  // Monday
  {
    breakfast: M('Big Salmon & Avocado Breakfast',550,44,36,24,
      [I('Eggs','3'),I('Smoked salmon','90g'),I('Wholegrain toast','2 slices'),I('Avocado','60g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with lemon and salt. Toast bread. Wilt spinach. Scramble eggs slowly. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Chicken Fajita Bowl',580,52,52,14,
      [I('Chicken breast','200g'),I('Brown rice (cooked)','150g'),I('Bell peppers (mixed)','100g'),I('Red onion','60g'),I('Black beans (drained)','80g'),I('Salsa','3 tbsp'),I('Avocado','50g'),I('Greek yoghurt','40g')],
      'Season chicken with paprika, cumin, salt. Griddle 5–6 mins per side. Slice peppers and onion, cook in same pan 4 mins. Build bowl — rice, beans, peppers, chicken, avocado, salsa, yoghurt.','🍳 Cook double chicken & peppers tonight — covers tomorrow\'s wrap'),
    dinner: M('Teriyaki Salmon, Rice & Greens',570,46,44,20,
      [I('Salmon fillet','200g'),I('Jasmine rice (cooked)','140g'),I('Pak choi','80g'),I('Tenderstem broccoli','80g'),I('Soy sauce','2 tbsp'),I('Honey','1 tsp'),I('Garlic','1 clove'),I('Sesame oil','1 tsp')],
      'Mix soy, honey and garlic. Marinate salmon 5 mins. Sear in hot pan 3–4 mins per side, basting. Stir-fry pak choi and broccoli in sesame oil 3 mins. Serve over rice.','🍳 Cook double salmon tonight — covers Wednesday\'s breakfast bowl'),
    snack: M('High Protein Yoghurt & Nuts',330,26,26,13,
      [I('Greek yoghurt (0%)','240g'),I('Mixed nuts','25g'),I('Honey','1 tsp'),I('Berries','60g')],
      'No cooking needed.')
  },
  // Tuesday
  {
    breakfast: M('Protein Porridge',540,38,52,14,
      [I('Rolled oats','80g'),I('Milk','250ml'),I('Greek yoghurt','100g'),I('Banana','1 small'),I('Almond butter','1.5 tsp')],
      'Cook oats in milk 4–5 mins. Stir in yoghurt. Top with banana and almond butter.'),
    lunch: M('Chicken Fajita Wrap',580,52,46,16,
      [I('Leftover fajita chicken (sliced)','180g'),I('Wholegrain wrap','1 large'),I('Leftover peppers & onion','90g'),I('Salsa','3 tbsp'),I('Avocado','50g'),I('Romaine lettuce','40g'),I('Greek yoghurt','30g'),I('Cheddar (grated)','20g')],
      'Warm wrap in dry pan. Layer yoghurt, lettuce, peppers, avocado, chicken, salsa and cheese. Roll tightly.','♻️ Uses chicken & peppers from last night\'s fajita bowl'),
    dinner: M('Beef Burrito Bowl',570,52,48,15,
      [I('Lean beef mince (5%)','180g'),I('Brown rice (cooked)','130g'),I('Black beans (drained)','80g'),I('Salsa','3 tbsp'),I('Avocado','50g'),I('Lime juice','1 tbsp'),I('Cumin & paprika','1 tsp each'),I('Sour cream (light)','30g')],
      'Brown mince in hot pan 5–6 mins, season with cumin, paprika, salt. Build bowl — rice, beans, beef, avocado, salsa, sour cream and lime.','🍳 Cook double beef tonight — covers tomorrow\'s taco bowl'),
    snack: M('Protein Smoothie',350,34,30,9,
      [I('Whey protein','1.5 scoops'),I('Banana','1 small'),I('Milk','300ml'),I('Almond butter','1 tsp')],
      'Blend all ingredients 30–45 seconds.')
  },
  // Wednesday
  {
    breakfast: M('Teriyaki Salmon Rice Bowl',540,44,42,18,
      [I('Leftover teriyaki salmon (flaked)','170g'),I('Jasmine rice (cooked)','120g'),I('Edamame','60g'),I('Cucumber','60g'),I('Avocado','50g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'Microwave edamame 2 mins. Build bowl — rice, edamame, cucumber, avocado, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from Monday\'s dinner'),
    lunch: M('Beef Taco Bowl',570,50,48,15,
      [I('Leftover beef mince','160g'),I('Brown rice (cooked)','130g'),I('Black beans (drained)','70g'),I('Salsa','3 tbsp'),I('Lettuce','50g'),I('Avocado','40g'),I('Lime juice','1 tsp'),I('Sour cream (light)','25g')],
      'Reheat beef. Build bowl — rice, beans, lettuce, avocado, beef, salsa, sour cream and lime.','♻️ Uses beef mince from last night\'s burrito bowl'),
    dinner: M('Chicken Thigh Tray Bake',560,50,40,18,
      [I('Chicken thighs (skinless)','210g'),I('Sweet potato','160g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','1.5 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Season chicken thighs. Nestle on top. Roast 200°C 30–35 mins until golden.','🍳 Cook extra chicken — covers tomorrow\'s wrap or salad'),
    snack: M('Cottage Cheese, Seeds & Fruit',330,26,28,10,
      [I('Cottage cheese','220g'),I('Chia seeds','1 tsp'),I('Mixed berries','80g'),I('Rice cakes','2')],
      'No cooking needed.')
  },
  // Thursday
  {
    breakfast: M('Full Cooked Breakfast',520,44,30,26,
      [I('Eggs','3'),I('Turkey rashers','4'),I('Wholegrain toast','1 slice'),I('Mushrooms','80g'),I('Spinach','50g'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp')],
      'Grill turkey rashers 3–4 mins per side. Cook sliced mushrooms in pan 3–4 mins. Halve tomatoes, cook 2 mins. Wilt spinach. Scramble eggs over medium-low. Toast bread. Plate everything up.'),
    lunch: M('Leftover Chicken Tray Bake Bowl',570,50,44,17,
      [I('Leftover chicken thigh (sliced)','190g'),I('Brown rice (cooked)','130g'),I('Roasted peppers (from tray)','80g'),I('Spinach','40g'),I('Olive oil','1 tsp'),I('Lemon juice','1 tsp')],
      'Reheat chicken and veg. Build bowl — rice, roasted peppers, spinach, chicken. Drizzle with oil and lemon.','♻️ Uses chicken & veg from last night\'s tray bake'),
    dinner: M('Prawn Stir-Fry & Egg Noodles',560,48,46,15,
      [I('King prawns','220g'),I('Egg noodles (cooked)','130g'),I('Pak choi','80g'),I('Mushrooms','60g'),I('Soy sauce','2 tbsp'),I('Sesame oil','1.5 tsp'),I('Ginger & garlic','1 tsp each')],
      'Cook noodles. Stir-fry mushrooms 2 mins. Add pak choi, ginger, garlic 1 min. Add prawns 2–3 mins until pink. Pour in soy and sesame oil. Toss with noodles.'),
    snack: M('Skyr, Granola & Berries',350,28,34,8,
      [I('Skyr','220g'),I('Granola (low sugar)','30g'),I('Mixed berries','80g')],
      'No cooking needed.')
  },
  // Friday
  {
    breakfast: M('Smoked Mackerel & Eggs on Toast',540,42,34,24,
      [I('Smoked mackerel','110g'),I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','60g'),I('Spinach','40g'),I('Lemon juice','1 tsp')],
      'Toast bread. Mash avocado. Wilt spinach. Poach eggs 3–4 mins. Spread avocado on toast, add spinach and flaked mackerel, top with eggs.'),
    lunch: M('Chicken, Lentil & Veg Bowl',560,50,46,14,
      [I('Chicken breast','200g'),I('Green lentils (cooked)','120g'),I('Roasted peppers','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Cumin','1 tsp')],
      'Griddle seasoned chicken 5–6 mins per side. Rest and slice. Warm lentils with oil and cumin 2 mins. Wilt spinach in. Build bowl with lentils, roasted peppers and sliced chicken.'),
    dinner: M('Beef Meatballs & Spaghetti',560,50,48,14,
      [I('Lean beef mince (5%)','180g'),I('Wholewheat spaghetti (cooked)','130g'),I('Tinned tomatoes','200g'),I('Onion & garlic','to taste'),I('Italian herbs','1 tsp'),I('Olive oil','1 tsp'),I('Parmesan','20g')],
      'Roll mince into balls, brown in oil 8–10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes and herbs, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with spaghetti. Top with parmesan.'),
    snack: M('Tuna, Cottage Cheese & Crackers',330,34,22,8,
      [I('Tuna in water','120g'),I('Cottage cheese','100g'),I('Wholegrain crackers','4'),I('Cucumber','60g')],
      'Mix tuna and cottage cheese. Serve on crackers with cucumber.')
  }
];

// ═══════════════════════════════════════════════════════════════
// MEAT 2400
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_2400 = [
  // Monday
  {
    breakfast: M('Big Salmon Breakfast',600,46,36,28,
      [I('Eggs','3'),I('Smoked salmon','100g'),I('Wholegrain toast','2 slices'),I('Avocado','70g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with lemon, salt and pepper. Toast bread. Wilt spinach. Scramble eggs slowly. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Chicken Burrito Bowl',640,56,56,16,
      [I('Chicken breast','210g'),I('Brown rice (cooked)','160g'),I('Black beans (drained)','90g'),I('Salsa','3 tbsp'),I('Avocado','60g'),I('Lime juice','1 tbsp'),I('Smoked paprika & cumin','1 tsp each'),I('Greek yoghurt','40g'),I('Cheddar (grated)','15g')],
      'Season chicken with paprika, cumin, salt. Griddle 5–6 mins per side, rest and slice. Warm beans in pan 2 mins. Build bowl — rice, beans, chicken, avocado, salsa, yoghurt, cheese and lime.','🍳 Cook double chicken tonight — covers tomorrow\'s fajita wrap'),
    dinner: M('Teriyaki Salmon & Quinoa',620,48,48,22,
      [I('Salmon fillet','210g'),I('Quinoa (cooked)','150g'),I('Asparagus','100g'),I('Avocado','50g'),I('Soy sauce','2 tbsp'),I('Honey','1 tsp'),I('Garlic','1 clove'),I('Sesame oil','1.5 tsp')],
      'Mix soy, honey and garlic. Marinate salmon 5 mins. Sear in hot pan 3–4 mins per side, basting. Roast asparagus 200°C 10 mins. Slice avocado. Serve over quinoa.','🍳 Cook double salmon tonight — covers Wednesday\'s breakfast bowl'),
    snack: M('Protein Yoghurt & Nuts',360,28,28,14,
      [I('Greek yoghurt (0%)','250g'),I('Mixed nuts','30g'),I('Honey','1 tsp'),I('Banana','half')],
      'No cooking needed.')
  },
  // Tuesday
  {
    breakfast: M('Protein Porridge & Eggs',580,44,52,16,
      [I('Rolled oats','80g'),I('Milk','250ml'),I('Greek yoghurt','100g'),I('Eggs (hard boiled)','2'),I('Banana','half'),I('Peanut butter','1.5 tsp')],
      'Boil eggs 10 mins, cool and peel. Cook oats in milk 4–5 mins. Stir in yoghurt. Top with banana and peanut butter. Eat eggs on the side.'),
    lunch: M('Chicken Fajita Wrap',640,56,48,18,
      [I('Leftover burrito chicken (sliced)','190g'),I('Wholegrain wrap','1 large'),I('Bell pepper','80g'),I('Red onion','40g'),I('Salsa','3 tbsp'),I('Avocado','60g'),I('Greek yoghurt','30g'),I('Cheddar (grated)','20g')],
      'Quickly stir-fry pepper and onion 3 mins. Warm wrap in dry pan. Layer yoghurt, peppers, avocado, chicken, salsa and cheese. Roll tightly.','♻️ Uses chicken from last night\'s burrito bowl'),
    dinner: M('Beef & Broccoli Stir-Fry with Rice',620,52,54,16,
      [I('Lean beef strips','190g'),I('Brown rice (cooked)','160g'),I('Tenderstem broccoli','100g'),I('Snap peas','60g'),I('Soy sauce','2.5 tbsp'),I('Sesame oil','1.5 tsp'),I('Ginger & garlic','1 tsp each')],
      'Stir-fry beef in very hot wok — spread out, leave 1 min for colour, stir 2–3 mins until browned. Remove. Stir-fry broccoli and snap peas 3 mins. Add ginger and garlic 30s. Return beef, pour in soy and sesame oil, toss 1 min. Serve over rice.','🍳 Cook extra beef tonight — covers tomorrow\'s quick bowl'),
    snack: M('Protein Smoothie & Egg',380,36,32,10,
      [I('Whey protein','1.5 scoops'),I('Banana','1 small'),I('Milk','300ml'),I('Egg (hard boiled)','1')],
      'Blend smoothie 30–45 seconds. Boil egg 10 mins, cool before peeling.')
  },
  // Wednesday
  {
    breakfast: M('Teriyaki Salmon Rice Bowl',600,46,46,20,
      [I('Leftover teriyaki salmon (flaked)','180g'),I('Jasmine rice (cooked)','130g'),I('Edamame','60g'),I('Cucumber','60g'),I('Avocado','50g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'Microwave edamame 2 mins. Build bowl — rice, edamame, cucumber, avocado, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from Monday\'s dinner'),
    lunch: M('Beef Taco Bowl',630,52,52,16,
      [I('Leftover beef strips','170g'),I('Brown rice (cooked)','140g'),I('Black beans (drained)','80g'),I('Salsa','3 tbsp'),I('Lettuce','50g'),I('Avocado','50g'),I('Lime juice','1 tsp'),I('Sour cream (light)','30g')],
      'Reheat beef in pan 2 mins. Build bowl — rice, beans, lettuce, avocado, beef, salsa, sour cream and lime.','♻️ Uses beef from last night\'s stir-fry'),
    dinner: M('Chicken Thigh Tray Bake',620,52,50,18,
      [I('Chicken thighs (skinless)','220g'),I('Sweet potato','170g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','2 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Season chicken thighs. Nestle on top. Roast 200°C 30–35 mins until golden.','🍳 Cook extra chicken — covers tomorrow\'s wrap or salad'),
    snack: M('Skyr, Seeds & Fruit',380,30,36,10,
      [I('Skyr','230g'),I('Mixed seeds','20g'),I('Banana','half'),I('Granola','25g')],
      'No cooking needed.')
  },
  // Thursday
  {
    breakfast: M('Full Cooked Breakfast',590,48,36,26,
      [I('Eggs','3'),I('Turkey rashers','5'),I('Wholegrain toast','2 slices'),I('Mushrooms','80g'),I('Spinach','50g'),I('Cherry tomatoes','80g'),I('Olive oil','1 tsp')],
      'Grill turkey rashers 3–4 mins per side. Cook mushrooms and halved tomatoes in pan. Wilt spinach. Scramble eggs slowly. Toast bread. Plate everything up.'),
    lunch: M('Leftover Chicken Bowl',630,52,50,17,
      [I('Leftover chicken thigh (sliced)','200g'),I('Brown rice (cooked)','140g'),I('Roasted peppers (from tray)','80g'),I('Spinach','60g'),I('Olive oil','1.5 tsp'),I('Lemon juice','1 tsp')],
      'Reheat chicken and veg. Build bowl — rice, roasted peppers, spinach and chicken. Drizzle with oil and lemon.','♻️ Uses chicken & veg from last night\'s tray bake'),
    dinner: M('Prawn Curry & Rice',620,46,54,18,
      [I('King prawns','230g'),I('Brown rice (cooked)','160g'),I('Light coconut milk','100ml'),I('Spinach','60g'),I('Onion','half'),I('Curry paste (mild)','1.5 tbsp'),I('Olive oil','1 tsp'),I('Coriander','handful')],
      'Cook rice. Fry onion in oil 3–4 mins. Add curry paste 1 min. Pour in coconut milk and simmer. Add prawns 4–5 mins until pink. Stir in spinach until wilted. Top with coriander.'),
    snack: M('Cottage Cheese, Nuts & Toast',370,28,30,14,
      [I('Cottage cheese','220g'),I('Mixed nuts','25g'),I('Wholegrain toast','1 slice'),I('Cucumber','60g')],
      'Toast bread. Spread cottage cheese on toast and top with nuts.')
  },
  // Friday
  {
    breakfast: M('Salmon, Eggs & Porridge',580,44,44,20,
      [I('Smoked salmon','90g'),I('Eggs (scrambled)','2'),I('Rolled oats','60g'),I('Milk','200ml'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Cook oats in milk 4–5 mins, serve with banana. Scramble eggs slowly. Fold in salmon off heat. Serve alongside porridge.'),
    lunch: M('Tuna, Egg & Potato Salad',620,50,50,16,
      [I('Tuna in water','180g'),I('Eggs (hard boiled)','2'),I('New potatoes (cooked)','160g'),I('Green beans (blanched)','80g'),I('Mixed leaves','50g'),I('Olive oil','2 tsp'),I('Lemon juice','1 tbsp')],
      'Boil potatoes 15 mins, eggs 10 mins. Blanch green beans 3 mins. Arrange on leaves. Add halved potatoes, quartered eggs, green beans and flaked tuna. Dress with oil and lemon.'),
    dinner: M('Beef Meatballs, Pasta & Tomato Sauce',620,52,50,16,
      [I('Lean beef mince (5%)','190g'),I('Wholewheat pasta (cooked)','140g'),I('Tinned tomatoes','200g'),I('Onion & garlic','to taste'),I('Italian herbs','1 tsp'),I('Olive oil','1.5 tsp'),I('Parmesan','20g')],
      'Roll mince into 10–12 balls. Brown in oil 8–10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes and herbs, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with pasta. Top with parmesan.'),
    snack: M('Protein Yoghurt & Fruit',380,30,36,8,
      [I('Greek yoghurt (0%)','260g'),I('Mixed berries','100g'),I('Granola','30g'),I('Honey','1 tsp')],
      'No cooking needed.')
  }
];

// ═══════════════════════════════════════════════════════════════
// MEAT 2600
// ═══════════════════════════════════════════════════════════════
MPLANS.meat_2600 = [
  // Monday
  {
    breakfast: M('Loaded Salmon Breakfast',640,50,40,28,
      [I('Eggs','4'),I('Smoked salmon','100g'),I('Wholegrain toast','2 slices'),I('Avocado','70g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Mash avocado with lemon and salt. Toast bread. Wilt spinach. Scramble eggs slowly over medium-low. Spread avocado on toast, top with spinach, eggs and salmon.'),
    lunch: M('Chicken Burrito Bowl',680,58,60,17,
      [I('Chicken breast','230g'),I('Brown rice (cooked)','170g'),I('Black beans (drained)','90g'),I('Salsa','3 tbsp'),I('Avocado','60g'),I('Lime juice','1 tbsp'),I('Smoked paprika & cumin','1 tsp each'),I('Greek yoghurt','40g'),I('Cheddar (grated)','20g')],
      'Season chicken with paprika, cumin, salt. Griddle 5–6 mins per side. Rest and slice. Warm beans with cumin. Build bowl — rice, beans, chicken, avocado, salsa, yoghurt, cheese and lime.','🍳 Cook double chicken tonight — covers tomorrow\'s fajita wrap'),
    dinner: M('Teriyaki Salmon & Quinoa Power Bowl',670,52,52,24,
      [I('Salmon fillet','220g'),I('Quinoa (cooked)','160g'),I('Asparagus','100g'),I('Avocado','60g'),I('Edamame','60g'),I('Soy sauce','2 tbsp'),I('Honey','1 tsp'),I('Sesame oil','1.5 tsp')],
      'Mix soy, honey and garlic. Marinate salmon 5 mins. Sear in hot pan 3–4 mins per side, basting. Roast asparagus 200°C 10 mins. Microwave edamame 2 mins. Slice avocado. Build bowl.','🍳 Cook double salmon tonight — covers Wednesday\'s breakfast bowl'),
    snack: M('Protein Shake & Nuts',400,36,30,16,
      [I('Whey protein','2 scoops'),I('Milk','300ml'),I('Banana','half'),I('Mixed nuts','25g')],
      'Blend protein, milk and banana 30–45 seconds. Eat nuts on the side.')
  },
  // Tuesday
  {
    breakfast: M('Turkey, Eggs & Porridge',620,48,52,16,
      [I('Eggs','3'),I('Turkey breast (sliced)','80g'),I('Rolled oats','80g'),I('Milk','250ml'),I('Banana','half'),I('Almond butter','1.5 tsp')],
      'Cook oats in milk 4–5 mins. Stir in almond butter. Top with banana. Scramble eggs with turkey slices in separate pan over medium-low. Serve alongside porridge.'),
    lunch: M('Chicken Fajita Wrap',680,58,52,18,
      [I('Leftover burrito chicken (sliced)','210g'),I('Wholegrain wrap','1 large'),I('Bell pepper','80g'),I('Red onion','40g'),I('Salsa','3 tbsp'),I('Avocado','60g'),I('Greek yoghurt','30g'),I('Cheddar (grated)','20g')],
      'Quickly stir-fry pepper and onion 3 mins. Warm wrap in dry pan. Layer yoghurt, peppers, avocado, chicken, salsa and cheese. Roll tightly.','♻️ Uses chicken from last night\'s burrito bowl'),
    dinner: M('Beef Burrito Bowl',660,54,58,18,
      [I('Lean beef mince (5%)','200g'),I('Brown rice (cooked)','170g'),I('Black beans (drained)','90g'),I('Salsa','3 tbsp'),I('Avocado','60g'),I('Lime juice','1 tbsp'),I('Cumin & paprika','1 tsp each'),I('Sour cream (light)','30g'),I('Cheddar (grated)','15g')],
      'Brown mince in hot pan 5–6 mins, season with cumin, paprika, salt. Build bowl — rice, beans, beef, avocado, salsa, sour cream, cheese and lime.','🍳 Cook double beef tonight — covers tomorrow\'s taco bowl'),
    snack: M('Big Cottage Cheese Bowl',400,34,34,12,
      [I('Cottage cheese','250g'),I('Banana','1 small'),I('Mixed nuts','20g'),I('Honey','1 tsp'),I('Chia seeds','1 tsp')],
      'No cooking needed.')
  },
  // Wednesday
  {
    breakfast: M('Teriyaki Salmon Rice Bowl',640,50,50,22,
      [I('Leftover teriyaki salmon (flaked)','200g'),I('Jasmine rice (cooked)','140g'),I('Edamame','60g'),I('Cucumber','60g'),I('Avocado','60g'),I('Soy sauce','1 tbsp'),I('Sesame oil','1 tsp')],
      'Microwave edamame 2 mins. Build bowl — rice, edamame, cucumber, avocado, flaked salmon. Drizzle with soy and sesame oil.','♻️ Uses salmon from Monday\'s dinner'),
    lunch: M('Beef Taco Bowl',660,54,56,17,
      [I('Leftover beef mince','180g'),I('Brown rice (cooked)','150g'),I('Black beans (drained)','80g'),I('Salsa','3 tbsp'),I('Lettuce','50g'),I('Avocado','60g'),I('Lime juice','1 tsp'),I('Sour cream (light)','30g')],
      'Reheat beef. Build bowl — rice, beans, lettuce, avocado, beef, salsa, sour cream and lime.','♻️ Uses beef mince from last night\'s burrito bowl'),
    dinner: M('Chicken Thigh Tray Bake',650,54,52,20,
      [I('Chicken thighs (skinless)','230g'),I('Sweet potato','180g'),I('Peppers','100g'),I('Red onion','60g'),I('Olive oil','2 tsp'),I('Smoked paprika & cumin','1 tsp each')],
      'Toss veg in oil and spices. Season chicken thighs. Nestle on top. Roast 200°C 30–35 mins until golden.','🍳 Cook extra chicken tonight — covers tomorrow\'s lunch'),
    snack: M('Protein Yoghurt & Fruit',420,34,38,11,
      [I('Skyr','250g'),I('Whey protein','half scoop'),I('Mixed berries','100g'),I('Granola','30g')],
      'Mix protein powder into skyr until smooth. Top with berries and granola.')
  },
  // Thursday
  {
    breakfast: M('Full Cooked Breakfast',630,50,36,28,
      [I('Eggs','3'),I('Turkey rashers','5'),I('Wholegrain toast','2 slices'),I('Mushrooms','80g'),I('Cherry tomatoes','80g'),I('Spinach','50g'),I('Olive oil','1 tsp')],
      'Grill turkey rashers 3–4 mins per side until crispy. Cook mushrooms and halved tomatoes in pan. Wilt spinach. Scramble eggs over medium-low. Toast bread. Plate everything up.'),
    lunch: M('Leftover Chicken & Pasta',670,56,54,18,
      [I('Leftover chicken thigh (sliced)','210g'),I('Wholewheat pasta (cooked)','140g'),I('Pesto','20g'),I('Cherry tomatoes','80g'),I('Spinach','60g'),I('Parmesan','20g')],
      'Cook pasta. Add tomatoes to pan 1 min, spinach and wilt 30s. Toss pasta with pesto and a splash of pasta water. Add spinach, tomatoes and sliced chicken on top. Finish with parmesan.','♻️ Uses chicken from last night\'s tray bake'),
    dinner: M('Prawn Curry, Rice & Naan',660,50,60,20,
      [I('King prawns','240g'),I('Brown rice (cooked)','160g'),I('Light coconut milk','120ml'),I('Spinach','60g'),I('Onion','half'),I('Curry paste (mild)','1.5 tbsp'),I('Mini wholegrain naan','1'),I('Coriander','handful')],
      'Cook rice. Warm naan in dry pan 3–4 mins. Fry onion 3–4 mins. Add curry paste 1 min. Pour in coconut milk. Add prawns 4–5 mins until pink. Stir in spinach. Season and top with coriander.'),
    snack: M('Tuna, Cottage Cheese & Rice Cakes',400,40,28,10,
      [I('Tuna in water','160g'),I('Cottage cheese','150g'),I('Rice cakes','4'),I('Cucumber','80g')],
      'Drain tuna, mix with cottage cheese and black pepper. Spoon onto rice cakes.')
  },
  // Friday
  {
    breakfast: M('Salmon & Porridge Combo',630,48,50,22,
      [I('Smoked salmon','100g'),I('Eggs (scrambled)','2'),I('Rolled oats','70g'),I('Milk','220ml'),I('Banana','half'),I('Almond butter','1.5 tsp')],
      'Cook oats in milk 4–5 mins, stir in almond butter. Serve with banana. Scramble eggs slowly. Fold in salmon off heat. Serve eggs and salmon alongside porridge.'),
    lunch: M('Chicken, Pasta & Pesto',670,54,54,18,
      [I('Chicken breast','220g'),I('Wholewheat pasta (cooked)','150g'),I('Pesto','20g'),I('Cherry tomatoes','80g'),I('Parmesan','20g'),I('Spinach','60g')],
      'Cook pasta. Griddle seasoned chicken 5–6 mins per side. Rest and slice. Add tomatoes to pan 1 min, spinach 30s. Toss pasta with pesto, splash of pasta water, tomatoes and spinach. Top with chicken and parmesan.'),
    dinner: M('Beef Meatballs & Spaghetti',660,54,52,18,
      [I('Lean beef mince (5%)','210g'),I('Wholewheat spaghetti (cooked)','150g'),I('Tinned tomatoes','200g'),I('Onion & garlic','to taste'),I('Italian herbs','1 tsp'),I('Olive oil','1.5 tsp'),I('Parmesan','20g')],
      'Roll mince into 12–14 balls. Brown in oil 8–10 mins. Remove. Fry onion 3 mins, garlic 1 min, add tomatoes and herbs, simmer 5 mins. Return meatballs, cover and cook 10 mins. Toss with spaghetti. Top with parmesan.'),
    snack: M('Big Protein Bowl',400,34,36,11,
      [I('Greek yoghurt (0%)','260g'),I('Whey protein','half scoop'),I('Mixed berries','100g'),I('Granola','30g'),I('Honey','1 tsp')],
      'Mix protein powder into yoghurt until smooth. Top with fruit and granola.')
  }
];

// ═══════════════════════════════════════════════════════════════
// VEGGIE PLANS
// ═══════════════════════════════════════════════════════════════
MPLANS.veggie_1400 = [
  {
    breakfast: M('Smashed Avocado & Poached Eggs',340,18,26,18,
      [I('Eggs (poached)','2'),I('Wholegrain toast','2 slices'),I('Avocado','60g'),I('Cherry tomatoes','60g'),I('Feta','20g'),I('Chilli flakes','pinch')],
      'Toast bread. Mash avocado with salt, pepper and lemon. Poach eggs 3–4 mins. Spread avocado on toast, top with halved tomatoes, crumbled feta, chilli flakes and eggs.'),
    lunch: M('Crispy Chickpea & Quinoa Bowl',380,22,46,12,
      [I('Chickpeas (drained)','150g'),I('Quinoa (cooked)','100g'),I('Roasted peppers','80g'),I('Spinach','60g'),I('Lemon juice','1 tbsp'),I('Olive oil','1 tsp'),I('Cumin & paprika','1 tsp each')],
      'Toss chickpeas in oil, cumin and paprika. Roast at 200°C 20–25 mins until crispy. Cook quinoa. Build bowl — quinoa, spinach, roasted peppers, crispy chickpeas. Dress with lemon.','🍳 Roast double chickpeas — covers tomorrow\'s wrap filling'),
    dinner: M('Veggie Fajita Bowl',370,18,48,12,
      [I('Black beans (drained)','120g'),I('Brown rice (cooked)','90g'),I('Bell peppers (mixed)','100g'),I('Red onion','60g'),I('Smoked paprika & cumin','1 tsp each'),I('Salsa','3 tbsp'),I('Avocado','40g'),I('Greek yoghurt','30g'),I('Olive oil','1 tsp')],
      'Slice peppers and onion, cook in oil with paprika and cumin 5–6 mins. Warm beans in pan 2 mins with cumin. Build bowl — rice, beans, peppers, avocado, salsa, yoghurt.'),
    snack: M('Cottage Cheese & Almonds',200,16,12,9,
      [I('Cottage cheese','150g'),I('Almonds','15g'),I('Berries','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Tofu Scramble on Toast',340,24,24,14,
      [I('Firm tofu','150g'),I('Wholegrain toast','1 slice'),I('Spinach','50g'),I('Cherry tomatoes','60g'),I('Turmeric','half tsp'),I('Nutritional yeast','1 tbsp'),I('Olive oil','1 tsp')],
      'Press tofu between paper towels 5 mins, crumble. Cook in hot pan with oil — leave 2 mins to brown. Add turmeric and nutritional yeast, stir and cook 3 more mins. Add tomatoes 1 min, spinach until wilted. Season. Serve on toast.'),
    lunch: M('Leftover Crispy Chickpea Wrap',375,20,42,12,
      [I('Leftover roasted chickpeas','120g'),I('Wholegrain wrap','1 medium'),I('Hummus','30g'),I('Roasted peppers','60g'),I('Spinach','40g'),I('Lemon juice','1 tsp')],
      'Warm wrap in dry pan 20s. Spread hummus, add spinach, roasted peppers and crispy chickpeas. Squeeze lemon. Roll tightly.','♻️ Uses chickpeas from yesterday\'s quinoa bowl'),
    dinner: M('Paneer & Chickpea Curry',370,22,38,14,
      [I('Paneer','90g'),I('Chickpeas (drained)','100g'),I('Tinned tomatoes','200g'),I('Onion','half'),I('Spinach','60g'),I('Curry paste (mild)','1 tbsp'),I('Olive oil','1 tsp')],
      'Fry diced paneer in oil 2–3 mins per side until golden. Remove. Fry onion 3 mins, add curry paste 1 min. Add tomatoes and chickpeas, simmer 10 mins. Return paneer, stir in spinach until wilted.','🍳 Cook extra paneer — covers tomorrow\'s rice bowl'),
    snack: M('Greek Yoghurt & Seeds',200,14,16,8,
      [I('Greek yoghurt (0%)','150g'),I('Mixed seeds','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  },
  {
    breakfast: M('Protein Oats',340,24,38,9,
      [I('Rolled oats','60g'),I('Milk','200ml'),I('Greek yoghurt','80g'),I('Banana','half'),I('Almond butter','1 tsp')],
      'Cook oats in milk 4–5 mins. Stir in yoghurt off heat. Top with banana and almond butter.'),
    lunch: M('Paneer & Spinach Rice Bowl',380,24,38,14,
      [I('Leftover paneer (from curry)','80g'),I('Brown rice (cooked)','100g'),I('Spinach','60g'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp'),I('Lemon juice','1 tsp')],
      'Warm paneer in pan 2 mins. Wilt spinach in dry pan. Build bowl — rice, spinach, tomatoes, paneer. Drizzle with oil and lemon.','♻️ Uses paneer from last night\'s curry'),
    dinner: M('Halloumi & Roasted Veg Bowl',370,22,34,16,
      [I('Halloumi','70g'),I('Quinoa (cooked)','90g'),I('Courgette','80g'),I('Bell pepper','60g'),I('Cherry tomatoes','60g'),I('Olive oil','1 tsp'),I('Lemon & herbs','to taste')],
      'Dice courgette and pepper, toss in oil and roast 200°C 20 mins. Slice halloumi, cook in dry pan 2–3 mins per side until golden. Build bowl — quinoa, roasted veg, halloumi. Squeeze lemon.'),
    snack: M('Boiled Eggs & Apple',190,14,16,8,
      [I('Eggs (hard boiled)','2'),I('Apple','1 small')],
      'Boil eggs 10 mins. Cool in cold water before peeling.')
  },
  {
    breakfast: M('Egg & Spinach Toast',330,20,24,14,
      [I('Eggs (scrambled)','2'),I('Wholegrain toast','1 slice'),I('Spinach','50g'),I('Cherry tomatoes','60g'),I('Feta','20g'),I('Olive oil','1 tsp')],
      'Cook tomatoes in oil 1 min. Add spinach until wilted. Scramble eggs separately over medium-low. Toast bread. Layer spinach and tomatoes on toast, top with eggs and crumbled feta.'),
    lunch: M('Lentil & Veg Soup with Bread',370,20,48,8,
      [I('Green lentils (dried)','80g'),I('Carrot','80g'),I('Celery','40g'),I('Onion','half'),I('Vegetable stock','600ml'),I('Cumin & coriander','1 tsp each'),I('Wholegrain bread','1 slice')],
      'Dice veg. Soften in oil 5 mins. Add spices 30s. Add dry lentils and stock. Simmer 25–30 mins. Partially blend for texture. Season. Serve with bread.','🍳 Make a big batch — lunch covers tomorrow too'),
    dinner: M('Tofu & Veggie Stir-Fry',380,24,36,14,
      [I('Firm tofu','160g'),I('Brown rice (cooked)','80g'),I('Tenderstem broccoli','80g'),I('Snap peas','60g'),I('Soy sauce','1.5 tbsp'),I('Sesame oil','1 tsp'),I('Ginger','1 tsp')],
      'Press and cube tofu. Pan-fry in oil over high heat 3–4 mins per side until golden. Remove. Stir-fry broccoli and snap peas 3 mins. Add ginger, soy and sesame oil. Return tofu, toss 1 min. Serve over rice.'),
    snack: M('Cottage Cheese & Rice Cakes',190,16,18,4,
      [I('Cottage cheese','150g'),I('Rice cakes','2'),I('Cucumber','60g')],
      'No cooking needed.')
  },
  {
    breakfast: M('Overnight Oats',330,20,38,9,
      [I('Rolled oats','60g'),I('Greek yoghurt (0%)','120g'),I('Milk','80ml'),I('Chia seeds','1 tsp'),I('Berries','60g'),I('Honey','1 tsp')],
      'Night before: combine oats, yoghurt, milk and chia seeds in a jar. Refrigerate. In the morning, stir and top with berries and honey.'),
    lunch: M('Leftover Lentil Soup',365,20,46,8,
      [I('Leftover lentil soup','1 portion'),I('Wholegrain bread','1 slice')],
      'Reheat soup on the hob or microwave until piping hot. Serve with toasted bread.','♻️ Uses lentil soup from yesterday'),
    dinner: M('Egg & Vegetable Frittata',360,26,20,18,
      [I('Eggs','3'),I('Egg whites','2'),I('Courgette','80g'),I('Bell pepper','60g'),I('Spinach','50g'),I('Feta','25g'),I('Olive oil','1 tsp')],
      'Cook diced courgette and pepper in oil 3–4 mins. Add spinach until wilted. Pour in whisked eggs. Crumble feta on top. Cook on stovetop 3–4 mins. Transfer to oven at 180°C 8–10 mins until golden.'),
    snack: M('Skyr & Walnuts',200,16,14,8,
      [I('Skyr','150g'),I('Walnuts','15g'),I('Honey','1 tsp')],
      'No cooking needed.')
  }
];

// ─── VEGGIE 1600–2600: scaled from veggie_1400 with proper structure ───
// Scale factors per tier
const VSCALES = {1600:1.11,1800:1.23,2000:1.37,2200:1.50,2400:1.63,2600:1.76};

['1600','1800','2000','2200','2400','2600'].forEach(tier => {
  const s = VSCALES[parseInt(tier)];
  MPLANS[`veggie_${tier}`] = MPLANS.veggie_1400.map(day => ({
    breakfast: {...day.breakfast, cals: Math.round(day.breakfast.cals * s), p: Math.round(day.breakfast.p * s), c: Math.round(day.breakfast.c * s), f: Math.round(day.breakfast.f * s)},
    lunch:     {...day.lunch,     cals: Math.round(day.lunch.cals     * s), p: Math.round(day.lunch.p     * s), c: Math.round(day.lunch.c     * s), f: Math.round(day.lunch.f     * s)},
    dinner:    {...day.dinner,    cals: Math.round(day.dinner.cals    * s), p: Math.round(day.dinner.p    * s), c: Math.round(day.dinner.c    * s), f: Math.round(day.dinner.f    * s)},
    snack:     {...day.snack,     cals: Math.round(day.snack.cals     * s), p: Math.round(day.snack.p     * s), c: Math.round(day.snack.c     * s), f: Math.round(day.snack.f     * s)}
  }));
});
