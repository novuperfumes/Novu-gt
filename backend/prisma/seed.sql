-- ============================================================
-- NOVU-GT MASSIVE SEED - SQL PURO
-- Ejecutar en Railway > MySQL > Database > SQL Editor
-- ============================================================

-- Limpiar data existente 
DELETE FROM `Decant`;
DELETE FROM `PresentacionPerfume`;
DELETE FROM `Perfume`;

-- ============================================================
-- INSERTAR PERFUMES
-- ============================================================
INSERT INTO `Perfume` (`nombre`, `descripcion`, `categoria`, `tipo`, `genero`, `imagen`, `galeria`, `marca`, `activo`) VALUES

-- DIOR
('Sauvage EDT',
 'Fresco y magnético, Sauvage es una brisa del viento sobre tierras salvajes. Notas de Calabria bergamot y Ambroxan crean una firma única e irresistible.',
 'perfume', 'EDT', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/dior-sauvage-edt.jpg',
 '[]', 'Dior', 1),

('Sauvage EDP',
 'La versión más intensa y profunda de Sauvage. Con un corazón de Sichuan pepper y una base de Ambroxan, es oscuro, carismático y poderoso.',
 'perfume', 'EDP', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/dior-sauvage-edp.jpg',
 '[]', 'Dior', 1),

('Sauvage Parfum',
 'La expresión más pura y concentrada de Sauvage. Sándalo de Nuevo Caledonia y Ambroxan crean un aura de masculinidad refinada y elegancia salvaje.',
 'perfume', 'Parfum', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/dior-sauvage-parfum.jpg',
 '[]', 'Dior', 1),

('Miss Dior Blooming Bouquet',
 'Un bouquet floral alegre y delicado. Notas de peonía, lichi y rosa blanca crean un aura femenina, inocente y romántica.',
 'perfume', 'EDT', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/dior-miss-dior-blooming.jpg',
 '[]', 'Dior', 1),

-- YSL
('Y EDP',
 'La fragancia del hombre de hoy. Fresca y amaderada con notas de manzana, salvia y cedro que proyectan energía y ambición.',
 'perfume', 'EDP', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/ysl-y-edp.jpg',
 '[]', 'YSL', 1),

('Black Opium EDP',
 'Adictivo y oscuro. Una explosión de café negro, flor blanca y vainilla que seduce en cada momento del día y la noche.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/ysl-black-opium.jpg',
 '[]', 'YSL', 1),

('Libre EDP',
 'Una declaración de libertad femenina. La lavanda francesa contrasta con flores blancas y musgo de roble para un resultado bold y seductor.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/ysl-libre.jpg',
 '[]', 'YSL', 1),

-- CHANEL
('Bleu de Chanel EDP',
 'Una fragancia perfecta para el hombre que se niega a ser encasillado. Profunda, limpia y elegante con notas de cítricos, madera y ámbar.',
 'perfume', 'EDP', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/chanel-bleu-edp.jpg',
 '[]', 'Chanel', 1),

('Bleu de Chanel Parfum',
 'La versión más refinada y madura de Bleu. Sándalo, cedro y patchouli crean un aura de sofisticación y elegancia masculina absolutas.',
 'perfume', 'Parfum', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/chanel-bleu-parfum.jpg',
 '[]', 'Chanel', 1),

('Chanel N°5 EDP',
 'El perfume más icónico de la historia. Un bouquet floral aldehídico de rosa, jazmín e ylang-ylang que ha seducido generaciones enteras.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/chanel-n5.jpg',
 '[]', 'Chanel', 1),

-- PACO RABANNE
('1 Million EDT',
 'Atrevido, seductor y lujoso. Con notas de mandarina, rosa picante y madera de patchouli, es la fragancia que abre todas las puertas.',
 'perfume', 'EDT', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/paco-1million-edt.jpg',
 '[]', 'Paco Rabanne', 1),

('1 Million Parfum',
 'La versión más rica e intensa de 1 Million. Miel, flor de naranja y notas amaderadas crean una fragancia opulenta e irresistible.',
 'perfume', 'Parfum', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/paco-1million-parfum.jpg',
 '[]', 'Paco Rabanne', 1),

('Olympéa EDP',
 'Para la diosa contemporánea. Notas de vainilla salada, flor de jengibre y mandarina blanca crean una divinidad sensual y poderosa.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/paco-olympea.jpg',
 '[]', 'Paco Rabanne', 1),

-- VERSACE
('Eros EDT',
 'Inspirado en el dios griego del amor. Menta, manzana verde y vainilla crean una fragancia fresca, magnética y seductora.',
 'perfume', 'EDT', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/versace-eros-edt.jpg',
 '[]', 'Versace', 1),

('Dylan Blue EDT',
 'La esencia mediterránea de Versace. Higo, violeta de agua y ámbar crean una fragancia acuática y masculina de carácter profundo.',
 'perfume', 'EDT', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/versace-dylan-blue.jpg',
 '[]', 'Versace', 1),

('Bright Crystal EDT',
 'Cristalina, fresca y femenina. Pomelo, peonía y magnolia se combinan en un aura alegre e irresistiblemente luminosa.',
 'perfume', 'EDT', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/versace-bright-crystal.jpg',
 '[]', 'Versace', 1),

-- CREED
('Aventus EDP',
 'La fragancia de los líderes. Piña, abedul ahumado y musgo crean un aura de poder, éxito y elegancia que trasciende generaciones.',
 'perfume', 'EDP', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/creed-aventus.jpg',
 '[]', 'Creed', 1),

-- TOM FORD
('Black Orchid EDP',
 'Oscuro, misterioso y opulento. Orquídea negra, trufa y madera de ébano crean una fragancia de lujo absoluto para quienes no pasan desapercibidos.',
 'perfume', 'EDP', 'Unisex',
 'https://ik.imagekit.io/novuperfumes/perfumes/tom-ford-black-orchid.jpg',
 '[]', 'Tom Ford', 1),

('Tobacco Vanille EDP',
 'Cálido y suntuoso. Tabaco, vainilla y especias se entrelazan en un gourmand amaderado que evoca lujo y confort.',
 'perfume', 'EDP', 'Unisex',
 'https://ik.imagekit.io/novuperfumes/perfumes/tom-ford-tobacco-vanille.jpg',
 '[]', 'Tom Ford', 1),

-- GIORGIO ARMANI
('Acqua di Giò EDP',
 'El icono del frescor mediterráneo. Bergamota, notas marinas y patchouli crean la fragancia más fresca y reconocible del mercado.',
 'perfume', 'EDP', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/armani-acqua-edp.jpg',
 '[]', 'Giorgio Armani', 1),

('Acqua di Giò Profumo',
 'La versión más profunda e intensa de Acqua di Giò. Incienso marino, vetiver y patchouli crean una fragancia magnética y misteriosa.',
 'perfume', 'Parfum', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/armani-acqua-profumo.jpg',
 '[]', 'Giorgio Armani', 1),

('Sì EDP',
 'Un bouquet floral moderno y sensual. Grosella negra, rosa centifolia y vainilla crean la fragancia definitiva de la femineidad contemporánea.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/armani-si.jpg',
 '[]', 'Giorgio Armani', 1),

-- MUGLER
('Angel EDP',
 'La fragancia que lo reinventó todo. Chocolate, miel de abeja y patchouli crean un gourmand celestial, adictivo e inconfundible.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/mugler-angel.jpg',
 '[]', 'Mugler', 1),

('Alien EDP',
 'Misteriosa y etérea. Jazmín blanco de sambac, heliotropo y madera de cachemir crean una fragancia única, de otro mundo.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/mugler-alien.jpg',
 '[]', 'Mugler', 1),

-- VIKTOR&ROLF
('Flowerbomb EDP',
 'Una explosión floral que cambia el mundo. Con jazmín, rosa, patchouli y orquídea, es la fragancia más romántica y adictiva que existe.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/viktor-rolf-flowerbomb.jpg',
 '[]', 'Viktor&Rolf', 1),

-- CAROLINA HERRERA
('Good Girl EDP',
 'Para la mujer de dos caras. Jazmín de día, cacao y tonka de noche. Una dualidad perfecta en el frasco más icónico del mercado.',
 'perfume', 'EDP', 'Femenino',
 'https://ik.imagekit.io/novuperfumes/perfumes/ch-good-girl.jpg',
 '[]', 'Carolina Herrera', 1),

('Bad Boy EDT',
 'El rebelde con causa. Cedro, salvia y gel de labdano crean una fragancia para el hombre que rompe todas las reglas.',
 'perfume', 'EDT', 'Masculino',
 'https://ik.imagekit.io/novuperfumes/perfumes/ch-bad-boy.jpg',
 '[]', 'Carolina Herrera', 1);

-- ============================================================
-- INSERTAR PRESENTACIONES (tamaños de botella completa)
-- ============================================================
-- Dior Sauvage EDT (id=1)
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Sauvage EDT' AND marca='Dior'), '60ml', 620.00, 15, 380.00),
((SELECT id FROM Perfume WHERE nombre='Sauvage EDT' AND marca='Dior'), '100ml', 780.00, 10, 460.00);

-- Dior Sauvage EDP
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Sauvage EDP' AND marca='Dior'), '60ml', 680.00, 12, 420.00),
((SELECT id FROM Perfume WHERE nombre='Sauvage EDP' AND marca='Dior'), '100ml', 860.00, 8, 520.00);

-- Dior Sauvage Parfum
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Sauvage Parfum' AND marca='Dior'), '75ml', 980.00, 6, 600.00);

-- Dior Miss Dior Blooming
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Miss Dior Blooming Bouquet' AND marca='Dior'), '50ml', 580.00, 10, 360.00),
((SELECT id FROM Perfume WHERE nombre='Miss Dior Blooming Bouquet' AND marca='Dior'), '100ml', 820.00, 6, 500.00);

-- YSL Y EDP
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Y EDP' AND marca='YSL'), '60ml', 640.00, 12, 400.00),
((SELECT id FROM Perfume WHERE nombre='Y EDP' AND marca='YSL'), '100ml', 820.00, 8, 500.00);

-- YSL Black Opium
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Black Opium EDP' AND marca='YSL'), '50ml', 620.00, 10, 380.00),
((SELECT id FROM Perfume WHERE nombre='Black Opium EDP' AND marca='YSL'), '90ml', 860.00, 7, 520.00);

-- YSL Libre
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Libre EDP' AND marca='YSL'), '50ml', 660.00, 9, 400.00),
((SELECT id FROM Perfume WHERE nombre='Libre EDP' AND marca='YSL'), '90ml', 900.00, 5, 560.00);

-- Chanel Bleu EDP
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Bleu de Chanel EDP' AND marca='Chanel'), '50ml', 800.00, 10, 500.00),
((SELECT id FROM Perfume WHERE nombre='Bleu de Chanel EDP' AND marca='Chanel'), '100ml', 1100.00, 6, 700.00);

-- Chanel Bleu Parfum
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Bleu de Chanel Parfum' AND marca='Chanel'), '75ml', 1250.00, 5, 800.00);

-- Chanel N5
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Chanel N°5 EDP' AND marca='Chanel'), '50ml', 900.00, 8, 580.00),
((SELECT id FROM Perfume WHERE nombre='Chanel N°5 EDP' AND marca='Chanel'), '100ml', 1300.00, 4, 850.00);

-- Paco 1 Million EDT
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='1 Million EDT' AND marca='Paco Rabanne'), '50ml', 560.00, 15, 340.00),
((SELECT id FROM Perfume WHERE nombre='1 Million EDT' AND marca='Paco Rabanne'), '100ml', 760.00, 10, 460.00);

-- Paco 1 Million Parfum
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='1 Million Parfum' AND marca='Paco Rabanne'), '75ml', 880.00, 7, 540.00);

-- Paco Olympéa
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Olympéa EDP' AND marca='Paco Rabanne'), '50ml', 580.00, 12, 360.00),
((SELECT id FROM Perfume WHERE nombre='Olympéa EDP' AND marca='Paco Rabanne'), '90ml', 780.00, 8, 480.00);

-- Versace Eros EDT
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Eros EDT' AND marca='Versace'), '50ml', 520.00, 15, 320.00),
((SELECT id FROM Perfume WHERE nombre='Eros EDT' AND marca='Versace'), '100ml', 720.00, 10, 440.00);

-- Versace Dylan Blue
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Dylan Blue EDT' AND marca='Versace'), '50ml', 500.00, 12, 300.00),
((SELECT id FROM Perfume WHERE nombre='Dylan Blue EDT' AND marca='Versace'), '100ml', 700.00, 8, 420.00);

-- Versace Bright Crystal
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Bright Crystal EDT' AND marca='Versace'), '50ml', 480.00, 14, 290.00),
((SELECT id FROM Perfume WHERE nombre='Bright Crystal EDT' AND marca='Versace'), '90ml', 680.00, 9, 400.00);

-- Creed Aventus
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Aventus EDP' AND marca='Creed'), '50ml', 2200.00, 4, 1500.00),
((SELECT id FROM Perfume WHERE nombre='Aventus EDP' AND marca='Creed'), '100ml', 3800.00, 2, 2700.00);

-- Tom Ford Black Orchid
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Black Orchid EDP' AND marca='Tom Ford'), '50ml', 1400.00, 6, 900.00),
((SELECT id FROM Perfume WHERE nombre='Black Orchid EDP' AND marca='Tom Ford'), '100ml', 2200.00, 3, 1500.00);

-- Tom Ford Tobacco Vanille
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Tobacco Vanille EDP' AND marca='Tom Ford'), '50ml', 1600.00, 5, 1050.00);

-- Armani Acqua EDP
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Acqua di Giò EDP' AND marca='Giorgio Armani'), '60ml', 680.00, 12, 420.00),
((SELECT id FROM Perfume WHERE nombre='Acqua di Giò EDP' AND marca='Giorgio Armani'), '100ml', 860.00, 8, 530.00);

-- Armani Acqua Profumo
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Acqua di Giò Profumo' AND marca='Giorgio Armani'), '75ml', 960.00, 6, 600.00);

-- Armani Sì
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Sì EDP' AND marca='Giorgio Armani'), '50ml', 640.00, 10, 400.00),
((SELECT id FROM Perfume WHERE nombre='Sì EDP' AND marca='Giorgio Armani'), '100ml', 920.00, 6, 580.00);

-- Mugler Angel
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Angel EDP' AND marca='Mugler'), '50ml', 580.00, 10, 360.00),
((SELECT id FROM Perfume WHERE nombre='Angel EDP' AND marca='Mugler'), '100ml', 820.00, 6, 500.00);

-- Mugler Alien
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Alien EDP' AND marca='Mugler'), '60ml', 620.00, 9, 380.00);

-- Viktor&Rolf Flowerbomb
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Flowerbomb EDP' AND marca='Viktor&Rolf'), '50ml', 780.00, 8, 480.00),
((SELECT id FROM Perfume WHERE nombre='Flowerbomb EDP' AND marca='Viktor&Rolf'), '100ml', 1100.00, 5, 680.00);

-- CH Good Girl
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Good Girl EDP' AND marca='Carolina Herrera'), '50ml', 680.00, 12, 420.00),
((SELECT id FROM Perfume WHERE nombre='Good Girl EDP' AND marca='Carolina Herrera'), '80ml', 900.00, 7, 560.00);

-- CH Bad Boy
INSERT INTO `PresentacionPerfume` (`id_perfume`, `tamanio`, `precio`, `stock`, `costo`) VALUES
((SELECT id FROM Perfume WHERE nombre='Bad Boy EDT' AND marca='Carolina Herrera'), '50ml', 620.00, 10, 380.00),
((SELECT id FROM Perfume WHERE nombre='Bad Boy EDT' AND marca='Carolina Herrera'), '100ml', 840.00, 7, 520.00);


-- ============================================================
-- INSERTAR DECANTS
-- ============================================================
INSERT INTO `Decant` (`id_perfume`, `ml_origen`, `costo_original`, `precio_original`, `costo_5ml`, `precio_5ml`, `stock_5ml`, `costo_10ml`, `precio_10ml`, `stock_10ml`) VALUES

((SELECT id FROM Perfume WHERE nombre='Sauvage EDT' AND marca='Dior'),        100, 460.00, 780.00,  25.00, 50.00, 30, 45.00, 85.00, 20),
((SELECT id FROM Perfume WHERE nombre='Sauvage EDP' AND marca='Dior'),        100, 520.00, 860.00,  28.00, 55.00, 28, 50.00, 95.00, 18),
((SELECT id FROM Perfume WHERE nombre='Sauvage Parfum' AND marca='Dior'),      75, 600.00, 980.00,  38.00, 70.00, 20, 68.00, 120.00, 12),
((SELECT id FROM Perfume WHERE nombre='Miss Dior Blooming Bouquet' AND marca='Dior'), 100, 500.00, 820.00, 26.00, 52.00, 25, 48.00, 88.00, 15),
((SELECT id FROM Perfume WHERE nombre='Y EDP' AND marca='YSL'),               100, 500.00, 820.00,  27.00, 52.00, 26, 48.00, 90.00, 16),
((SELECT id FROM Perfume WHERE nombre='Black Opium EDP' AND marca='YSL'),      90, 520.00, 860.00,  30.00, 58.00, 24, 55.00, 100.00, 15),
((SELECT id FROM Perfume WHERE nombre='Libre EDP' AND marca='YSL'),            90, 560.00, 900.00,  32.00, 62.00, 22, 58.00, 105.00, 14),
((SELECT id FROM Perfume WHERE nombre='Bleu de Chanel EDP' AND marca='Chanel'), 100, 700.00, 1100.00, 37.00, 68.00, 22, 66.00, 120.00, 14),
((SELECT id FROM Perfume WHERE nombre='Bleu de Chanel Parfum' AND marca='Chanel'), 75, 800.00, 1250.00, 50.00, 90.00, 16, 90.00, 160.00, 10),
((SELECT id FROM Perfume WHERE nombre='Chanel N°5 EDP' AND marca='Chanel'),   100, 850.00, 1300.00, 44.00, 80.00, 18, 80.00, 145.00, 10),
((SELECT id FROM Perfume WHERE nombre='1 Million EDT' AND marca='Paco Rabanne'), 100, 460.00, 760.00, 24.00, 48.00, 30, 43.00, 82.00, 20),
((SELECT id FROM Perfume WHERE nombre='1 Million Parfum' AND marca='Paco Rabanne'), 75, 540.00, 880.00, 34.00, 65.00, 22, 62.00, 115.00, 14),
((SELECT id FROM Perfume WHERE nombre='Olympéa EDP' AND marca='Paco Rabanne'), 90, 480.00, 780.00, 26.00, 50.00, 25, 47.00, 88.00, 16),
((SELECT id FROM Perfume WHERE nombre='Eros EDT' AND marca='Versace'),        100, 440.00, 720.00,  23.00, 45.00, 32, 41.00, 78.00, 22),
((SELECT id FROM Perfume WHERE nombre='Dylan Blue EDT' AND marca='Versace'),  100, 420.00, 700.00,  22.00, 44.00, 30, 39.00, 76.00, 20),
((SELECT id FROM Perfume WHERE nombre='Bright Crystal EDT' AND marca='Versace'), 90, 400.00, 680.00, 22.00, 42.00, 28, 38.00, 74.00, 18),
((SELECT id FROM Perfume WHERE nombre='Aventus EDP' AND marca='Creed'),       100, 2700.00, 3800.00, 140.00, 250.00, 10, 260.00, 450.00, 6),
((SELECT id FROM Perfume WHERE nombre='Black Orchid EDP' AND marca='Tom Ford'), 100, 900.00, 1400.00, 47.00, 88.00, 16, 85.00, 155.00, 10),
((SELECT id FROM Perfume WHERE nombre='Tobacco Vanille EDP' AND marca='Tom Ford'), 50, 1050.00, 1600.00, 100.00, 175.00, 12, 185.00, 320.00, 7),
((SELECT id FROM Perfume WHERE nombre='Acqua di Giò EDP' AND marca='Giorgio Armani'), 100, 530.00, 860.00, 28.00, 54.00, 25, 50.00, 95.00, 16),
((SELECT id FROM Perfume WHERE nombre='Acqua di Giò Profumo' AND marca='Giorgio Armani'), 75, 600.00, 960.00, 38.00, 72.00, 18, 68.00, 128.00, 12),
((SELECT id FROM Perfume WHERE nombre='Sì EDP' AND marca='Giorgio Armani'),   100, 580.00, 920.00,  30.00, 58.00, 22, 55.00, 100.00, 14),
((SELECT id FROM Perfume WHERE nombre='Angel EDP' AND marca='Mugler'),        100, 500.00, 820.00,  26.00, 50.00, 24, 47.00, 88.00, 15),
((SELECT id FROM Perfume WHERE nombre='Alien EDP' AND marca='Mugler'),         60, 380.00, 620.00,  32.00, 60.00, 20, 58.00, 108.00, 12),
((SELECT id FROM Perfume WHERE nombre='Flowerbomb EDP' AND marca='Viktor&Rolf'), 100, 680.00, 1100.00, 35.00, 66.00, 20, 64.00, 118.00, 12),
((SELECT id FROM Perfume WHERE nombre='Good Girl EDP' AND marca='Carolina Herrera'), 80, 560.00, 900.00, 34.00, 64.00, 22, 62.00, 112.00, 14),
((SELECT id FROM Perfume WHERE nombre='Bad Boy EDT' AND marca='Carolina Herrera'), 100, 520.00, 840.00, 27.00, 52.00, 24, 49.00, 90.00, 15);

SELECT 
  CONCAT('✅ ', COUNT(*), ' perfumes insertados') as resultado 
FROM Perfume
WHERE id > 0;
