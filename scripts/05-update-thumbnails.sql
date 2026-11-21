-- Update articles with generic demo thumbnail illustrations
UPDATE articles SET thumbnail = '/images/thumbnails/programming-guide.svg' 
WHERE title = 'Panduan Lengkap Belajar Programming';

UPDATE articles SET thumbnail = '/images/thumbnails/productivity-tips.svg' 
WHERE title = 'Tips Produktivitas untuk Developer';

UPDATE articles SET thumbnail = '/images/thumbnails/tech-trends-2024.svg' 
WHERE title = 'Tren Teknologi 2024';

UPDATE articles SET thumbnail = '/images/thumbnails/web-development.svg' 
WHERE title = 'Dasar-dasar Web Development';

UPDATE articles SET thumbnail = '/images/thumbnails/digital-marketing.svg' 
WHERE title = 'Strategi Digital Marketing Modern';

-- Update videos with generic demo thumbnail illustrations
UPDATE videos SET thumbnail = '/images/thumbnails/react-tutorial.svg' 
WHERE title = 'Tutorial React.js untuk Pemula';

UPDATE videos SET thumbnail = '/images/thumbnails/nodejs-api.svg' 
WHERE title = 'Membangun API dengan Node.js';

UPDATE videos SET thumbnail = '/images/thumbnails/figma-design.svg' 
WHERE title = 'Design System dengan Figma';

UPDATE videos SET thumbnail = '/images/thumbnails/postgresql-db.svg' 
WHERE title = 'Pengenalan Database PostgreSQL';

UPDATE videos SET thumbnail = '/images/thumbnails/javascript-advanced.svg' 
WHERE title = 'Advanced JavaScript Concepts';
