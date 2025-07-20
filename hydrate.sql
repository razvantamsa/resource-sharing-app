-- Create 10 users
INSERT INTO "User" (id, username) VALUES
  (1, 'alice'),
  (2, 'bob'),
  (3, 'carol'),
  (4, 'dave'),
  (5, 'eve'),
  (6, 'frank'),
  (7, 'grace'),
  (8, 'heidi'),
  (9, 'ivan'),
  (10, 'judy');

-- Create 4 groups
INSERT INTO "Group" (id, name) VALUES
  (1, 'devs'),
  (2, 'designers'),
  (3, 'qa'),
  (4, 'admins');

-- Create user-group memberships
INSERT INTO "UserGroup" (userId, groupId) VALUES
  (1, 1),  -- alice in devs
  (2, 1),  -- bob in devs
  (3, 2),  -- carol in designers
  (4, 3),  -- dave in qa
  (5, 4),  -- eve in admins
  (6, 1),  -- frank in devs
  (7, 4),  -- grace in admins
  (8, 3),  -- heidi in qa
  (9, 2),  -- ivan in designers
  (10, 4); -- judy in admins

-- Create 6 resources
INSERT INTO "Resource" (id, name, "sharedWithEveryone") VALUES
  (1, 'Project Plan', FALSE),
  (2, 'Design Specs', FALSE),
  (3, 'Test Results', FALSE),
  (4, 'Admin Dashboard', FALSE),
  (5, 'Public Notice', TRUE),  -- Shared globally
  (6, 'Internal Docs', FALSE);

-- Direct shares (resource shared directly with users)
INSERT INTO "ResourceUserShare" (resourceId, userId) VALUES
  (1, 1),  -- alice can access Project Plan directly
  (2, 3),  -- carol can access Design Specs directly
  (4, 5);  -- eve can access Admin Dashboard directly

-- Group-based shares
INSERT INTO "ResourceGroupShare" (resourceId, groupId) VALUES
  (1, 1),  -- Project Plan shared with devs
  (2, 2),  -- Design Specs shared with designers
  (3, 3),  -- Test Results shared with qa
  (4, 4),  -- Admin Dashboard shared with admins
  (6, 1),  -- Internal Docs shared with devs
  (6, 4);  -- Internal Docs shared with admins