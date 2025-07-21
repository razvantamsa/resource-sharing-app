-- Create 4 users
INSERT INTO "User" (id, username) VALUES
  (1, 'alice'),
  (2, 'bob'),
  (3, 'carol'),
  (4, 'dave');

-- Create 2 groups
INSERT INTO "Group" (id, name) VALUES
  (1, 'devs'),
  (2, 'admins');

-- User-group memberships (overlapping, multi-group)
INSERT INTO "UserGroup" ("userId", "groupId") VALUES
  (1, 1),  -- alice in devs
  (1, 2),  -- alice in admins
  (2, 1),  -- bob in devs
  (3, 2),  -- carol in admins
  (4, 1),  -- dave in devs
  (4, 2);  -- dave in admins

-- Create 3 resources
INSERT INTO "Resource" (id, name, "sharedWithEveryone") VALUES
  (1, 'Project Plan', FALSE),
  (2, 'Admin Dashboard', FALSE),
  (3, 'Public Notice', TRUE);  -- Shared globally

-- Direct shares (overlap with group shares)
INSERT INTO "ResourceUserShare" ("resourceId", "userId") VALUES
  (1, 2),  -- bob can access Project Plan 
  (2, 2),  -- bob can access Admin Dashboard directly
  (2, 3);  -- carol can access Admin Dashboard directly

-- Group-based shares (resources shared with multiple groups)
INSERT INTO "ResourceGroupShare" ("resourceId", "groupId") VALUES
  (1, 1),  -- Project Plan shared with devs
  (1, 2),  -- Project Plan shared with admins
  (2, 2),  -- Admin Dashboard shared with admins
  (3, 2);  -- Public Notice shared with admins (redundant, for complexity)
