// Teléfono de WhatsApp destino para compras (con código de país, p.ej. 502)
const WHATSAPP_PHONE = '50252050020';

// Mapeo de fallbacks para imágenes locales que no existan aún
const imageFallbacks = {
    // Árabe
    'yara': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    'khamrah': 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    'clubdenuit': 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80',
    'hawas': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    'asad': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'amberoud': 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
    // Diseñador
    'sauvage': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    'bleu': 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    'lemale': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    'ysly': 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80',
    'eros': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'gio': 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
    'coco': 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    'libre': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    // Nicho
    'aventus': 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80',
    'layton': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    'baccarat': 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    'naxos': 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80',
    'reflection': 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    'byredo': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80'
};

// Escucha global de errores de carga de imágenes (Fase de captura)
window.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
        const src = e.target.getAttribute('src') || '';
        // Intentar deducir la clave desde el nombre del archivo
        const parts = src.split('/');
        const filename = parts.pop();
        if (filename) {
            const key = filename.split('.')[0];
            if (imageFallbacks[key] && e.target.src !== imageFallbacks[key]) {
                console.warn(`[Image Fallback] Cargando fallback de Unsplash para la imagen faltante: ${filename}`);
                e.target.src = imageFallbacks[key];
            }
        }
    }
}, true);

// Base de Datos de Perfumes (Para cargar los modales de detalle)
const productsDatabase = {
    // ÁRABE
    'yara': {
        brand: 'LATTAFA',
        name: 'Yara (Pink Edition)',
        type: 'EAU DE PARFUM',
        price: 299.00,
        image: 'imagenes/yara.png',
        desc: 'Yara de Lattafa es una fragancia dulce y ultra-femenina que combina notas de mandarina y heliotropo con un corazón cremoso de orquídea de vainilla y acordes tropicales, culminando en un cálido fondo de sándalo y almizcle. Es uno de los perfumes árabes más virales y buscados del mundo.'
    },
    'khamrah': {
        brand: 'LATTAFA',
        name: 'Khamrah (Unisex)',
        type: 'EAU DE PARFUM',
        price: 389.00,
        image: 'imagenes/khamrah.png',
        desc: 'Khamrah de Lattafa es una lujosa fragancia unisex oriental especiada. Se abre con notas ricas de canela, cardamomo y bergamota, seguidas de un corazón dulce de praliné, dátiles y nardos, sobre una base opulenta de vainilla, madera de ámbar, mirra y haba tonka.'
    },
    'clubdenuit': {
        brand: 'ARMAF',
        name: 'Club de Nuit Intense Man',
        type: 'EAU DE TOILETTE',
        price: 329.00,
        image: 'imagenes/clubdenuit.png',
        desc: 'Club de Nuit Intense Man de Armaf es una fragancia amaderada especiada icónica para hombres. Se abre con notas cítricas frescas de limón, piña, bergamota y grosellas negras, evolucionando hacia un corazón de abedul y jazmín, y cerrando con una estela ahumada de almizcle, pachulí y ámbar gris.'
    },
    'hawas': {
        brand: 'RASASI',
        name: 'Hawas For Him (Oud Edition)',
        type: 'EAU DE PARFUM',
        price: 499.00,
        image: 'imagenes/hawas.png',
        desc: 'Hawas for Him de Rasasi encarna la fuerza y el vigor masculino. Esta fragancia acuática y aromática combina notas de manzana, bergamota y canela con acordes marinos refrescantes, melón y violeta, finalizando en un fondo sensual de sándalo, cedro y ámbar gris.'
    },
    'asad': {
        brand: 'LATTAFA',
        name: 'Asad (Eau de Parfum)',
        type: 'EAU DE PARFUM',
        price: 289.00,
        image: 'imagenes/asad.png',
        desc: 'Lattafa Asad es una fragancia oriental masculina muy elogiada por su carácter audaz y estela potente. Abre con notas de pimienta negra y piña, dando paso a un corazón de café y pachulí, y cerrando en una rica base de vainilla, ámbar seco y madera de sándalo.'
    },
    'amberoud': {
        brand: 'AL HARAMAIN',
        name: 'Amber Oud Gold Edition',
        type: 'EAU DE PARFUM',
        price: 549.00,
        image: 'imagenes/amberoud.png',
        desc: 'Amber Oud Gold Edition de Al Haramain es una fragancia oriental de vainilla para hombres y mujeres de alta gama. Destaca por un inicio dulce y frutal de melón y piña, que evoluciona hacia notas amaderadas y de ámbar, culminando en un fondo de vainilla y almizcle.'
    },

    // DISEÑADOR
    'sauvage': {
        brand: 'DIOR',
        name: 'Sauvage EDP',
        type: 'EAU DE PARFUM',
        price: 1199.00,
        image: 'imagenes/sauvage.jpg',
        desc: 'Dior Sauvage es un manifiesto de libertad masculina. Su composición fresca y amaderada combina notas de bergamota de Calabria jugosa y madura con la masculinidad de la madera de ámbar y toques de vainilla de Papúa Nueva Guinea.'
    },
    'bleu': {
        brand: 'CHANEL',
        name: 'Bleu de Chanel EDP',
        type: 'EAU DE PARFUM',
        price: 1299.00,
        image: 'imagenes/bleu.jpg',
        desc: 'Bleu de Chanel es una fragancia amaderada aromática de gran elegancia y sofisticación. Con notas de pomelo fresco, incienso y maderas secas de cedro, ofrece una firma olfativa sensual y decidida que dura todo el día.'
    },
    'lemale': {
        brand: 'JEAN PAUL GAULTIER',
        name: 'Le Male Elixir',
        type: 'PARFUM',
        price: 1099.00,
        image: 'imagenes/lemale.jpg',
        desc: 'Le Male Elixir de Jean Paul Gaultier es una fragancia oriental amaderada de una intensidad ardiente. El haba tonka tropical se mezcla con la lavanda clásica y la frescura del benjuí, creando una estela magnética y seductora.'
    },
    'ysly': {
        brand: 'YVES SAINT LAURENT',
        name: 'Y EDP Masculino',
        type: 'EAU DE PARFUM',
        price: 1149.00,
        image: 'imagenes/ysly.jpg',
        desc: 'Y Eau de Parfum de Yves Saint Laurent representa al hombre creativo y emprendedor que ha alcanzado sus metas. Combina el frescor del geranio y la manzana verde con notas intensas de madera de cedro, haba tonka y olíbano.'
    },
    'eros': {
        brand: 'VERSACE',
        name: 'Eros Flame',
        type: 'EAU DE PARFUM',
        price: 899.00,
        image: 'imagenes/eros.jpg',
        desc: 'Versace Eros Flame es la fragancia de la pasión y el amor verdadero. Abre con mandarina italiana chispeante, limón y romero silvestre, dando paso a un corazón de pimienta negra y geranio, sobre una base cálida de vainilla y pachulí.'
    },
    'gio': {
        brand: 'GIORGIO ARMANI',
        name: 'Acqua di Gio Profondo',
        type: 'EAU DE PARFUM',
        price: 1049.00,
        image: 'imagenes/gio.jpg',
        desc: 'Acqua di Gio Profondo es una interpretación marina contemporánea y profunda. Con notas minerales saladas, esencia de mandarina verde y pachulí leñoso, ofrece una inmersión completa y misteriosa en la frescura oceánica.'
    },
    'coco': {
        brand: 'CHANEL',
        name: 'Coco Mademoiselle',
        type: 'EAU DE PARFUM',
        price: 1249.00,
        image: 'imagenes/coco.jpg',
        desc: 'Coco Mademoiselle de Chanel es una fragancia oriental amaderada para mujer, con un carácter fuerte y un frescor sorprendente. Las notas de salida de naranja vibrante despiertan los sentidos, seguidas de un corazón claro de rosa y jazmín, que culmina en la sensualidad del pachulí y el vetiver.'
    },
    'libre': {
        brand: 'YVES SAINT LAURENT',
        name: 'Libre EDP',
        type: 'EAU DE PARFUM',
        price: 1189.00,
        image: 'imagenes/libre.jpg',
        desc: 'Libre de Yves Saint Laurent es la fragancia de la libertad, para mujeres fuertes, audaces y libres. Combina la sensualidad de la lavanda de Francia con la frescura del azahar de Marruecos, complementado por notas de almizcle y vainilla.'
    },

    // NICHO
    'aventus': {
        brand: 'CREED',
        name: 'Aventus Eau de Parfum',
        type: 'EAU DE PARFUM',
        price: 2999.00,
        image: 'imagenes/aventus.jpg',
        desc: 'Creed Aventus celebra la fuerza y el éxito. Sus icónicas notas de salida de piña real, manzana y grosella negra se mezclan con abedul ahumado, jazmín de Marruecos y pachulí, cerrando con una sofisticada estela de musgo de roble y ámbar gris.'
    },
    'layton': {
        brand: 'PARFUMS DE MARLY',
        name: 'Layton Royal Essence',
        type: 'EAU DE PARFUM',
        price: 2299.00,
        priceVal: 2299.00,
        image: 'imagenes/layton.jpg',
        desc: 'Layton de Parfums de Marly es una firma olfativa de lujo aristocrático. Combina manzana crujiente, mandarina y lavanda con un corazón floral, reposando en una base cremosa de vainilla, cardamomo, sándalo y pimienta.'
    },
    'baccarat': {
        brand: 'MAISON FRANCIS KURKDJIAN',
        name: 'Baccarat Rouge 540',
        type: 'EAU DE PARFUM',
        price: 2799.00,
        image: 'imagenes/baccarat.jpg',
        desc: 'Baccarat Rouge 540 es una obra maestra de la alta perfumería. Combina notas aéreas de jazmín y el brillo del azafrán con facetas minerales de ámbar gris y cedro recién cortado, creando un aroma dulce, refinado e inolvidable.'
    },
    'naxos': {
        brand: 'XERJOFF',
        name: 'Naxos 1861 Eau de Parfum',
        type: 'EAU DE PARFUM',
        price: 2199.00,
        image: 'imagenes/naxos.jpg',
        desc: 'Naxos de Xerjoff celebra la herencia de Sicilia. Combina bergamota y limón cítrico con miel dulce silvestre, tabaco aromático rubio y notas cálidas de vainilla, canela y lavanda para una fragancia mediterránea rica y opulenta.'
    },
    'reflection': {
        brand: 'AMOUAGE',
        name: 'Reflection Man',
        type: 'EAU DE PARFUM',
        price: 2499.00,
        image: 'imagenes/reflection.jpg',
        desc: 'Reflection Man de Amouage encarna un espíritu refinado y sofisticado. Abre con romero e iris floral, seguidos por un corazón de jazmín y nerolí, y descansa sobre una rica base de madera de sándalo, cedro y vetiver.'
    },
    'byredo': {
        brand: 'BYREDO',
        name: 'Bal d\'Afrique',
        type: 'EAU DE PARFUM',
        price: 1899.00,
        image: 'imagenes/byredo.jpg',
        desc: 'Bal d\'Afrique de Byredo es una carta de amor a la cultura y arte africanos de la década de 1920 en París. Combina caléndula africana, limón de Amalfi chispeante y violeta con madera de cedro marroquí y vetiver para un aroma único y acogedor.'
    }
};

// Inyectar precios de decants calculados (demo frontal)
for (let key in productsDatabase) {
    const p = productsDatabase[key];
    p.hasDecants = true;
    // Criterio para el de 10ml: precio botella / 4
    p.price_10ml = Math.round(p.price / 4);
    // Criterio para 5ml: (precio 10ml / 2) + 10
    p.price_5ml = Math.round(p.price_10ml / 2) + 10;
}

// =============================================================
// STATS AND ORDERS SEEDING (TELEMETRY)
// =============================================================
const DEFAULT_STATS = {
    cartInitiated: 120,
    checkoutStarted: 60,
    ordersCompleted: 15
};

function getStats() {
    const stored = localStorage.getItem('novu_stats');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {}
    }
    localStorage.setItem('novu_stats', JSON.stringify(DEFAULT_STATS));
    return { ...DEFAULT_STATS };
}

function incrementStat(key) {
    const stats = getStats();
    if (stats[key] !== undefined) {
        stats[key]++;
        localStorage.setItem('novu_stats', JSON.stringify(stats));
    }
}

function initOrdersAndStats() {
    // 1. Inicializar estadísticas si no existen
    if (!localStorage.getItem('novu_stats')) {
        localStorage.setItem('novu_stats', JSON.stringify(DEFAULT_STATS));
    }

    // 2. Inicializar órdenes de historial si no existen
    if (!localStorage.getItem('novu_orders')) {
        const now = new Date();
        const mockOrders = [];
        
        // Función para calcular fechas pasadas
        const getPastDate = (daysAgo, hour) => {
            const d = new Date(now);
            d.setDate(d.getDate() - daysAgo);
            d.setHours(hour, Math.floor(Math.random() * 60), 0, 0);
            return d.toISOString();
        };

        // Plantillas de pedidos simulados realistas
        const mockTemplates = [
            { name: 'Ana Gómez', email: 'ana.gomez@gmail.com', phone: '55667788', dept: 'Guatemala', city: 'Guatemala', gender: 'Femenino', items: [{ id: 'yara', brand: 'LATTAFA', name: 'Yara (Pink Edition)', price: 299.00, size: '100 ml', quantity: 1, image: 'imagenes/yara.png' }], daysAgo: 6, hour: 9 },
            { name: 'Carlos Pérez', email: 'carlos.p@yahoo.com', phone: '44332211', dept: 'Sacatepéquez', city: 'Antigua Guatemala', gender: 'Masculino', items: [{ id: 'clubdenuit', brand: 'ARMAF', name: 'Club de Nuit Intense Man', price: 329.00, size: '100 ml', quantity: 1, image: 'imagenes/clubdenuit.png' }], daysAgo: 6, hour: 14 },
            { name: 'María Rodríguez', email: 'mrodriguez@gmail.com', phone: '55889900', dept: 'Guatemala', city: 'Mixco', gender: 'Femenino', items: [{ id: 'khamrah', brand: 'LATTAFA', name: 'Khamrah (Unisex)', price: 389.00, size: '100 ml', quantity: 1, image: 'imagenes/khamrah.png' }], daysAgo: 5, hour: 11 },
            { name: 'Esteban Cabrera', email: 'esteban.c@hotmail.com', phone: '55443322', dept: 'Quetzaltenango', city: 'Quetzaltenango', gender: 'Masculino', items: [{ id: 'sauvage', brand: 'DIOR', name: 'Sauvage EDP', price: 1199.00, size: '100 ml', quantity: 1, image: 'imagenes/sauvage.jpg' }], daysAgo: 5, hour: 19 },
            { name: 'Sofía Morales', email: 'sofiamorales@gmail.com', phone: '33445566', dept: 'Guatemala', city: 'Villa Nueva', gender: 'Femenino', items: [{ id: 'coco', brand: 'CHANEL', name: 'Coco Mademoiselle', price: 1249.00, size: '100 ml', quantity: 1, image: 'imagenes/coco.jpg' }], daysAgo: 4, hour: 10 },
            { name: 'Luis Fernando', email: 'luisfer@outlook.com', phone: '44556677', dept: 'Escuintla', city: 'Escuintla', gender: 'Masculino', items: [{ id: 'hawas', brand: 'RASASI', name: 'Hawas For Him (Oud Edition)', price: 499.00, size: '100 ml', quantity: 1, image: 'imagenes/hawas.png' }], daysAgo: 4, hour: 16 },
            { name: 'Lucía Méndez', email: 'lucia.mendez@gmail.com', phone: '33221100', dept: 'Sacatepéquez', city: 'Jocotenango', gender: 'Femenino', items: [{ id: 'yara', brand: 'LATTAFA', name: 'Yara (Pink Edition)', price: 299.00, size: '100 ml', quantity: 2, image: 'imagenes/yara.png' }], daysAgo: 3, hour: 11 },
            { name: 'José Martínez', email: 'jmartinez@gmail.com', phone: '55664422', dept: 'Chimaltenango', city: 'Chimaltenango', gender: 'Masculino', items: [{ id: 'bleu', brand: 'CHANEL', name: 'Bleu de Chanel EDP', price: 1299.00, size: '100 ml', quantity: 1, image: 'imagenes/bleu.jpg' }], daysAgo: 3, hour: 21 },
            { name: 'Andrea Ortiz', email: 'andrea.ortiz@gmail.com', phone: '44887711', dept: 'Guatemala', city: 'Guatemala', gender: 'Femenino', items: [{ id: 'libre', brand: 'YVES SAINT LAURENT', name: 'Libre EDP', price: 1189.00, size: '100 ml', quantity: 1, image: 'imagenes/libre.jpg' }], daysAgo: 2, hour: 15 },
            { name: 'David Delgado', email: 'ddelgado@yahoo.com', phone: '55113355', dept: 'Alta Verapaz', city: 'Cobán', gender: 'No especificado', items: [{ id: 'aventus', brand: 'CREED', name: 'Aventus Eau de Parfum', price: 2999.00, size: '100 ml', quantity: 1, image: 'imagenes/aventus.jpg' }], daysAgo: 2, hour: 18 },
            { name: 'Carmen Estrada', email: 'carmen_e@gmail.com', phone: '33441199', dept: 'Retalhuleu', city: 'Retalhuleu', gender: 'Femenino', items: [{ id: 'yara', brand: 'LATTAFA', name: 'Yara (Pink Edition)', price: 299.00, size: '100 ml', quantity: 1, image: 'imagenes/yara.png' }, { id: 'khamrah', brand: 'LATTAFA', name: 'Khamrah (Unisex)', price: 389.00, size: '100 ml', quantity: 1, image: 'imagenes/khamrah.png' }], daysAgo: 1, hour: 10 },
            { name: 'Ramiro López', email: 'rlopez@gmail.com', phone: '44558822', dept: 'Guatemala', city: 'Mixco', gender: 'Masculino', items: [{ id: 'lemale', brand: 'JEAN PAUL GAULTIER', name: 'Le Male Elixir', price: 1099.00, size: '100 ml', quantity: 1, image: 'imagenes/lemale.jpg' }], daysAgo: 1, hour: 13 },
            { name: 'Valeria Rivas', email: 'vrivas@gmail.com', phone: '55663399', dept: 'Quetzaltenango', city: 'Quetzaltenango', gender: 'Femenino', items: [{ id: 'baccarat', brand: 'MAISON FRANCIS KURKDJIAN', name: 'Baccarat Rouge 540', price: 2799.00, size: '100 ml', quantity: 1, image: 'imagenes/baccarat.jpg' }], daysAgo: 0, hour: 8 },
            { name: 'Alejandro Ruiz', email: 'aruiz@hotmail.com', phone: '33442277', dept: 'Guatemala', city: 'Guatemala', gender: 'Masculino', items: [{ id: 'layton', brand: 'PARFUMS DE MARLY', name: 'Layton Royal Essence', price: 2299.00, size: '100 ml', quantity: 1, image: 'imagenes/layton.jpg' }], daysAgo: 0, hour: 12 },
            { name: 'Gabriela Fuentes', email: 'gfuentes@gmail.com', phone: '55228833', dept: 'Sacatepéquez', city: 'Antigua Guatemala', gender: 'Femenino', items: [{ id: 'naxos', brand: 'XERJOFF', name: 'Naxos 1861 Eau de Parfum', price: 2199.00, size: '100 ml', quantity: 1, image: 'imagenes/naxos.jpg' }], daysAgo: 0, hour: 17 }
        ];

        mockTemplates.forEach((t, i) => {
            const subtotal = t.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = t.dept === 'Guatemala' ? 35.00 : 45.00;
            const total = subtotal + shipping;
            const orderNum = 'NV-' + (200000 + i);
            mockOrders.push({
                orderNumber: orderNum,
                date: getPastDate(t.daysAgo, t.hour),
                clientName: t.name,
                email: t.email,
                phone: t.phone,
                address: `Calle Real #${10 + i}`,
                city: t.city,
                dept: t.dept,
                gender: t.gender,
                items: t.items,
                subtotal: subtotal,
                shipping: shipping,
                total: total
            });
        });

        localStorage.setItem('novu_orders', JSON.stringify(mockOrders));
    }
}

function initCatalog() {
    const stored = localStorage.getItem('novu_catalog');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            Object.assign(productsDatabase, parsed);
        } catch (e) {
            console.error('Error parsing novu_catalog', e);
        }
    } else {
        localStorage.setItem('novu_catalog', JSON.stringify(productsDatabase));
    }
}

function syncCatalogDOM() {
    // 1. Sync sliders
    const slideCards = document.querySelectorAll('.product-card-slide');
    slideCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            const src = img.getAttribute('src');
            if (src) {
                const id = src.split('/').pop().split('.')[0];
                const prod = productsDatabase[id];
                if (prod) {
                    const brandEl = card.querySelector('.product-brand');
                    if (brandEl) brandEl.textContent = prod.brand;
                    const nameEl = card.querySelector('.product-name');
                    if (nameEl) nameEl.textContent = prod.name;
                    if (prod.gender) {
                        card.setAttribute('data-gender', prod.gender);
                    }
                    if (prod.image) {
                        img.src = prod.image;
                    }
                }
            }
        }
    });

    // 2. Sync grids
    const gridCards = document.querySelectorAll('.grid-product-card');
    gridCards.forEach(card => {
        const id = card.id.replace('grid-', '');
        const prod = productsDatabase[id];
        if (prod) {
            const brandEl = card.querySelector('.grid-product-brand');
            if (brandEl) brandEl.textContent = prod.brand;
            const nameEl = card.querySelector('.grid-product-name');
            if (nameEl) nameEl.textContent = prod.name;
            const priceEl = card.querySelector('.grid-product-price');
            if (priceEl) priceEl.textContent = `Q ${parseFloat(prod.price).toFixed(2)}`;
            const img = card.querySelector('.grid-product-image');
            if (img) {
                if (prod.image) img.src = prod.image;
                img.alt = `${prod.name} de ${prod.brand}`;
            }
            if (prod.gender) {
                card.setAttribute('data-gender', prod.gender);
            }
        }
    });
}

// =============================================================
// INITIALIZE STATE FROM LOCALSTORAGE
// =============================================================
let cart = JSON.parse(localStorage.getItem('novu_cart')) || [];
let activeUser = JSON.parse(localStorage.getItem('novu_user')) || null;
let currentViewingProduct = null;

// Inicializar base de usuarios y fidelidad
function initUsers() {
    // 1. Inicializar usuarios si no existen
    if (!localStorage.getItem('novu_users')) {
        const defaultUsers = [
            { name: 'Administrador', email: 'admin@novu.com', password: 'admin', role: 'admin' },
            { name: 'Samuel', email: 'samuel@novu.com', password: '123', role: 'customer' }
        ];
        localStorage.setItem('novu_users', JSON.stringify(defaultUsers));
    }

    // 2. Inicializar tarjetas de fidelidad por defecto
    if (!localStorage.getItem('novu_loyalty_cards')) {
        const defaultLoyalty = {
            'samuel@novu.com': {
                stamps: 3,
                giftCards: [
                    { code: 'GIFT-BIENVENIDA-1234', amount: 50, active: true, isWelcome: true }
                ]
            }
        };
        localStorage.setItem('novu_loyalty_cards', JSON.stringify(defaultLoyalty));
    }
}

// =============================================================
// STATE FUNCTIONS
// =============================================================

// Guardar carrito
function saveCart() {
    localStorage.setItem('novu_cart', JSON.stringify(cart));
    updateCartUI();
}

// Agregar al Carrito
function addToCart(id, size, quantity) {
    const productData = productsDatabase[id];
    if (!productData) return;

    // Si el carrito estaba vacío, registrar inicio de carrito
    if (cart.length === 0) {
        incrementStat('cartInitiated');
    }

    // Buscar si ya existe en el carrito
    const existingItem = cart.find(item => item.id === id && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        let itemPrice = productData.price;
        if (size === 'Decant 5 ml' && productData.price_5ml) {
            itemPrice = productData.price_5ml;
        } else if (size === 'Decant 10 ml' && productData.price_10ml) {
            itemPrice = productData.price_10ml;
        }

        cart.push({
            id: id,
            brand: productData.brand,
            name: productData.name,
            price: itemPrice,
            image: productData.image,
            size: size,
            quantity: quantity
        });
    }

    saveCart();
    showToastNotification(`¡${productData.name} agregado al carrito!`);
}

// Remover del Carrito
function removeFromCart(id, size) {
    cart = cart.filter(item => !(item.id === id && item.size === size));
    saveCart();
}

// Actualizar Cantidad en Carrito
function updateCartQty(id, size, change) {
    const item = cart.find(item => item.id === id && item.size === size);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id, size);
    } else {
        saveCart();
    }
}

// =============================================================
// UI FUNCTIONS
// =============================================================

// Actualizar Cabeceras e Interfaz del Carrito
function updateCartUI() {
    const badgeElements = document.querySelectorAll('.cart-badge');
    const cartItemsContainer = document.getElementById('cart-items-el');
    const subtotalElement = document.getElementById('cart-subtotal-el');

    // Cantidad total de productos
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    badgeElements.forEach(badge => {
        badge.textContent = totalQty;
        if (totalQty > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });

    // Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotalElement) {
        subtotalElement.textContent = `Q ${subtotal.toFixed(2)}`;
    }

    // Renderizar items
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <span class="cart-empty-icon">🛒</span>
                <p class="cart-empty-text">Tu carrito de compras está vacío.</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <span class="cart-item-brand">${item.brand}</span>
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-size">${item.size}</span>
                    <span class="cart-item-price">Q ${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-item-qty">
                        <button class="cart-qty-btn minus" onclick="updateCartQty('${item.id}', '${item.size}', -1)">-</button>
                        <span class="cart-qty-val">${item.quantity}</span>
                        <button class="cart-qty-btn plus" onclick="updateCartQty('${item.id}', '${item.size}', 1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}', '${item.size}')">Eliminar</button>
                </div>
            </div>
        `).join('');
    }
}

// Abrir / Cerrar Modales y Paneles
function toggleCartSidebar(show) {
    const sidebar = document.getElementById('cart-sidebar-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (sidebar && backdrop) {
        if (show) {
            sidebar.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

function toggleProductModal(show, id = null) {
    const modal = document.getElementById('product-modal-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (modal && backdrop) {
        if (show && id && productsDatabase[id]) {
            currentViewingProduct = id;
            const product = productsDatabase[id];

            // Rellenar modal
            document.getElementById('modal-product-img').src = product.image;
            document.getElementById('modal-product-img').alt = product.name;
            document.getElementById('modal-product-brand').textContent = product.brand;
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-type').textContent = product.type;
            document.getElementById('modal-product-price').textContent = `Q ${product.price.toFixed(2)}`;
            document.getElementById('modal-product-desc').textContent = product.desc;

            // Resetear cantidad
            document.getElementById('qty-value-el').textContent = '1';
            
            // Generar botones de tamaño divididos
            const sizeContainer = document.querySelector('.size-options');
            if (sizeContainer) {
                let sizeHtml = '';
                
                // 1. Presentaciones (Botellas completas)
                let presHtml = '';
                if (product.presentaciones && product.presentaciones.length > 0) {
                    product.presentaciones.forEach((pres, i) => {
                        const activeClass = i === 0 ? 'active' : '';
                        const sizeLabel = String(pres.tamanio).toLowerCase().includes('ml') ? pres.tamanio : `${pres.tamanio} ml`;
                        presHtml += `<button class="size-btn ${activeClass}" data-price="${pres.precio}">${sizeLabel}</button>`;
                    });
                } else if (!product.hasDecants && !product.decant) {
                    presHtml = `<button class="size-btn active" data-price="${product.price}">100 ml</button>`;
                }

                if (presHtml) {
                    sizeHtml += `<div class="size-section-group" style="margin-bottom: 15px; width: 100%;">
                        <label style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #aaa; text-transform: uppercase; margin-bottom: 8px;"><span>🍾</span> Presentaciones (Botella Completa):</label>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">${presHtml}</div>
                    </div>`;
                }

                // 2. Decants y Muestras
                let decantHtml = '';
                if (product.hasDecants || product.decant) {
                    const price5 = product.price_5ml || (product.decant && product.decant.precio_5ml);
                    const price10 = product.price_10ml || (product.decant && product.decant.precio_10ml);
                    if (price5) decantHtml += `<button class="size-btn ${!presHtml ? 'active' : ''}" data-price="${price5}">Decant 5 ml</button>`;
                    if (price10) decantHtml += `<button class="size-btn ${!presHtml && !price5 ? 'active' : ''}" data-price="${price10}">Decant 10 ml</button>`;
                }

                if (decantHtml) {
                    sizeHtml += `<div class="size-section-group" style="padding: 12px; border-radius: 8px; background: rgba(197, 160, 89, 0.08); border: 1px dashed rgba(197, 160, 89, 0.4); width: 100%;">
                        <label style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #C5A059; text-transform: uppercase; margin-bottom: 8px;"><span>🧪</span> Decants y Muestras:</label>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">${decantHtml}</div>
                    </div>`;
                }

                sizeContainer.innerHTML = sizeHtml;
            }

            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            // Mantener backdrop si el carrito está abierto de casualidad (seguridad)
            const cartActive = document.getElementById('cart-sidebar-el')?.classList.contains('active');
            if (!cartActive) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
            currentViewingProduct = null;
        }
    }
}

function toggleLoginModal(show) {
    const modal = document.getElementById('login-modal-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (modal && backdrop) {
        if (show) {
            // Asegurar que inicia en la vista de login
            const loginView = document.getElementById('login-view-el');
            const registerView = document.getElementById('register-view-el');
            if (loginView && registerView) {
                loginView.classList.add('active');
                registerView.classList.remove('active');
            }
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            const cartActive = document.getElementById('cart-sidebar-el')?.classList.contains('active');
            const checkoutActive = document.getElementById('checkout-modal-el')?.classList.contains('active');
            const profileActive = document.getElementById('profile-modal-el')?.classList.contains('active');
            if (!cartActive && !checkoutActive && !profileActive) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

function toggleProfileModal(show) {
    const modal = document.getElementById('profile-modal-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (modal && backdrop) {
        if (show) {
            renderProfileModal();
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            const cartActive = document.getElementById('cart-sidebar-el')?.classList.contains('active');
            const checkoutActive = document.getElementById('checkout-modal-el')?.classList.contains('active');
            const loginActive = document.getElementById('login-modal-el')?.classList.contains('active');
            if (!cartActive && !checkoutActive && !loginActive) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

function toggleCheckoutModal(show) {
    const modal = document.getElementById('checkout-modal-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (modal && backdrop) {
        if (show) {
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            const cartActive = document.getElementById('cart-sidebar-el')?.classList.contains('active');
            if (!cartActive) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

// Abrir checkout dinámico con el resumen de la compra actual
function openCheckoutFlow() {
    if (cart.length === 0) {
        showToastNotification('Agrega productos al carrito para comprar.');
        return;
    }
    
    // Incrementar estadísticas de inicio de checkout
    incrementStat('checkoutStarted');
    
    // Cerrar el carrito lateral
    toggleCartSidebar(false);
    
    const container = document.getElementById('checkout-content-container');
    if (!container) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 35.00; // Envío fijo Q35.00 Guatemala / Q45.00 Departamentos
    const total = subtotal + shipping;
    
    // Generar formulario dinámico (Removido método de pago, procesará vía WhatsApp)
    container.innerHTML = `
        <h2 class="checkout-title">FINALIZAR COMPRA</h2>
        
        <div class="checkout-grid">
            <!-- Formulario de Envío -->
            <form id="checkout-form-el" class="checkout-form-grid">
                <div class="checkout-section-title">Información de Envío</div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="co-name">Nombre Completo</label>
                        <input type="text" id="co-name" required placeholder="Juan Pérez" value="${activeUser ? activeUser.name : ''}">
                    </div>
                </div>
                
                <div class="form-row split">
                    <div class="form-group">
                        <label for="co-email">Correo Electrónico</label>
                        <input type="email" id="co-email" required placeholder="tu@correo.com" value="${activeUser ? activeUser.email : ''}">
                    </div>
                    <div class="form-group">
                        <label for="co-phone">Teléfono / WhatsApp (ej. 5555-4444)</label>
                        <input type="text" id="co-phone" required placeholder="5555-4444" pattern="[0-9]{4}-[0-9]{4}" maxlength="9" title="Debe ingresar un número en formato 4444-5555" oninput="this.value = this.value.replace(/\D/g, '').slice(0,8).replace(/^(\d{4})(\d)/, '$1-$2')">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="co-nit">NIT para Facturación (Opcional)</label>
                        <input type="text" id="co-nit" placeholder="CF (Consumidor Final)" value="">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="co-address">Dirección Completa (Calle, Avenida, Zona, Casa/Apto)</label>
                        <input type="text" id="co-address" required placeholder="Avenida Las Américas 15-20, Zona 13, Edificio Reforma">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="co-references">Referencias / Detalles Adicionales de Entrega (Opcional)</label>
                        <input type="text" id="co-references" placeholder="Ej. Frente al árbol grande, casa con rótulo que dice 'Compra aquí', portón negro">
                    </div>
                </div>
                
                <div class="form-row split">
                    <div class="form-group">
                        <label for="co-dept">Departamento</label>
                        <select id="co-dept" required>
                            <option value="" disabled selected>Selecciona tu departamento</option>
                            <option value="Alta Verapaz">Alta Verapaz</option>
                            <option value="Baja Verapaz">Baja Verapaz</option>
                            <option value="Chimaltenango">Chimaltenango</option>
                            <option value="Chiquimula">Chiquimula</option>
                            <option value="El Progreso">El Progreso</option>
                            <option value="Escuintla">Escuintla</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Huehuetenango">Huehuetenango</option>
                            <option value="Izabal">Izabal</option>
                            <option value="Jalapa">Jalapa</option>
                            <option value="Jutiapa">Jutiapa</option>
                            <option value="Petén">Petén</option>
                            <option value="Quetzaltenango">Quetzaltenango</option>
                            <option value="Quiché">Quiché</option>
                            <option value="Retalhuleu">Retalhuleu</option>
                            <option value="Sacatepéquez">Sacatepéquez</option>
                            <option value="San Marcos">San Marcos</option>
                            <option value="Santa Rosa">Santa Rosa</option>
                            <option value="Sololá">Sololá</option>
                            <option value="Suchitepéquez">Suchitepéquez</option>
                            <option value="Totonicapán">Totonicapán</option>
                            <option value="Zacapa">Zacapa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="co-city">Ciudad / Municipio</label>
                        <input type="text" id="co-city" required placeholder="Guatemala">
                    </div>
                </div>
                
                <div class="form-row split">
                    <div class="form-group">
                        <label for="co-gender">Género (Para ofertas y perfil)</label>
                        <select id="co-gender" required>
                            <option value="" disabled selected>Selecciona tu género</option>
                            <option value="Femenino">Mujer</option>
                            <option value="Masculino">Hombre</option>
                            <option value="No especificado">Prefiero no especificar</option>
                        </select>
                    </div>
                    <div class="form-group" style="visibility: hidden; opacity: 0; pointer-events: none;">
                        <!-- Spacer to maintain 2-column symmetry -->
                    </div>
                </div>
                
                <button type="submit" class="confirm-order-btn" style="margin-top: 30px; background-color: #25D366;">ENVIAR POR WHATSAPP (Q ${total.toFixed(2)} + Envío)</button>
            </form>
            
            <!-- Resumen de los Productos en Compra -->
            <div class="checkout-summary-column">
                <div class="checkout-section-title">Resumen del Pedido</div>
                <div class="checkout-summary-items">
                    ${cart.map(item => `
                        <div class="co-item">
                            <div class="co-item-img-wrapper">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="co-item-details">
                                <span class="co-item-name"><strong>${item.brand}</strong> - ${item.name}</span>
                                <span class="co-item-meta">${item.size} × ${item.quantity}</span>
                            </div>
                            <span class="co-item-price">Q ${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="co-summary-totals">
                    <div class="co-summary-row">
                        <span>Subtotal</span>
                        <span>Q ${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="co-summary-row">
                        <span>Envío (Guatemala)</span>
                        <span>Q ${shipping.toFixed(2)}</span>
                    </div>
                    <div class="co-summary-row total" style="border-top: 1px solid #e5e5e5; padding-top: 15px; margin-top: 15px; font-size: 1.15rem; font-weight: 700; color: #121212;">
                        <span>Total</span>
                        <span>Q ${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar el modal
    toggleCheckoutModal(true);
    
    // Controlador de envío
    const checkoutForm = document.getElementById('checkout-form-el');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleConfirmOrder(total);
        });
    }
}

// Confirmar el pedido, abrir WhatsApp con el texto del pedido y mostrar el recibo premium de compra
function handleConfirmOrder(total) {
    const container = document.getElementById('checkout-content-container');
    if (!container) return;
    
    const orderNumber = 'NV-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('es-GT', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Extraer datos del formulario para el recibo
    const name = document.getElementById('co-name').value;
    const email = document.getElementById('co-email').value;
    const address = document.getElementById('co-address').value;
    const dept = document.getElementById('co-dept').value;
    const city = document.getElementById('co-city').value;
    const phone = document.getElementById('co-phone').value;
    const nit = document.getElementById('co-nit').value.trim() || 'CF';
    const gender = document.getElementById('co-gender').value;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = dept === 'Guatemala' ? 35.00 : 45.00;
    const total = subtotal + shipping;
    
    // Guardar orden en localStorage para el panel BI
    const orders = JSON.parse(localStorage.getItem('novu_orders')) || [];
    const newOrder = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        clientName: name,
        email: email,
        phone: phone,
        nit: nit,
        address: address,
        city: city,
        dept: dept,
        gender: gender,
        items: cart.map(item => ({...item})),
        subtotal: subtotal,
        shipping: shipping,
        total: total
    };
    orders.unshift(newOrder);
    localStorage.setItem('novu_orders', JSON.stringify(orders));

    // Procesar Tarjeta de Fidelidad si hay usuario activo
    let loyaltyPromoHtml = '';
    if (activeUser) {
        const loyaltyCards = JSON.parse(localStorage.getItem('novu_loyalty_cards')) || {};
        let card = loyaltyCards[activeUser.email] || { stamps: 0, giftCards: [] };
        
        // Sumar 1 sello por la compra
        card.stamps += 1;
        
        let earnedGiftCard = null;
        if (card.stamps >= 8) {
            const giftCardCode = 'GIFT-150-' + Math.floor(100000 + Math.random() * 900000);
            earnedGiftCard = { code: giftCardCode, amount: 150.00, active: true, isWelcome: false };
            card.giftCards.push(earnedGiftCard);
            card.stamps -= 8;
        }
        
        loyaltyCards[activeUser.email] = card;
        localStorage.setItem('novu_loyalty_cards', JSON.stringify(loyaltyCards));
        
        if (earnedGiftCard) {
            loyaltyPromoHtml = `
                <div class="loyalty-success-banner" style="background-color: #FAF7F2; border: 1.5px solid #C5A059; border-radius: 8px; padding: 20px; margin: 25px auto; max-width: 600px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                    <span style="font-size: 1.5rem;">🎉 🎁</span>
                    <h4 style="font-family: var(--font-primary); font-size: 0.9rem; font-weight: 700; color: #1c1a17; margin: 10px 0 5px 0; letter-spacing: 0.05em; text-transform: uppercase;">¡COMPLETASTE TU TARJETA!</h4>
                    <p style="font-size: 0.75rem; color: #5e5a54; margin: 0 0 15px 0;">Has ganado una Gift Card de <strong>Q 150.00</strong> para tu próxima compra.</p>
                    <div style="display: inline-flex; align-items: center; gap: 10px; background-color: #ffffff; border: 1px solid #eae5dc; padding: 10px 20px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
                        <span style="font-family: monospace; font-size: 1rem; font-weight: 700; color: #C5A059;">${earnedGiftCard.code}</span>
                    </div>
                    <p style="font-size: 0.65rem; color: #888888; margin-top: 10px;">*Código guardado en tu perfil. Úsalo en tu próximo pedido por WhatsApp.</p>
                </div>
            `;
        } else {
            loyaltyPromoHtml = `
                <div class="loyalty-success-banner" style="background: linear-gradient(135deg, #141311 0%, #2b2721 100%); border: 1.5px solid #C5A059; border-radius: 8px; padding: 15px 20px; margin: 25px auto; max-width: 600px; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 15px; color: #ffffff; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);">
                    <div>
                        <h4 style="font-family: var(--font-primary); font-size: 0.8rem; font-weight: 700; color: #C5A059; margin: 0; letter-spacing: 0.05em; text-transform: uppercase;">TARJETA DE FIDELIDAD NOVU</h4>
                        <p style="font-size: 0.75rem; color: #dfd8cb; margin: 3px 0 0 0;">¡Sumaste <strong>1 sello</strong>! Tienes un total de <strong>${card.stamps} / 8 sellos</strong>.</p>
                    </div>
                    <div style="background: radial-gradient(circle, #ffe1aa 0%, #C5A059 100%); color: #ffffff; font-family: var(--font-primary); font-size: 0.75rem; font-weight: 800; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(197, 160, 89, 0.4); border: 1.5px solid #ffffff;">
                        ★ +1
                    </div>
                </div>
            `;
        }
    }
    
    // Incrementar estadísticas de pedidos completados
    incrementStat('ordersCompleted');
    
    // 1. Construir texto formateado para el mensaje de WhatsApp
    let orderDetailsText = '';
    cart.forEach((item, idx) => {
        orderDetailsText += `${idx + 1}. *${item.brand}* - ${item.name} (${item.size}) x${item.quantity} - Q ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const whatsappMessage = `¡Hola NOVU! Me gustaría realizar el siguiente pedido:

*DATOS DE ENVÍO:*
- *Nombre:* ${name}
- *Teléfono:* +502 ${phone}
- *NIT:* ${nit}
- *Dirección:* ${address}
${references ? `- *Referencias:* ${references}\n` : ''}- *Municipio/Ciudad:* ${city}
- *Departamento:* ${dept}
- *Correo:* ${email}

*DETALLE DEL PEDIDO:*
${orderDetailsText}
- *Subtotal:* Q ${subtotal.toFixed(2)}
- *Envío:* Se cotiza según ubicación / distancia
- *TOTAL PRODUCTOS:* Q ${total.toFixed(2)} + Envío

_Espero la confirmación de la orden._`;
    // 2. Enviar a la base de datos como PENDIENTE
    fetch('http://localhost:3000/whatsapp-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre_cliente: name,
            telefono: phone,
            direccion: address,
            nit: nit,
            total: total,
            carrito_json: JSON.stringify(cart)
        })
    }).catch(err => console.error('Error enviando orden:', err));

    // 3. Redirigir a la API de WhatsApp
    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    
    // 3. Generar plantilla de éxito con recibo detallado en pantalla
    container.innerHTML = `
        <div class="order-success-screen" style="text-align: center; padding: 20px 0;">
            <div class="success-icon-wrapper" style="width: 80px; height: 80px; background-color: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <svg class="success-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 45px; height: 45px;">
                    <circle cx="12" cy="12" r="10" stroke="#4CAF50" stroke-width="2" />
                    <path d="M8 12L11 15L16 9" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            
            <h2 class="success-title" style="font-family: var(--font-primary); font-size: 1.6rem; font-weight: 700; color: #2e7d32; margin-bottom: 15px; letter-spacing: 0.05em;">¡PEDIDO REGISTRADO!</h2>
            
            <div style="margin: 20px auto 30px; padding: 20px; background-color: #FEF3C7; border: 2px solid #F59E0B; border-radius: 10px; max-width: 520px; box-shadow: 0 4px 15px rgba(245,158,11,0.15);">
                <p style="font-size: 0.95rem; color: #92400E; font-weight: 700; margin-bottom: 14px;">⚠️ ¿Tu navegador no abrió WhatsApp automáticamente?</p>
                <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 1rem; letter-spacing: 0.03em; box-shadow: 0 4px 12px rgba(37,211,102,0.4);">📲 ENVIAR ORDEN POR WHATSAPP AQUÍ</a>
            </div>
            
            <!-- Recibo Premium -->
            <div class="receipt-card" style="background-color: #f9f9f9; border: 1px solid #e5e5e5; border-radius: 8px; max-width: 600px; margin: 0 auto 30px; text-align: left; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                <div class="receipt-header" style="background-color: #121212; color: #ffffff; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center;">
                    <span class="receipt-brand" style="font-family: var(--font-accent); font-weight: 800; letter-spacing: 0.15em; font-size: 1.1rem;">NOVU</span>
                    <span class="receipt-date" style="font-size: 0.75rem; opacity: 0.8;">${dateStr}</span>
                </div>
                
                <div class="receipt-body" style="padding: 30px;">
                    <div class="receipt-row" style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem;">
                        <span class="receipt-label" style="color: #666666; font-weight: 600;">Número de Pedido:</span>
                        <span class="receipt-value" style="color: #121212; font-weight: 700;">${orderNumber}</span>
                    </div>
                    <div class="receipt-row" style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem;">
                        <span class="receipt-label" style="color: #666666; font-weight: 600;">Cliente:</span>
                        <span class="receipt-value" style="color: #121212;">${name}</span>
                    </div>
                    <div class="receipt-row" style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem;">
                        <span class="receipt-label" style="color: #666666; font-weight: 600;">Teléfono:</span>
                        <span class="receipt-value" style="color: #121212;">+502 ${phone}</span>
                    </div>
                    <div class="receipt-row" style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 0.85rem;">
                        <span class="receipt-label" style="color: #666666; font-weight: 600;">Dirección de Envío:</span>
                        <span class="receipt-value" style="color: #121212; text-align: right; max-width: 60%;">${address}, ${city}, ${dept}</span>
                    </div>
                    
                    <div class="receipt-divider" style="border-top: 1px dashed #cccccc; margin: 20px 0;"></div>
                    
                    <div class="receipt-items-list" style="display: flex; flex-direction: column; gap: 10px; font-size: 0.8rem; color: #555555;">
                        ${cart.map(item => `
                            <div class="receipt-item-row" style="display: flex; justify-content: space-between;">
                                <span>${item.quantity}x ${item.brand} - ${item.name} (${item.size})</span>
                                <span style="font-weight: 600;">Q ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="receipt-divider" style="border-top: 1px dashed #cccccc; margin: 20px 0;"></div>
                    
                    <div class="receipt-row total" style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 700; color: #121212;">
                        <span class="receipt-label">Monto Total (Envío Incluido):</span>
                        <span class="receipt-value">Q ${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            ${loyaltyPromoHtml}
            
            <p class="success-delivery-note" style="font-size: 0.8rem; color: #2e7d32; font-weight: 600; margin-bottom: 30px;">💬 La compra se procesará en cuanto envíes el detalle de WhatsApp.</p>
            
            <button class="finish-checkout-btn" id="close-success-btn" style="padding: 16px 45px; background-color: #121212; color: #ffffff; border: none; font-family: var(--font-primary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; cursor: pointer; transition: background-color 0.2s;">VOLVER A LA TIENDA</button>
        </div>
    `;
    
    // Vaciar el carrito
    cart = [];
    saveCart();
    
    // Registrar el botón para cerrar el recibo de compra
    const closeSuccessBtn = document.getElementById('close-success-btn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            toggleCheckoutModal(false);
        });
    }
}

// Iniciar sesión simulado
function handleLogin(email, password) {
    if (email === 'admin@novu.com') {
        activeUser = {
            name: 'Administrador',
            email: email,
            role: 'admin'
        };
        localStorage.setItem('novu_user', JSON.stringify(activeUser));
        updateUserHeaderUI();
        toggleLoginModal(false);
        showToastNotification(`¡Sesión iniciada con éxito! Hola, ${activeUser.name}.`);
        return true;
    }

    const users = JSON.parse(localStorage.getItem('novu_users')) || [];
    const user = users.find(u => u.email === email);

    if (user && user.password === password) {
        activeUser = {
            name: user.name,
            email: user.email,
            role: user.role || 'customer'
        };
        localStorage.setItem('novu_user', JSON.stringify(activeUser));
        updateUserHeaderUI();
        toggleLoginModal(false);
        showToastNotification(`¡Sesión iniciada con éxito! Hola, ${activeUser.name}.`);
        return true;
    } else {
        showToastNotification('Correo o contraseña incorrectos.');
        return false;
    }
}

function handleRegister(name, email, password) {
    const users = JSON.parse(localStorage.getItem('novu_users')) || [];
    if (users.some(u => u.email === email) || email === 'admin@novu.com') {
        showToastNotification('Este correo ya está registrado.');
        return false;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        role: 'customer'
    };
    users.push(newUser);
    localStorage.setItem('novu_users', JSON.stringify(users));

    // Inicializar tarjeta de fidelidad del nuevo usuario con 1 sello de regalo y la Gift Card de bienvenida de Q50
    const loyaltyCards = JSON.parse(localStorage.getItem('novu_loyalty_cards')) || {};
    const welcomeCode = 'GIFT-WELCOME-' + Math.floor(1000 + Math.random() * 9000);
    loyaltyCards[email] = {
        stamps: 1,
        giftCards: [
            { code: welcomeCode, amount: 50.00, active: true, isWelcome: true }
        ]
    };
    localStorage.setItem('novu_loyalty_cards', JSON.stringify(loyaltyCards));

    // Autenticar automáticamente al nuevo usuario
    activeUser = {
        name: name,
        email: email,
        role: 'customer'
    };
    localStorage.setItem('novu_user', JSON.stringify(activeUser));
    updateUserHeaderUI();
    toggleLoginModal(false);
    showToastNotification(`¡Cuenta creada con éxito! Hola, ${name}. Recibiste 1 sello de bienvenida y una Gift Card de Q 50.`);
    return true;
}

function handleLogout() {
    activeUser = null;
    localStorage.removeItem('novu_user');
    updateUserHeaderUI();
    showToastNotification('Sesión cerrada.');
}

// Renderizar contenido dinámico del Perfil y Tarjeta de Fidelidad
function renderProfileModal() {
    const container = document.getElementById('profile-content-container');
    if (!container || !activeUser) return;

    const loyaltyCards = JSON.parse(localStorage.getItem('novu_loyalty_cards')) || {};
    const card = loyaltyCards[activeUser.email] || { stamps: 0, giftCards: [] };

    // Grilla de 8 sellos
    let stampsHtml = '';
    const totalStamps = 8;
    for (let i = 1; i <= totalStamps; i++) {
        if (i <= card.stamps) {
            stampsHtml += `
                <div class="stamp-slot active" title="Sello ${i} obtenido">
                    <span class="stamp-icon">★</span>
                </div>
            `;
        } else {
            stampsHtml += `
                <div class="stamp-slot" title="Sello ${i} vacío">
                    <span class="stamp-number">${i}</span>
                </div>
            `;
        }
    }

    // Listado de Gift Cards
    let giftCardsHtml = '';
    const activeGiftCards = (card.giftCards || []).filter(g => g.active);

    if (activeGiftCards.length === 0) {
        giftCardsHtml = `
            <div class="gift-card-empty">
                No tienes tarjetas de regalo disponibles actualmente.
            </div>
        `;
    } else {
        giftCardsHtml = `
            <div class="gift-cards-list">
                ${activeGiftCards.map(g => `
                    <div class="gift-card-item">
                        <div class="gift-card-info">
                            <span class="gift-card-title">${g.isWelcome ? 'Gift Card de Bienvenida' : 'Premio de Fidelidad'}</span>
                            <div class="gift-card-code-wrapper">
                                <span class="gift-card-code">${g.code}</span>
                                <button class="copy-btn" onclick="copyGiftCardCode('${g.code}')">Copiar</button>
                            </div>
                        </div>
                        <div class="gift-card-value">
                            <span>Q ${g.amount.toFixed(2)}</span>
                            <div class="gift-card-tag">ACTIVO</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const stampsNeeded = totalStamps - card.stamps;
    const progressMsg = stampsNeeded > 0 
        ? `Te faltan <strong>${stampsNeeded} compra${stampsNeeded > 1 ? 's' : ''}</strong> para recibir una Gift Card de Q 150.`
        : '¡Felicidades! Has completado tu tarjeta de fidelidad y tu Gift Card ha sido generada.';

    container.innerHTML = `
        <h2 class="profile-title">Mi Perfil Novu</h2>
        
        <div class="profile-user-info">
            <div class="profile-user-name">${activeUser.name}</div>
            <div class="profile-user-email">${activeUser.email}</div>
        </div>
        
        <!-- Tarjeta de Fidelidad -->
        <div class="loyalty-card-wrapper">
            <div class="loyalty-card-section-title">Tarjeta de Fidelidad</div>
            <div class="loyalty-card">
                <div class="loyalty-card-header">
                    <span class="loyalty-card-brand">NOVU</span>
                    <span class="loyalty-card-label">Loyalty Club</span>
                </div>
                
                <div class="loyalty-stamps-grid">
                    ${stampsHtml}
                </div>
                
                <div class="loyalty-card-footer">
                    <div class="loyalty-cardholder">
                        <span class="loyalty-cardholder-label">Titular</span>
                        <span class="loyalty-cardholder-name">${activeUser.name.toUpperCase()}</span>
                    </div>
                    <div class="loyalty-progress-summary">
                        ${card.stamps} / ${totalStamps} SELLOS
                    </div>
                </div>
            </div>
            <div class="loyalty-info-text">
                ${progressMsg}<br>
                <span style="font-size: 0.65rem; color: #888888;">*Obtén 1 sello por cada compra realizada.</span>
            </div>
        </div>
        
        <!-- Mis Gift Cards -->
        <div class="gift-cards-section">
            <div class="loyalty-card-section-title">Mis Tarjetas de Regalo (Gift Cards)</div>
            ${giftCardsHtml}
            <div class="loyalty-info-text" style="font-size: 0.7rem; color: #888888; text-align: left; margin-top: 15px;">
                💡 Copia el código de tu Gift Card y envíalo junto a tu pedido por WhatsApp para aplicar tu descuento.
            </div>
        </div>
        
        <!-- Botones de Acción -->
        <div class="profile-actions">
            <button class="profile-close-btn" onclick="toggleProfileModal(false)">CERRAR</button>
            <button class="profile-logout-btn" onclick="handleLogoutAndClose()">CERRAR SESIÓN</button>
        </div>
    `;
}

// Copiar código
function copyGiftCardCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        showToastNotification(`Código ${code} copiado al portapapeles.`);
        const buttons = document.querySelectorAll('.copy-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(code)) {
                btn.textContent = 'Copiado!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copiar';
                    btn.classList.remove('copied');
                }, 2000);
            }
        });
    }).catch(err => {
        console.error('Error al copiar', err);
    });
}

function handleLogoutAndClose() {
    handleLogout();
    toggleProfileModal(false);
}

// Exponer globalmente
window.copyGiftCardCode = copyGiftCardCode;
window.handleLogoutAndClose = handleLogoutAndClose;
window.toggleProfileModal = toggleProfileModal;
window.handleRegister = handleRegister;

// Actualizar cabecera de cuenta de usuario
function updateUserHeaderUI() {
    const userLinks = document.querySelectorAll('.action-icon-link');
    userLinks.forEach(link => {
        // Ignorar carrito
        if (link.classList.contains('cart-link')) return;
        // Ignorar dashboard link
        if (link.classList.contains('admin-dashboard-link')) return;

        const labelSpan = link.querySelector('.action-label');
        if (labelSpan) {
            if (activeUser) {
                labelSpan.textContent = `Perfil: ${activeUser.name}`;
                link.onclick = (e) => {
                    e.preventDefault();
                    toggleProfileModal(true);
                };
            } else {
                labelSpan.textContent = `Iniciar Sesión`;
                link.onclick = (e) => {
                    e.preventDefault();
                    toggleLoginModal(true);
                };
            }
        }
    });

    // Manejar el botón de Dashboard BI para administradores
    const headerActionsList = document.querySelectorAll('.header-actions');
    headerActionsList.forEach(headerActions => {
        let dbLink = headerActions.querySelector('.admin-dashboard-link');
        
        if (activeUser && activeUser.role === 'admin') {
            if (!dbLink) {
                // Crear el botón de Dashboard BI
                dbLink = document.createElement('a');
                dbLink.href = 'admin.html';
                dbLink.className = 'action-icon-link admin-dashboard-link';
                dbLink.setAttribute('aria-label', 'Dashboard BI');
                dbLink.style.display = 'flex';
                dbLink.style.alignItems = 'center';
                dbLink.style.gap = '8px';
                dbLink.style.textDecoration = 'none';
                dbLink.style.color = '#C5A059';
                dbLink.style.fontSize = '0.75rem';
                dbLink.style.fontWeight = '600';
                dbLink.style.letterSpacing = '0.05em';
                dbLink.style.transition = 'opacity 0.2s';
                
                dbLink.innerHTML = `
                    <svg class="header-svg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 22px; height: 22px; stroke-width: 1.5; stroke: #C5A059;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                    <span class="action-label" style="color: #C5A059; font-family: var(--font-accent);">DASHBOARD BI</span>
                `;

                // Insertar al inicio de headerActions
                headerActions.insertBefore(dbLink, headerActions.firstChild);
            }
        } else {
            if (dbLink) {
                dbLink.remove();
            }
        }
    });
}

// Toast flotante
function showToastNotification(message) {
    // Buscar o crear toast en DOM
    let toast = document.getElementById('prototype-toast-el');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'prototype-toast-el';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// =============================================================
// DOM EVENT LISTENERS
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar órdenes, estadísticas, usuarios y catálogo en localStorage
    initOrdersAndStats();
    initUsers();
    initCatalog();
    syncCatalogDOM();

    // 1. Agregar overlays en el HTML de forma dinámica si no existen
    setupModalMarkups();

    // 2. Event Listeners para clicks
    
    // Iconos de Cuenta e Iniciar Sesión en Cabecera
    updateUserHeaderUI();

    // 2b. Buscador Interactivo (Filtrado en tiempo real)
    const searchInput = document.getElementById('search-input-el');
    const searchForm = document.getElementById('search-form-el');

    function applyAllFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        // Buscar pestaña activa
        const activeTabBtn = document.querySelector('.tab-btn.active');
        const activeTab = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'novedades';

        // Helper para normalizar género
        const normalizeGender = (g) => {
            if (!g) return 'unisex';
            const lower = g.toLowerCase().trim();
            if (lower === 'masculino' || lower === 'el' || lower === 'hombre' || lower === 'él') return 'el';
            if (lower === 'femenino' || lower === 'ella' || lower === 'mujer') return 'ella';
            return 'unisex';
        };

        // Buscar género activo
        const activeGenderBtn = document.querySelector('.gender-btn.active');
        const activeGender = activeGenderBtn ? activeGenderBtn.getAttribute('data-gender') : 'todos';

        // 1. Filtrar cuadrícula principal (Grid)
        const gridCards = document.querySelectorAll('.grid-product-card');
        let visibleGridCount = 0;
        gridCards.forEach(card => {
            const brand = card.querySelector('.grid-product-brand')?.textContent.toLowerCase() || '';
            const name = card.querySelector('.grid-product-name')?.textContent.toLowerCase() || '';
            const matchesSearch = brand.includes(query) || name.includes(query);

            const cardGender = normalizeGender(card.getAttribute('data-gender'));
            const matchesGender = (activeGender === 'todos') || 
                                  (activeGender === 'el' && (cardGender === 'el' || cardGender === 'unisex')) || 
                                  (activeGender === 'ella' && (cardGender === 'ella' || cardGender === 'unisex'));

            if (matchesSearch && matchesGender) {
                card.style.display = '';
                visibleGridCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 2. Filtrar carrusel de destacados (Slider)
        const sliderCards = document.querySelectorAll('.product-card-slide');
        sliderCards.forEach(card => {
            const brand = card.querySelector('.product-brand')?.textContent.toLowerCase() || '';
            const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
            const matchesSearch = brand.includes(query) || name.includes(query);

            const categories = (card.getAttribute('data-category') || '').split(' ');
            const matchesTab = categories.includes(activeTab);

            const cardGender = normalizeGender(card.getAttribute('data-gender'));
            const matchesGender = (activeGender === 'todos') || 
                                  (activeGender === 'el' && (cardGender === 'el' || cardGender === 'unisex')) || 
                                  (activeGender === 'ella' && (cardGender === 'ella' || cardGender === 'unisex'));

            if (matchesSearch && matchesTab && matchesGender) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        // 3. Mostrar / Ocultar banner de "Sin resultados"
        let noResultsContainer = document.getElementById('search-no-results-el');
        if (visibleGridCount === 0 && (query !== '' || activeGender !== 'todos')) {
            if (!noResultsContainer) {
                noResultsContainer = document.createElement('div');
                noResultsContainer.id = 'search-no-results-el';
                noResultsContainer.className = 'search-no-results';
                noResultsContainer.innerHTML = `
                    <div class="no-results-content">
                        <span class="no-results-icon">🔍</span>
                        <p class="no-results-text"></p>
                        <button class="no-results-clear-btn" id="clear-search-btn">Ver todos los perfumes</button>
                    </div>
                `;
                const grid = document.querySelector('.products-grid');
                if (grid) {
                    grid.parentNode.insertBefore(noResultsContainer, grid);
                }
            }
            
            const textEl = noResultsContainer.querySelector('.no-results-text');
            if (textEl) {
                if (query !== '') {
                    textEl.textContent = `No se encontraron perfumes para "${query}" con el filtro seleccionado.`;
                } else {
                    textEl.textContent = `No se encontraron perfumes para el filtro seleccionado.`;
                }
            }
            noResultsContainer.style.display = 'block';

            const clearBtn = document.getElementById('clear-search-btn');
            if (clearBtn) {
                clearBtn.onclick = () => {
                    if (searchInput) searchInput.value = '';
                    const defaultGenderBtn = document.querySelector('.gender-btn[data-gender="todos"]');
                    if (defaultGenderBtn) {
                        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
                        defaultGenderBtn.classList.add('active');
                    }
                    applyAllFilters();
                };
            }
        } else {
            if (noResultsContainer) {
                noResultsContainer.style.display = 'none';
            }
        }
    }

    // Exponer a nivel global
    window.applyAllFilters = applyAllFilters;

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyAllFilters();
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            applyAllFilters();
        });
    }

    // Event listeners para los botones de género
    const genderButtons = document.querySelectorAll('.gender-btn');
    genderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            genderButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyAllFilters();
        });
    });

    // Re-filtrar cuando se hace click en pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(() => {
                applyAllFilters();
            }, 50);
        });
    });

    // Icono del carrito abre sidebar
    const cartLinks = document.querySelectorAll('.cart-link');
    cartLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartSidebar(true);
        });
    });

    // Cerrar carrito
    const closeCartBtn = document.getElementById('close-cart-btn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => toggleCartSidebar(false));
    }

    // Cerrar modal de producto
    const closeProductBtn = document.getElementById('close-product-btn');
    if (closeProductBtn) {
        closeProductBtn.addEventListener('click', () => toggleProductModal(false));
    }

    // Cerrar modal de login
    const closeLoginBtn = document.getElementById('close-login-btn');
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => toggleLoginModal(false));
    }

    // Cerrar modal de checkout
    const closeCheckoutBtn = document.getElementById('close-checkout-btn');
    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', () => toggleCheckoutModal(false));
    }

    // Click en backdrop cierra todo
    const backdrop = document.getElementById('backdrop-overlay-el');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            toggleCartSidebar(false);
            toggleProductModal(false);
            toggleLoginModal(false);
            toggleCheckoutModal(false);
        });
    }

    // Formulario de login
    const loginForm = document.getElementById('login-form-el');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            handleLogin(email, password);
        });
    }

    // Formulario de registro
    const registerForm = document.getElementById('register-form-el');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            if (password !== confirmPassword) {
                showToastNotification('Las contraseñas no coinciden.');
                return;
            }
            handleRegister(name, email, password);
        });
    }

    // Controladores del Modal de Producto: Más / Menos cantidad
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyValue = document.getElementById('qty-value-el');

    if (qtyMinus && qtyPlus && qtyValue) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyValue.textContent);
            if (val > 1) qtyValue.textContent = val - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyValue.textContent);
            qtyValue.textContent = val + 1;
        });
    }

    // (Se removieron los listeners de tamaño antiguos para usar delegación de eventos)

    // Agregar al carrito desde el Modal
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', () => {
            if (currentViewingProduct) {
                const activeSizeBtn = document.querySelector('.size-options .size-btn.active');
                const size = activeSizeBtn ? activeSizeBtn.textContent : 'Botella Completa';
                const qty = parseInt(qtyValue.textContent) || 1;
                addToCart(currentViewingProduct, size, qty);
                toggleProductModal(false);
                toggleCartSidebar(true); // Abre el carrito para ver el item agregado
            }
        });
    }

    // Botones "VER MÁS" de las cuadrículas y carruseles
    // En lugar de usar addEventListener que se puede perder en sliders re-generados o estáticos,
    // usamos delegación de eventos en el body:
    document.body.addEventListener('click', (e) => {
        // Capturar click en botones de tamaño del modal
        if (e.target.classList.contains('size-btn')) {
            const sizeBtns = e.target.closest('.size-options').querySelectorAll('.size-btn');
            sizeBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Actualizar el precio visualmente en el modal
            const price = parseFloat(e.target.getAttribute('data-price'));
            if (!isNaN(price)) {
                const priceEl = document.getElementById('modal-product-price');
                if (priceEl) priceEl.textContent = `Q ${price.toFixed(2)}`;
            }
        }

        // Capturar click en VER MÁS de cuadrículas
        if (e.target.classList.contains('ver-mas-btn')) {
            e.preventDefault();
            const card = e.target.closest('.grid-product-card');
            if (card) {
                const id = card.id.replace('grid-', '');
                toggleProductModal(true, id);
            }
        }

        // Capturar click en las tarjetas de producto del slider
        const cardSlide = e.target.closest('.product-card-slide');
        if (cardSlide && !e.target.closest('.slider-nav-btn')) {
            e.preventDefault();
            // Obtener el ID del perfume a partir de la imagen
            const img = cardSlide.querySelector('img');
            if (img) {
                const src = img.getAttribute('src');
                const filename = src.split('/').pop().split('.')[0]; // saca 'yara', 'khamrah', etc.
                toggleProductModal(true, filename);
            }
        }
    });

    // Simular el click en checkout (Abre el formulario de checkout dinámico)
    const checkoutBtn = document.getElementById('checkout-btn-el');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            openCheckoutFlow();
        });
    }

    // Cargar interfaz inicial
    updateCartUI();
});

// Crear los elementos modales HTML dinámicamente si no están definidos
function setupModalMarkups() {
    // 1. Backdrop
    if (!document.getElementById('backdrop-overlay-el')) {
        const backdrop = document.createElement('div');
        backdrop.id = 'backdrop-overlay-el';
        backdrop.className = 'backdrop-overlay';
        document.body.appendChild(backdrop);
    }

    // 2. Carrito Sidebar
    if (!document.getElementById('cart-sidebar-el')) {
        const sidebar = document.createElement('div');
        sidebar.id = 'cart-sidebar-el';
        sidebar.className = 'cart-sidebar';
        sidebar.innerHTML = `
            <div class="cart-sidebar-header">
                <h2>TU CARRITO</h2>
                <button class="close-btn" id="close-cart-btn" aria-label="Cerrar carrito">&times;</button>
            </div>
            <div class="cart-items-container" id="cart-items-el"></div>
            <div class="cart-sidebar-footer">
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span id="cart-subtotal-el">Q 0.00</span>
                </div>
                <button class="checkout-btn" id="checkout-btn-el">INICIAR COMPRA</button>
            </div>
        `;
        document.body.appendChild(sidebar);
    }

    // 3. Modal Detalle
    if (!document.getElementById('product-modal-el')) {
        const modal = document.createElement('div');
        modal.id = 'product-modal-el';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="product-detail-modal">
                <button class="close-btn modal-close" id="close-product-btn" aria-label="Cerrar detalle">&times;</button>
                <div class="product-detail-grid">
                    <div class="product-detail-image-wrapper">
                        <img src="" alt="" id="modal-product-img">
                    </div>
                    <div class="product-detail-info">
                        <span class="product-detail-brand" id="modal-product-brand">MARCA</span>
                        <h2 class="product-detail-name" id="modal-product-name">Nombre del Perfume</h2>
                        <span class="product-detail-type" id="modal-product-type">EAU DE PARFUM</span>
                        <span class="product-detail-price" id="modal-product-price">Q 0.00</span>
                        
                        <div class="product-detail-description">
                            <h3>Descripción</h3>
                            <p id="modal-product-desc">Notas aromáticas y esencia de alta calidad para una estela inigualable.</p>
                        </div>
                        
                        <div class="product-selector-group">
                            <label>Tamaño</label>
                            <div class="size-options">
                                <button class="size-btn active">Botella Completa</button>
                            </div>
                        </div>
                        
                        <div class="product-selector-group">
                            <label>Cantidad</label>
                            <div class="quantity-selector">
                                <button class="qty-btn" id="qty-minus">-</button>
                                <span class="qty-value" id="qty-value-el">1</span>
                                <button class="qty-btn" id="qty-plus">+</button>
                            </div>
                        </div>
                        
                        <button class="add-to-cart-btn" id="modal-add-to-cart-btn">AGREGAR AL CARRITO</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // 4. Modal Login
    if (!document.getElementById('login-modal-el')) {
        const modal = document.createElement('div');
        modal.id = 'login-modal-el';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="login-modal">
                <button class="close-btn modal-close" id="close-login-btn" aria-label="Cerrar login">&times;</button>
                <div class="login-modal-content">
                    <!-- Vista de Iniciar Sesión -->
                    <div class="login-modal-view active" id="login-view-el">
                        <h2>INICIAR SESIÓN</h2>
                        <form id="login-form-el">
                            <div class="form-group">
                                <label for="login-email">Correo Electrónico</label>
                                <input type="email" id="login-email" required placeholder="tu@correo.com">
                            </div>
                            <div class="form-group">
                                <label for="login-password">Contraseña</label>
                                <input type="password" id="login-password" required placeholder="••••••••">
                            </div>
                            <button type="submit" class="login-submit-btn">INGRESAR</button>
                        </form>
                        <p class="login-modal-switch">¿No tienes cuenta? <a href="#" id="switch-to-register-btn">Regístrate aquí</a></p>
                    </div>

                    <!-- Vista de Registro -->
                    <div class="register-modal-view" id="register-view-el">
                        <h2>CREAR CUENTA</h2>
                        <form id="register-form-el">
                            <div class="form-group">
                                <label for="register-name">Nombre Completo</label>
                                <input type="text" id="register-name" required placeholder="Tu Nombre y Apellido">
                            </div>
                            <div class="form-group">
                                <label for="register-email">Correo Electrónico</label>
                                <input type="email" id="register-email" required placeholder="tu@correo.com">
                            </div>
                            <div class="form-group">
                                <label for="register-password">Contraseña</label>
                                <input type="password" id="register-password" required placeholder="••••••••">
                            </div>
                            <div class="form-group">
                                <label for="register-confirm-password">Confirmar Contraseña</label>
                                <input type="password" id="register-confirm-password" required placeholder="••••••••">
                            </div>
                            <button type="submit" class="login-submit-btn" style="background-color: #C5A059;">CREAR CUENTA</button>
                        </form>
                        <p class="login-modal-switch">¿Ya tienes cuenta? <a href="#" id="switch-to-login-btn">Inicia sesión aquí</a></p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Eventos para alternar entre Login y Registro
        const toRegisterBtn = modal.querySelector('#switch-to-register-btn');
        const toLoginBtn = modal.querySelector('#switch-to-login-btn');
        const loginView = modal.querySelector('#login-view-el');
        const registerView = modal.querySelector('#register-view-el');

        if (toRegisterBtn && toLoginBtn && loginView && registerView) {
            toRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                loginView.classList.remove('active');
                registerView.classList.add('active');
            });

            toLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                registerView.classList.remove('active');
                loginView.classList.add('active');
            });
        }
    }

    // 5. Modal Checkout
    if (!document.getElementById('checkout-modal-el')) {
        const modal = document.createElement('div');
        modal.id = 'checkout-modal-el';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="checkout-modal">
                <button class="close-btn modal-close" id="close-checkout-btn" aria-label="Cerrar checkout">&times;</button>
                <div class="checkout-modal-content" id="checkout-content-container">
                    <!-- Formulario de compra se inyecta dinámicamente -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // 6. Modal Perfil de Usuario
    if (!document.getElementById('profile-modal-el')) {
        const modal = document.createElement('div');
        modal.id = 'profile-modal-el';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="profile-modal">
                <button class="close-btn modal-close" id="close-profile-btn" aria-label="Cerrar perfil">&times;</button>
                <div class="profile-modal-content" id="profile-content-container">
                    <!-- Inyección dinámica -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeProfileBtn = modal.querySelector('#close-profile-btn');
        if (closeProfileBtn) {
            closeProfileBtn.addEventListener('click', () => toggleProfileModal(false));
        }
    }
}

// =============================================================
// ADMIN BI DASHBOARD AND CATALOG EDITOR
// =============================================================
function openAdminDashboard() {
    let modal = document.getElementById('admin-dashboard-modal-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'admin-dashboard-modal-el';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="admin-dashboard-modal">
                <button class="close-btn modal-close" id="close-admin-db-btn" aria-label="Cerrar Panel">&times;</button>
                <div class="admin-dashboard-layout">
                    <!-- Sidebar -->
                    <aside class="admin-sidebar">
                        <div class="admin-sidebar-header">
                            <span class="admin-logo">NOVU ADMIN</span>
                            <span class="admin-role">BUSINESS INTELLIGENCE</span>
                        </div>
                        <nav class="admin-nav">
                            <button class="admin-nav-item active" data-tab="metrics">
                                <svg class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/>
                                </svg>
                                Métricas de BI
                            </button>
                            <button class="admin-nav-item" data-tab="history">
                                <svg class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                </svg>
                                Historial de Pedidos
                            </button>
                            <button class="admin-nav-item" data-tab="catalog">
                                <svg class="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                                </svg>
                                Administrar Catálogo
                            </button>
                        </nav>
                        <div class="admin-sidebar-footer">
                            <button class="admin-logout-btn" id="admin-close-btn">CERRAR PANEL</button>
                        </div>
                    </aside>
                    <!-- Content Area -->
                    <main class="admin-content-area" id="admin-tab-content-container">
                        <!-- Loaded dynamically -->
                    </main>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Bind event listeners for close
        document.getElementById('close-admin-db-btn').addEventListener('click', () => toggleAdminDashboard(false));
        document.getElementById('admin-close-btn').addEventListener('click', () => toggleAdminDashboard(false));

        // Bind tab switching click events
        const tabItems = modal.querySelectorAll('.admin-nav-item');
        tabItems.forEach(tab => {
            tab.addEventListener('click', () => {
                tabItems.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderAdminDashboardTab(tab.getAttribute('data-tab'));
            });
        });
    }

    toggleAdminDashboard(true);
    // Render the initial tab
    renderAdminDashboardTab('metrics');
}

function toggleAdminDashboard(show) {
    const modal = document.getElementById('admin-dashboard-modal-el');
    const backdrop = document.getElementById('backdrop-overlay-el');

    if (modal && backdrop) {
        if (show) {
            modal.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            // Mantener backdrop si el carrito está abierto
            const cartActive = document.getElementById('cart-sidebar-el')?.classList.contains('active');
            if (!cartActive) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

function renderAdminDashboardTab(tabName) {
    const container = document.getElementById('admin-tab-content-container');
    if (!container) return;

    const orders = JSON.parse(localStorage.getItem('novu_orders')) || [];
    const stats = getStats();

    if (tabName === 'metrics') {
        // Compute revenue, counts, conversion
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
        const totalOrders = orders.length;
        const averageTicket = totalOrders ? totalRevenue / totalOrders : 0;
        const conversionRate = stats.cartInitiated ? (stats.ordersCompleted / stats.cartInitiated) * 100 : 0;

        // Analytics - Top Sellers
        const productCounts = {};
        orders.forEach(o => {
            o.items.forEach(item => {
                const key = `${item.brand} - ${item.name}`;
                productCounts[key] = (productCounts[key] || 0) + item.quantity;
            });
        });
        const sortedProducts = Object.entries(productCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        const topSellerQty = sortedProducts[0] ? sortedProducts[0][1] : 1;

        // Analytics - Buyer Gender Profile
        let maleCount = 0;
        let femaleCount = 0;
        let unspecifiedCount = 0;
        orders.forEach(o => {
            if (o.gender === 'Masculino') maleCount++;
            else if (o.gender === 'Femenino') femaleCount++;
            else unspecifiedCount++;
        });
        const genderTotal = totalOrders || 1;
        const malePct = (maleCount / genderTotal) * 100;
        const femalePct = (femaleCount / genderTotal) * 100;
        const unspecifiedPct = (unspecifiedCount / genderTotal) * 100;

        // Analytics - Geography
        const deptStats = {};
        orders.forEach(o => {
            const d = o.dept || 'Otros';
            if (!deptStats[d]) deptStats[d] = { count: 0, revenue: 0 };
            deptStats[d].count++;
            deptStats[d].revenue += o.total;
        });
        const sortedDepts = Object.entries(deptStats).sort((a, b) => b[1].revenue - a[1].revenue);

        // Analytics - Heatmap Sales by Day & Hour
        const weekdayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const timeSlots = ['Mañana (6-12)', 'Mediodía (12-15)', 'Tarde (15-19)', 'Noche (19-6)'];
        
        const heatmap = Array.from({ length: 7 }, () => Array(4).fill(0));
        orders.forEach(o => {
            const d = new Date(o.date);
            const rawDay = d.getDay();
            const dayIdx = rawDay === 0 ? 6 : rawDay - 1;
            
            const hour = d.getHours();
            let hourIdx = 3;
            if (hour >= 6 && hour < 12) hourIdx = 0;
            else if (hour >= 12 && hour < 15) hourIdx = 1;
            else if (hour >= 15 && hour < 19) hourIdx = 2;
            
            heatmap[dayIdx][hourIdx]++;
        });

        let maxHeatVal = 1;
        for (let d = 0; d < 7; d++) {
            for (let h = 0; h < 4; h++) {
                if (heatmap[d][h] > maxHeatVal) maxHeatVal = heatmap[d][h];
            }
        }

        container.innerHTML = `
            <div class="admin-tab-header">
                <h2>DASHBOARD DE BUSINESS INTELLIGENCE (BI)</h2>
                <p>Métricas de ventas, conversión y analítica de clientes en tiempo real.</p>
            </div>
            
            <!-- KPI Cards Grid -->
            <div class="kpis-grid">
                <div class="kpi-card">
                    <span class="kpi-title">Ingresos Totales</span>
                    <span class="kpi-value">Q ${totalRevenue.toFixed(2)}</span>
                    <span class="kpi-subtext">Ventas acumuladas</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-title">Pedidos Completados</span>
                    <span class="kpi-value">${totalOrders}</span>
                    <span class="kpi-subtext">De un total de ${stats.checkoutStarted} checkouts iniciados</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-title">Ticket Promedio</span>
                    <span class="kpi-value">Q ${averageTicket.toFixed(2)}</span>
                    <span class="kpi-subtext">Valor medio por pedido</span>
                </div>
                <div class="kpi-card">
                    <span class="kpi-title">Conversión de Carrito</span>
                    <span class="kpi-value">${conversionRate.toFixed(1)}%</span>
                    <span class="kpi-subtext">${stats.ordersCompleted} pedidos de ${stats.cartInitiated} carritos</span>
                </div>
            </div>

            <div class="charts-row">
                <!-- Top Sellers -->
                <div class="chart-container-card">
                    <h3>Productos más vendidos</h3>
                    <p class="chart-subtitle">Ranking por volumen de pedidos</p>
                    <div class="bar-chart-rank">
                        ${sortedProducts.length === 0 ? '<p class="empty-state">No hay ventas registradas.</p>' : sortedProducts.map(([name, qty]) => {
                            const percent = (qty / topSellerQty) * 100;
                            return `
                                <div class="rank-bar-row">
                                    <div class="rank-bar-info">
                                        <span class="rank-name">${name}</span>
                                        <span class="rank-qty">${qty} uds</span>
                                    </div>
                                    <div class="rank-bar-outer">
                                        <div class="rank-bar-inner" style="width: ${percent}%;"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Demographic Profile -->
                <div class="chart-container-card">
                    <h3>Perfil del Comprador</h3>
                    <p class="chart-subtitle">Segmentación por género declarada</p>
                    <div class="demographics-chart">
                        <div class="demo-row">
                            <div class="demo-info">
                                <span>Mujer</span>
                                <strong>${femaleCount} (${femalePct.toFixed(0)}%)</strong>
                            </div>
                            <div class="demo-bar-outer"><div class="demo-bar-inner female" style="width: ${femalePct}%;"></div></div>
                        </div>
                        <div class="demo-row">
                            <div class="demo-info">
                                <span>Hombre</span>
                                <strong>${maleCount} (${malePct.toFixed(0)}%)</strong>
                            </div>
                            <div class="demo-bar-outer"><div class="demo-bar-inner male" style="width: ${malePct}%;"></div></div>
                        </div>
                        <div class="demo-row">
                            <div class="demo-info">
                                <span>No especificado</span>
                                <strong>${unspecifiedCount} (${unspecifiedPct.toFixed(0)}%)</strong>
                            </div>
                            <div class="demo-bar-outer"><div class="demo-bar-inner unspecified" style="width: ${unspecifiedPct}%;"></div></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Heatmap Day & Hour Grid -->
            <div class="wide-chart-container-card">
                <h3>Ventas por día y por hora (Picos de Demanda)</h3>
                <p class="chart-subtitle">Identificación de puntos críticos de volumen de pedidos semanales y horarios</p>
                <div class="heatmap-wrapper">
                    <table class="bi-heatmap">
                        <thead>
                            <tr>
                                <th>Día / Horario</th>
                                ${timeSlots.map(slot => `<th>${slot}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${weekdayNames.map((dayName, dIdx) => `
                                <tr>
                                    <td class="heatmap-day-label"><strong>${dayName}</strong></td>
                                    ${timeSlots.map((_, hIdx) => {
                                        const count = heatmap[dIdx][hIdx];
                                        const shadeIntensity = count ? 0.15 + (count / maxHeatVal) * 0.85 : 0;
                                        return `
                                            <td class="heatmap-cell" style="background-color: rgba(197, 160, 89, ${shadeIntensity}); color: ${count > 0 ? '#121212' : '#888888'}; font-weight: ${count > 0 ? '700' : '400'};" title="${dayName}, ${timeSlots[hIdx]}: ${count} pedidos">
                                                ${count || '-'}
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Geography -->
            <div class="wide-chart-container-card" style="margin-bottom: 0;">
                <h3>Geografía de Ventas</h3>
                <p class="chart-subtitle">Distribución geográfica de pedidos por departamento del cliente</p>
                <div class="geography-table-wrapper">
                    <table class="bi-table">
                        <thead>
                            <tr>
                                <th>Departamento</th>
                                <th style="text-align: center;">Total Pedidos</th>
                                <th style="text-align: right;">Ingresos Totales</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sortedDepts.length === 0 ? '<tr><td colspan="3" class="empty-table">No hay pedidos registrados en ningún departamento.</td></tr>' : sortedDepts.map(([deptName, dStat]) => `
                                <tr>
                                    <td><strong>${deptName}</strong></td>
                                    <td style="text-align: center;">${dStat.count}</td>
                                    <td style="text-align: right; font-weight: 600;">Q ${dStat.revenue.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } 
    else if (tabName === 'history') {
        container.innerHTML = `
            <div class="admin-tab-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <h2>HISTORIAL DE PEDIDOS</h2>
                    <p>Registro completo y descargable de pedidos de clientes en la plataforma.</p>
                </div>
                <button class="export-csv-btn" id="export-csv-btn-el">
                    <svg style="width: 16px; height: 16px; margin-right: 6px; fill: currentColor;" viewBox="0 0 24 24">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
                    </svg>
                    EXPORTAR A CSV
                </button>
            </div>

            <div class="history-search-bar">
                <input type="text" id="history-search-input" placeholder="Buscar por cliente, correo o ID de pedido...">
            </div>

            <div class="history-table-wrapper">
                <table class="bi-table history-table">
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Departamento</th>
                            <th>Artículos</th>
                            <th style="text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody id="history-table-body-el">
                        <!-- Loaded dynamically -->
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('export-csv-btn-el').addEventListener('click', () => {
            exportOrdersToCSV(orders);
        });

        const tableBody = document.getElementById('history-table-body-el');
        const filterInput = document.getElementById('history-search-input');

        const renderHistoryRows = (filterText = '') => {
            const query = filterText.toLowerCase().trim();
            const filteredOrders = orders.filter(o => 
                o.orderNumber.toLowerCase().includes(query) ||
                o.clientName.toLowerCase().includes(query) ||
                o.email.toLowerCase().includes(query) ||
                o.dept.toLowerCase().includes(query)
            );

            if (filteredOrders.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" class="empty-table" style="text-align: center; padding: 40px 0;">No se encontraron pedidos.</td></tr>`;
                return;
            }

            tableBody.innerHTML = filteredOrders.map(o => {
                const dateStr = new Date(o.date).toLocaleDateString('es-GT', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const itemsCount = o.items.reduce((sum, item) => sum + item.quantity, 0);
                const itemsList = o.items.map(item => `${item.brand} ${item.name} (${item.size} x${item.quantity})`).join(', ');

                return `
                    <tr class="history-order-row" data-order-id="${o.orderNumber}" style="cursor: pointer;">
                        <td><strong>${o.orderNumber}</strong></td>
                        <td>${dateStr}</td>
                        <td>
                            <div class="history-client-name" style="font-weight: 600;">${o.clientName}</div>
                            <div class="history-client-email" style="font-size: 0.75rem; color: #888888;">${o.email}</div>
                        </td>
                        <td>${o.dept}</td>
                        <td class="history-items-cell" title="${itemsList}" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${itemsCount} uds (${o.items.map(i => i.name).join(', ')})</td>
                        <td style="text-align: right; font-weight: 700; color: #121212;">Q ${o.total.toFixed(2)}</td>
                    </tr>
                    <tr class="history-order-details-drawer" id="drawer-${o.orderNumber}" style="display: none; background-color: #FAF7F2;">
                        <td colspan="6" style="padding: 20px 30px; border-bottom: 1px solid #eae5dc;">
                            <div class="drawer-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                                <div>
                                    <h4 style="margin: 0 0 10px; font-size: 0.8rem; letter-spacing: 0.05em; color: #C5A059; font-family: var(--font-primary);">DATOS DEL CLIENTE</h4>
                                    <p style="margin: 4px 0; font-size: 0.8rem;"><strong>Género:</strong> ${o.gender}</p>
                                    <p style="margin: 4px 0; font-size: 0.8rem;"><strong>Teléfono:</strong> +502 ${o.phone}</p>
                                    <p style="margin: 4px 0; font-size: 0.8rem;"><strong>Dirección:</strong> ${o.address}, ${o.city}, ${o.dept}</p>
                                </div>
                                <div style="grid-column: span 2;">
                                    <h4 style="margin: 0 0 10px; font-size: 0.8rem; letter-spacing: 0.05em; color: #C5A059; font-family: var(--font-primary);">DETALLE DE ARTÍCULOS</h4>
                                    <div style="display: flex; flex-direction: column; gap: 8px;">
                                        ${o.items.map(item => `
                                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; border-bottom: 1px solid #eae5dc; padding-bottom: 4px;">
                                                <span>${item.quantity}x <strong>${item.brand}</strong> - ${item.name} (${item.size})</span>
                                                <span>Q ${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        `).join('')}
                                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-top: 5px;">
                                            <span>Monto Total (Envío Incluido):</span>
                                            <span>Q ${o.total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            const orderRows = tableBody.querySelectorAll('.history-order-row');
            orderRows.forEach(row => {
                row.addEventListener('click', () => {
                    const orderId = row.getAttribute('data-order-id');
                    const drawer = document.getElementById(`drawer-${orderId}`);
                    if (drawer) {
                        drawer.style.display = drawer.style.display === 'none' ? 'table-row' : 'none';
                    }
                });
            });
        };

        renderHistoryRows();

        filterInput.addEventListener('input', (e) => {
            renderHistoryRows(e.target.value);
        });
    } 
    else if (tabName === 'catalog') {
        container.innerHTML = `
            <div class="admin-tab-header">
                <h2>ADMINISTRAR CATÁLOGO DE PRODUCTOS</h2>
                <p>Edita los nombres, marcas, precios, fotos y etiquetas del catálogo activo. Los cambios se guardan localmente.</p>
            </div>
            
            <div class="catalog-manager-list" id="catalog-manager-items-el">
                <!-- Carga dinámica -->
            </div>
        `;

        renderCatalogList();
    }
    else if (tabName === 'whatsapp') {
        container.innerHTML = `
            <div class="admin-tab-header">
                <h2 style="font-family: var(--font-primary); font-size: 1.8rem; font-weight: 700; color: #1c1a17; margin-bottom: 5px; letter-spacing: 0.05em;">Confirmación de Órdenes (WhatsApp)</h2>
                <p>Confirma manualmente los pedidos ingresados vía WhatsApp para deducir inventario y registrar en contabilidad.</p>
            </div>
            <div id="whatsapp-orders-container" style="display: flex; flex-direction: column; gap: 15px;">
                <p>Cargando órdenes...</p>
            </div>
        `;
        fetchAdminWhatsappOrders();
    }
}

function exportOrdersToCSV(orders) {
    if (orders.length === 0) {
        showToastNotification('No hay pedidos para exportar.');
        return;
    }
    
    let csvContent = "\ufeff";
    csvContent += "ID Pedido,Fecha,Cliente,Genero,Email,Telefono,Departamento,Municipio,Direccion,Articulos,Subtotal,Envio,Total\n";
    
    orders.forEach(o => {
        const itemsDesc = o.items.map(item => `${item.brand} ${item.name} (${item.size} x${item.quantity})`).join('; ');
        const dateFormatted = new Date(o.date).toLocaleString('es-GT');
        const clean = (val) => `"${(val || '').toString().replace(/"/g, '""')}"`;
        
        const row = [
            clean(o.orderNumber),
            clean(dateFormatted),
            clean(o.clientName),
            clean(o.gender),
            clean(o.email),
            clean(o.phone),
            clean(o.dept),
            clean(o.city),
            clean(o.address),
            clean(itemsDesc),
            `Q${o.subtotal.toFixed(2)}`,
            `Q${o.shipping.toFixed(2)}`,
            `Q${o.total.toFixed(2)}`
        ].join(',');
        
        csvContent += row + "\n";
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `historial_pedidos_novu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToastNotification('Archivo CSV descargado con éxito.');
}

function renderCatalogList() {
    const listContainer = document.getElementById('catalog-manager-items-el');
    if (!listContainer) return;

    const listHtml = Object.entries(productsDatabase).map(([id, prod]) => {
        const genderLabel = prod.gender === 'el' ? 'Él' : prod.gender === 'ella' ? 'Ella' : 'Unisex';
        const catLabel = id === 'yara' || id === 'khamrah' || id === 'clubdenuit' || id === 'hawas' || id === 'asad' || id === 'amberoud' ? 'Árabe' : id === 'sauvage' || id === 'bleu' || id === 'lemale' || id === 'ysly' || id === 'eros' || id === 'gio' || id === 'coco' || id === 'libre' ? 'Diseñador' : 'Nicho';
        return `
            <div class="catalog-item-row" id="mgr-row-${id}">
                <div class="mgr-item-img-wrapper">
                    <img src="${prod.image}" alt="${prod.name}">
                </div>
                <div class="mgr-item-info">
                    <div class="mgr-item-brand">${prod.brand}</div>
                    <div class="mgr-item-name">${prod.name}</div>
                    <div class="mgr-item-category">Categoría: <strong>${catLabel}</strong></div>
                </div>
                <div class="mgr-item-meta">
                    <div class="mgr-item-gender">Género: <strong>${genderLabel}</strong></div>
                    <div class="mgr-item-price">Q ${parseFloat(prod.price).toFixed(2)}</div>
                </div>
                <div class="mgr-item-actions">
                    <button class="mgr-edit-btn" onclick="openProductEditForm('${id}')">EDITAR</button>
                </div>
            </div>
        `;
    }).join('');

    listContainer.innerHTML = listHtml;
}

function openProductEditForm(id) {
    const prod = productsDatabase[id];
    if (!prod) return;

    let editModal = document.getElementById('catalog-item-edit-modal-el');
    if (!editModal) {
        editModal = document.createElement('div');
        editModal.id = 'catalog-item-edit-modal-el';
        editModal.className = 'modal-overlay';
        editModal.style.zIndex = '10000';
        document.body.appendChild(editModal);
    }

    editModal.innerHTML = `
        <div class="product-edit-form-modal">
            <button class="close-btn modal-close" id="close-catalog-edit-btn" aria-label="Cerrar">&times;</button>
            <h2 style="font-family: var(--font-primary); font-size: 1.4rem; font-weight: 700; color: #121212; letter-spacing: 0.05em; margin-bottom: 20px; text-transform: uppercase;">EDITAR PERFUME</h2>
            <form id="catalog-edit-form-el">
                <div class="form-group">
                    <label for="edit-brand">Marca</label>
                    <input type="text" id="edit-brand" required value="${prod.brand}">
                </div>
                <div class="form-group">
                    <label for="edit-name">Nombre</label>
                    <input type="text" id="edit-name" required value="${prod.name}">
                </div>
                <div class="form-group">
                    <label for="edit-price">Precio (Q)</label>
                    <input type="number" id="edit-price" required step="0.01" min="0" value="${prod.price}">
                </div>
                <div class="form-group">
                    <label for="edit-gender">Género Destinatario</label>
                    <select id="edit-gender" required>
                        <option value="el" ${prod.gender === 'el' ? 'selected' : ''}>Para Él</option>
                        <option value="ella" ${prod.gender === 'ella' ? 'selected' : ''}>Para Ella</option>
                        <option value="unisex" ${prod.gender === 'unisex' || !prod.gender ? 'selected' : ''}>Unisex</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-image">Ruta de la Imagen</label>
                    <input type="text" id="edit-image" required value="${prod.image}">
                </div>
                <div class="form-group">
                    <label for="edit-desc">Descripción</label>
                    <textarea id="edit-desc" rows="4" required style="resize: vertical; font-family: inherit; width: 100%; border: 1px solid #eae5dc; padding: 10px; font-size: 0.85rem; box-sizing: border-box;">${prod.desc}</textarea>
                </div>
                <div class="edit-form-buttons" style="display: flex; gap: 15px; margin-top: 25px;">
                    <button type="submit" class="confirm-edit-btn" style="flex: 1; padding: 14px; background-color: #C5A059; color: white; border: none; font-family: var(--font-primary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; cursor: pointer; transition: background-color 0.2s;">GUARDAR CAMBIOS</button>
                    <button type="button" class="cancel-edit-btn" id="cancel-catalog-edit-btn" style="flex: 1; padding: 14px; background-color: #eae5dc; color: #1c1a17; border: none; font-family: var(--font-primary); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; cursor: pointer; transition: background-color 0.2s;">CANCELAR</button>
                </div>
            </form>
        </div>
    `;

    editModal.classList.add('active');

    const closeForm = () => {
        editModal.classList.remove('active');
    };

    document.getElementById('close-catalog-edit-btn').addEventListener('click', closeForm);
    document.getElementById('cancel-catalog-edit-btn').addEventListener('click', closeForm);

    document.getElementById('catalog-edit-form-el').addEventListener('submit', (e) => {
        e.preventDefault();
        
        prod.brand = document.getElementById('edit-brand').value;
        prod.name = document.getElementById('edit-name').value;
        prod.price = parseFloat(document.getElementById('edit-price').value);
        prod.gender = document.getElementById('edit-gender').value;
        prod.image = document.getElementById('edit-image').value;
        prod.desc = document.getElementById('edit-desc').value;

        localStorage.setItem('novu_catalog', JSON.stringify(productsDatabase));

        syncCatalogDOM();
        closeForm();
        renderCatalogList();

        showToastNotification(`¡Se han guardado los cambios para ${prod.name}!`);
    });
}

// Exponer en window scope para su uso en los botones dinámicos onclick
window.openProductEditForm = openProductEditForm;

// --- Admin WhatsApp Orders Functions ---
async function fetchAdminWhatsappOrders() {
    const container = document.getElementById('whatsapp-orders-container');
    if (!container) return;
    
    try {
        const response = await fetch('http://localhost:3000/whatsapp-orders/admin');
        const orders = await response.json();
        
        if (!orders || orders.length === 0) {
            container.innerHTML = '<p>No hay órdenes de WhatsApp registradas.</p>';
            return;
        }

        container.innerHTML = orders.map(order => {
            const isPending = order.estado === 'PENDIENTE';
            const cartItems = JSON.parse(order.carrito_json);
            const itemsHtml = cartItems.map(item => `<li>${item.quantity}x ${item.name} (${item.size}) - Q${item.price}</li>`).join('');
            
            return `
            <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; background: #fafafa; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="margin: 0 0 10px 0; font-family: var(--font-primary);">Pedido ${order.codigo} <span style="font-size: 0.8em; padding: 2px 8px; border-radius: 12px; background: ${isPending ? '#ffe082' : '#a5d6a7'}; color: #000;">${order.estado}</span></h3>
                    <p style="margin: 0; font-size: 0.9em; color: #555;"><strong>Cliente:</strong> ${order.nombre_cliente} | <strong>NIT:</strong> ${order.nit || 'CF'} | <strong>Tel:</strong> ${order.telefono}</p>
                    <p style="margin: 5px 0; font-size: 0.9em; color: #555;"><strong>Dir:</strong> ${order.direccion}</p>
                    <ul style="margin: 10px 0; padding-left: 20px; font-size: 0.85em;">${itemsHtml}</ul>
                    <p style="margin: 0; font-weight: bold; color: #1c1a17;">Total: Q${parseFloat(order.total).toFixed(2)}</p>
                </div>
                ${isPending ? `
                <button onclick="confirmWhatsappOrder(${order.id})" style="background: #4caf50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Confirmar Compra
                </button>
                ` : `
                <span style="color: #4caf50; font-weight: bold;">✓ Confirmada</span>
                `}
            </div>
            `;
        }).join('');

    } catch (err) {
        console.error('Error cargando órdenes whatsapp:', err);
        container.innerHTML = '<p style="color: red;">Error conectando con el servidor.</p>';
    }
}

async function confirmWhatsappOrder(id) {
    if (!confirm('¿Estás seguro de que el cliente pagó y deseas descontar esto del inventario?')) return;
    
    try {
        const response = await fetch(`http://localhost:3000/whatsapp-orders/${id}/confirm`, {
            method: 'PATCH'
        });
        
        if (response.ok) {
            alert('Orden confirmada y ventas registradas exitosamente.');
            fetchAdminWhatsappOrders(); // recargar
        } else {
            const data = await response.json();
            alert('Error: ' + (data.message || 'No se pudo confirmar la orden'));
        }
    } catch (err) {
        console.error(err);
        alert('Error de conexión al confirmar');
    }
}
