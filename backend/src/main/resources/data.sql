-- ===========================================================================
-- SAMPLE DATA. Everything here is MADE UP for local demos: the reviews,
-- ratings and users are not real people or real reviews. Building names and
-- coordinates are real UW-Madison places, used only so the map looks right.
--
-- Loaded by Spring Boot on startup (spring.sql.init.mode=always, after
-- Hibernate creates the tables). Every row has a fixed id and uses
-- INSERT IGNORE, so restarting never duplicates rows. Set SQL_INIT_MODE=never
-- to skip it.
--
-- Demo logins (local only; passwords are stored as bcrypt hashes below):
--   bucky@example.test / demo-bucky-pass
--   alex@example.test  / demo-alex-pass
--   sam@example.test   / demo-sam-pass
-- ===========================================================================

INSERT IGNORE INTO `User` (user_id, name, email, password, created_at, updated_at) VALUES
 (1, 'Bucky Badger', 'bucky@example.test', '$2a$10$63yKH6A0iQpH9am1qhRMYe2whwYXshl.yy9mUHhkoc5fDHxX9ym3e', NOW(), NOW()),
 (2, 'Alex Sample',  'alex@example.test',  '$2a$10$QpZJbLJaTM2xM5I7t/MdDe0lC/AIF47OjDgPCavtEaroCaoSsYWDm', NOW(), NOW()),
 (3, 'Sam Sample',   'sam@example.test',   '$2a$10$VUf6DVf6fNjvIoliftpuGei5rPmSqwizwAaiHDJF8kmnY1xTutw7e', NOW(), NOW());

INSERT IGNORE INTO Building (building_id, name, latitude, longitude, address, created_at, updated_at) VALUES
 (1, 'Memorial Union',        43.07610, -89.39970, '800 Langdon St',      NOW(), NOW()),
 (2, 'Helen C. White Hall',   43.07660, -89.40110, '600 N Park St',       NOW(), NOW()),
 (3, 'Memorial Library',      43.07520, -89.39830, '728 State St',        NOW(), NOW()),
 (4, 'Union South',           43.07190, -89.40790, '1308 W Dayton St',    NOW(), NOW()),
 (5, 'Steenbock Library',     43.07590, -89.41150, '550 Babcock Dr',      NOW(), NOW()),
 (6, 'Wendt Commons',         43.07260, -89.41030, '215 N Randall Ave',   NOW(), NOW()),
 (7, 'Grainger Hall',         43.07280, -89.40180, '975 University Ave',  NOW(), NOW()),
 (8, 'Discovery Building',    43.07330, -89.40780, '330 N Orchard St',    NOW(), NOW()),
 (9, 'Computer Sciences',     43.07140, -89.40660, '1210 W Dayton St',    NOW(), NOW());

INSERT IGNORE INTO Location (location_id, name, description, category, building_id, created_at, updated_at) VALUES
 (1,  'Der Rathskeller',               'Big tables, loud, coffee nearby. Better for group work than reading.', 'Union',    1, NOW(), NOW()),
 (2,  'Memorial Union Terrace',         'Lakeside chairs. Great until the wind picks up.',                       'Outdoor',  1, NOW(), NOW()),
 (3,  'College Library, 2nd floor',     'Open late, lots of outlets, steady background noise.',                  'Library',  2, NOW(), NOW()),
 (4,  'College Library, 4th floor',     'Quiet floor with a view of the lake.',                                  'Library',  2, NOW(), NOW()),
 (5,  'Memorial Library reading room',  'Silent and old-school. Bring a sweater.',                               'Library',  3, NOW(), NOW()),
 (6,  'Union South lounge',             'Comfy chairs by the windows and food downstairs.',                      'Union',    4, NOW(), NOW()),
 (7,  'Steenbock reading room',         'Quiet, bright, and rarely full.',                                       'Library',  5, NOW(), NOW()),
 (8,  'Wendt Commons group rooms',      'Bookable rooms with whiteboards and screens.',                         'Library',  6, NOW(), NOW()),
 (9,  'Grainger Hall commons',          'Busy atrium with tables and a café.',                                  'Commons',  7, NOW(), NOW()),
 (10, 'Discovery Building atrium',      'Open, bright and calm in the afternoon.',                               'Commons',  8, NOW(), NOW());

INSERT IGNORE INTO Task (task_id, name, description) VALUES
 (1, 'Study',      'Quiet enough to focus'),
 (2, 'Group work', 'Space and tables for a team'),
 (3, 'Nap',        'Somewhere comfortable to rest'),
 (4, 'Socialize',  'Good for meeting friends'),
 (5, 'Eat',        'Food or coffee nearby');

INSERT IGNORE INTO Location_Task (location_task_id, location_id, task_id) VALUES
 (1, 1, 2),
 (2, 1, 4),
 (3, 1, 5),
 (4, 2, 4),
 (5, 2, 5),
 (6, 3, 1),
 (7, 3, 2),
 (8, 4, 1),
 (9, 5, 1),
 (10, 6, 3),
 (11, 6, 4),
 (12, 6, 5),
 (13, 7, 1),
 (14, 7, 3),
 (15, 8, 2),
 (16, 9, 1),
 (17, 9, 5),
 (18, 10, 1),
 (19, 10, 4);

INSERT IGNORE INTO Review (review_id, user_id, location_id, rating, title, comment, created_at, updated_at) VALUES
 (1, 1, 3, 4, 'My default spot',        'Outlets everywhere and it stays open late. Gets loud around 8.', NOW(), NOW()),
 (2, 2, 3, 5, 'Finals week MVP',        'Got through all of finals here.', NOW(), NOW()),
 (3, 3, 4, 5, 'Best view on campus',    'Quiet and you can see Lake Mendota.', NOW(), NOW()),
 (4, 1, 5, 5, 'Truly silent',           'Nobody talks. Great for reading.', NOW(), NOW()),
 (5, 2, 1, 3, 'Fun, not focused',       'Good for group projects, too loud to study alone.', NOW(), NOW()),
 (6, 3, 2, 5, 'Summer only',            'Unbeatable in September. Not in February.', NOW(), NOW()),
 (7, 1, 6, 4, 'Nap-approved',           'The window chairs are perfect for a quick nap.', NOW(), NOW()),
 (8, 2, 7, 4, 'Hidden gem',             'Never full, even in finals week.', NOW(), NOW()),
 (9, 3, 8, 4, 'Book ahead',             'Whiteboards are great; rooms go fast.', NOW(), NOW()),
 (10, 1, 9, 3, 'Busy',                   'Fine for an hour between classes.', NOW(), NOW()),
 (11, 2, 10, 4, 'Calm afternoons',       'Lots of light and rarely crowded after 2.', NOW(), NOW());
