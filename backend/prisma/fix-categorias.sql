-- Perfumes de Diseñador (marcas: Dior, Chanel, YSL, Carolina Herrera, Viktor&Rolf, Giorgio Armani, Paco Rabanne, Versace, Hugo Boss, Burberry, Marc Jacobs, Jean Paul Gaultier, Dolce&Gabbana)
UPDATE Perfume SET categoria = 'diseñador' WHERE marca IN (
  'Dior', 'Chanel', 'Yves Saint Laurent', 'Carolina Herrera', 'Viktor&Rolf',
  'Giorgio Armani', 'Paco Rabanne', 'Versace', 'Hugo Boss', 'Burberry',
  'Marc Jacobs', 'Jean Paul Gaultier', 'Dolce&Gabbana'
);

-- Perfumes de Nicho (marcas: Creed, Maison Margiela, Jo Malone, Tom Ford, Parfums de Marly, Amouage, Initio, Xerjoff, Montale, Nishane)
UPDATE Perfume SET categoria = 'nicho' WHERE marca IN (
  'Creed', 'Maison Margiela', 'Jo Malone London', 'Tom Ford', 'Parfums de Marly',
  'Amouage', 'Initio Parfums Privés', 'Xerjoff', 'Montale', 'Nishane'
);

-- Perfumes Árabes (marcas: Lattafa, Ajmal, Arabian Oud, Swiss Arabian, Al Haramain)
UPDATE Perfume SET categoria = 'arabe' WHERE marca IN (
  'Lattafa', 'Ajmal', 'Arabian Oud', 'Swiss Arabian', 'Al Haramain'
);

-- Verificar resultados
SELECT categoria, COUNT(*) as total FROM Perfume GROUP BY categoria;
