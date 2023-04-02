-- This is an empty migration.
INSERT INTO "subcategories" ("name", "slug", "created_at", "updated_at", "category_id")
VALUES ('Mobile Devices', 'mobile-devices', NOW(), NOW(), (SELECT id FROM "categories" WHERE slug = 'electronics')),
       ('Tablets', 'tablets',NOW(), NOW(),  (SELECT id FROM "categories" WHERE slug = 'electronics')),
       ('Smart Watches', 'smart-watches',NOW(), NOW(),  (SELECT id FROM "categories" WHERE slug = 'electronics')),
       ('Furniture', 'furniture',NOW(), NOW(), (SELECT id FROM "categories" WHERE slug = 'home')),
       ('Home Devices', 'home-devices', NOW(), NOW(),(SELECT id FROM "categories" WHERE slug = 'home')),
       ('Spare Parts', 'spare-parts', NOW(), NOW(),(SELECT id FROM "categories" WHERE slug = 'automotive')),
       ('Accessories', 'accessories', NOW(), NOW(),(SELECT id FROM "categories" WHERE slug = 'automotive')),
       ('Gaming Consoles', 'gaming-consoles',NOW(), NOW(), (SELECT id FROM "categories" WHERE slug = 'video-games')),
       ('Digital Games', 'digital-games', NOW(), NOW(),(SELECT id FROM "categories" WHERE slug = 'video-games')),
       ('Equipment', 'equipment', NOW(), NOW(),(SELECT id FROM "categories" WHERE slug = 'sports')),
       ('Wear', 'wear', NOW(), NOW(), (SELECT id FROM "categories" WHERE slug = 'sports')),
       ('Equipment', 'equipment', NOW(), NOW() ,(SELECT id FROM "categories" WHERE slug = 'travel')),
       ('Wear', 'wear', NOW(), NOW(), (SELECT id FROM "categories" WHERE slug = 'travel'));

    
