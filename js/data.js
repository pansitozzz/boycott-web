/* BOYCOTT · Datos de la carta, categorías y enlaces
   Se carga como script clásico, en orden desde index.html. */

/* BOYCOTT WEB 2026 — prototipo conceptual independiente. Sin pagos ni datos reales. */
const APP = document.querySelector('#app');
const Rappi='https://www.rappi.com.pe/restaurantes/52553-boycott';
const PedidosYa='https://www.pedidosya.com.pe/restaurantes/lima/boycott-e2bcf797-3643-4c75-befb-9ba78c9649fb-menu';
const Linktree='https://linktr.ee/boycott.pe';
const Maps={miraflores:'https://www.google.com/maps/search/?api=1&query=-12.1197894%2C-77.0215396',surco:'https://www.google.com/maps/search/?api=1&query=-12.1060681%2C-76.9714036'};
const products=[
 {slug:'classic',name:'Classic',cat:'OG',price:'29.90',ingredients:['Carne Black Angus®','Queso cheddar','Cebolla fresca','Lechuga','Tomate','Pickles','Salsa Golden'],desc:'La clásica con todos sus elementos. Sabor directo, sin complicaciones.',tag:'BOYCOTT OG'},
 {slug:'cheese',name:'Cheese',cat:'OG',price:'29.90',ingredients:['Carne Black Angus®','Queso cheddar','Pickles','Salsa Outlaw'],desc:'El queso y la carne al centro de todo.',tag:'BOYCOTT OG'},
 {slug:'bacon-cheese',name:'Bacon Cheese',cat:'OG',price:'34.90',ingredients:['Carne Black Angus®','Queso cheddar','Tocino','Pickles','Salsa Outlaw'],desc:'La fórmula Cheese con un giro de tocino.',tag:'BOYCOTT OG'},
 {slug:'guadalajara-hot-springs',name:'Guadalajara Hot Springs',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Mayonesa','Guacamole','Tocino','Ketchup jalapeño','Totopos'],desc:'Guacamole y totopos con un toque picante.',tag:'BOYCOTT PLACES'},
 {slug:'vail-sour-ham',name:'Vail Sour Ham',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Lechuga','Jamón serrano','Tomate','Salsa Golden'],desc:'Una combinación con jamón serrano y salsa Golden.',tag:'BOYCOTT PLACES'},
 {slug:'wisconsin-fire',name:'Wisconsin Fire',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Jalapeños','Tártara peruana'],desc:'Jalapeños y tártara peruana en una misma burger.',tag:'BOYCOTT PLACES'},
 {slug:'oklahoma-caramel',name:'Oklahoma Caramel',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Tocino','Cebolla caramelizada','Salsa Bandit'],desc:'El contraste del tocino con la cebolla caramelizada.',tag:'BOYCOTT PLACES'},
 {slug:'kyoto-sweet-shoyu',name:'Kyoto Sweet Shoyu',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Mayonesa','Poro tempura','Sweet Shoyu'],desc:'Poro tempura y Sweet Shoyu.',tag:'BOYCOTT PLACES'},
 {slug:'osaka-super-cheese',name:'Osaka Super Cheese',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Mayo spicy','Costra de queso','Relish'],desc:'Para quienes buscan protagonismo absoluto del queso.',tag:'BOYCOTT PLACES'},
 {slug:'new-jersey',name:'New Jersey',cat:'PLACES',price:'34.90',ingredients:['Carne Black Angus®','Queso','Champiñones caramelizados con miel de maple','Mayonesa','Mantequilla con ajo asado'],desc:'Champiñones caramelizados y notas de ajo asado.',tag:'BOYCOTT PLACES'},
 {slug:'bacon-crunchy',name:'Bacon Crunchy',cat:'PRIME',price:'34.90',ingredients:['Carne Black Angus®','Queso','Cebolla súper crunchy','Tocino','Salsa Bandit'],desc:'Cebolla crujiente, tocino y Salsa Bandit.',tag:'PRIME BOYCOTT'},
 {slug:'royal-truffle',name:'Royal Truffle',cat:'PRIME',price:'34.90',ingredients:['Carne Black Angus®','Queso','Huevo súper crunchy','Mayo trufada'],desc:'Huevo crocante y mayonesa trufada.',tag:'PRIME BOYCOTT'},
 {slug:'hot-bbq-bacon',name:'Hot BBQ Bacon',cat:'PRIME',price:'34.90',ingredients:['Carne Black Angus®','Tocino','Queso','Cebolla smash','BBQ','Tomate cherry','Jalapeños','Relish'],desc:'Barbacoa, bacon y un punto de jalapeño.',tag:'PRIME BOYCOTT'},
 {slug:'chicken-crunchy',name:'Chicken Crunchy',cat:'CHICKEN',price:'29.90',ingredients:['Chicken tenders','Queso cheddar','Salsa Honey Bee'],desc:'Tenders de pollo con salsa Honey Bee.',tag:'CHICKEN SANDWICH'},
 {slug:'chicken-bbq',name:'Chicken BBQ',cat:'CHICKEN',price:'34.90',ingredients:['Chicken tenders','Queso cheddar','Bacon','Relish','Tomate cherry','Lechuga','Salsa BBQ','Salsa Bandit'],desc:'Pollo crujiente con dos salsas.',tag:'CHICKEN SANDWICH'},
 {slug:'nashville-hot-chicken',name:'Nashville Hot Chicken',cat:'CHICKEN',price:'34.90',ingredients:['Chicken tenders','Salsa picante','Pickles','Jalapeños','Ensalada de col','Mayonesa','Salsa Honey Bee'],desc:'La alternativa de pollo con carácter picante.',tag:'CHICKEN SANDWICH'},
 {slug:'original-wrap',name:'Original Wrap',cat:'WRAPS',price:'29.90',ingredients:['Chicken tenders','Queso cheddar','Tomate','Lechuga','Pickles','Salsa Golden'],desc:'Tenders con verduras y salsa Golden en formato wrap.',tag:'WRAPS'},
 {slug:'cheese-bacon-wrap',name:'Cheese Bacon Wrap',cat:'WRAPS',price:'34.90',ingredients:['Chicken tenders','Queso cheddar','Cebolla grillada','Tomate cherry','Tocino','Lechuga','Relish','Salsa Bandit'],desc:'Un wrap de pollo con queso y bacon.',tag:'WRAPS'},
 {slug:'truffle-wrap',name:'Truffle Wrap',cat:'WRAPS',price:'34.90',ingredients:['Chicken tenders','Queso cheddar','Cebolla caramelizada','Jamón serrano','Mayo trufada'],desc:'Toques de trufa, serrano y cebolla caramelizada.',tag:'WRAPS'},
 {slug:'fries',name:'Fries',cat:'SIDES',price:'10.00',ingredients:['Papas fritas'],desc:'Un acompañamiento clásico.',tag:'SIDES',type:'fries'},
 {slug:'fries-bacon-caramel',name:'Fries Bacon Caramel',cat:'SIDES',price:'24.90',ingredients:['Tocino','Cebolla caramelizada','Cheddar fundido','Salsa Outlaw'],desc:'Papas acompañadas de tocino y cheddar.',tag:'SIDES',type:'fries'},
 {slug:'nashville-hot-wrap',name:'Nashville Hot Wrap',cat:'WRAPS',price:'34.90',ingredients:['Chicken tenders marinados en salsa picante','Queso cheddar','Pickles','Jalapeños','Ensalada de col','Mayonesa','Salsa Honey Bee'],desc:'Un wrap con tenders picantes y honey bee.',tag:'WRAPS'},
 {slug:'guadalajara-hot-wrap',name:'Guadalajara Hot Wrap',cat:'WRAPS',price:'34.90',ingredients:['Chicken tenders','Queso cheddar','Mayonesa','Guacamole','Tocino','Ketchup jalapeño','Totopos'],desc:'Guacamole, totopos y pollo en formato wrap.',tag:'WRAPS'},
 {slug:'fries-beef-overload',name:'Fries Beef Overload',cat:'SIDES',price:'24.90',ingredients:['Carne mechada','Cheddar fundido','Salsa Bandit'],desc:'Papas con carne mechada, queso y Bandit.',tag:'SIDES',type:'fries'},
 {slug:'fries-truffle',name:'Fries Truffle',cat:'SIDES',price:'24.90',ingredients:['Huevo frito','Mayo trufada','Jamón serrano','Chives'],desc:'Papas con huevo, trufa y jamón serrano.',tag:'SIDES',type:'fries'},
 {slug:'salchifries',name:'Salchifries',cat:'SIDES',price:'24.90',ingredients:['Hotdog frankfurter','Huevo frito super crunchy'],desc:'Salchipapas con huevo crujiente.',tag:'SIDES',type:'fries'},
 {slug:'onion-rings',name:'Onion Rings',cat:'SIDES',price:'24.90',ingredients:['Aros de cebolla'],desc:'Aros de cebolla.',tag:'SIDES',type:'fries'},
 {slug:'nachos',name:'Nachos',cat:'SIDES',price:'24.90',ingredients:['Totopos','Guacamole','Cheddar fundido'],desc:'Totopos con guacamole y queso.',tag:'SIDES',type:'fries'},
 {slug:'gaseosa-lata',name:'Gaseosas en lata',cat:'DRINKS',price:'9.90',ingredients:['Gaseosa en lata'],desc:'Bebida en lata.',tag:'BEBIDAS',type:'drink'},
 {slug:'agua',name:'Agua',cat:'DRINKS',price:'6.90',ingredients:['Agua sin gas o con gas'],desc:'Agua, según carta de referencia.',tag:'BEBIDAS',type:'drink'},
 {slug:'sparkling-sodas',name:'Sparkling Sodas / Jolly Rancher',cat:'DRINKS',price:'9.90',ingredients:['Bebidas sparkling'],desc:'Selección de sodas especiales.',tag:'BEBIDAS',type:'drink'},
 {slug:'boycott-drinks',name:'Boycott Drinks',cat:'DRINKS',price:'6.90',ingredients:['Chicha morada / Coconut Lemonade / Pink Lemonade / Piña Colada / Hibiscus Maracuyá'],desc:'Variedades de bebidas de la carta de referencia.',tag:'BEBIDAS',type:'drink'}
];
const categories=[['ALL','TODAS'],['OG','BOYCOTT OG'],['PLACES','BOYCOTT PLACES'],['PRIME','PRIME BOYCOTT'],['CHICKEN','CHICKEN'],['WRAPS','WRAPS'],['SIDES','SIDES'],['DRINKS','DRINKS']];
const escapeHTML=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[c]));
