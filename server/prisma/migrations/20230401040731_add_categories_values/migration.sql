-- This is an empty migration.
INSERT INTO "categories" ("name", "slug", "created_at", "updated_at")
VALUES ('Electronics', 'electronics', NOW(), NOW()),
       ('Fashion', 'fashion', NOW(), NOW()),
       ('Collectables', 'collectables', NOW(), NOW()),
       ('Home', 'home', NOW(), NOW()),
       ('Automotive', 'automotive', NOW(), NOW()),
       ('Video Games', 'video-games', NOW(), NOW()),
       ('Sports', 'sports', NOW(), NOW()),
       ('Travel', 'travel', NOW(), NOW());