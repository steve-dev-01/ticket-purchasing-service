-- -------------------------------------------------------------
-- TablePlus 6.1.2(568)
--
-- https://tableplus.com/
--
-- Database: ticket_db
-- Generation Time: 2567-07-22 12:04:35.9590 PM
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."_prisma_migrations";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Event";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Event" (
    "id" text NOT NULL,
    "name" text NOT NULL,
    "date" timestamp(3) NOT NULL,
    "venue" text NOT NULL,
    "creatorId" text NOT NULL,
    "created_date" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" timestamp(3) NOT NULL,
    "time" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Ticket";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Ticket" (
    "id" text NOT NULL,
    "userId" text NOT NULL,
    "eventId" text NOT NULL,
    "created_date" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" timestamp(3) NOT NULL,
    "ticketCategoryId" text NOT NULL,
    "quantity" int4 NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."TicketCategory";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."TicketCategory" (
    "id" text NOT NULL,
    "name" text NOT NULL,
    "price" float8 NOT NULL,
    "eventId" text NOT NULL,
    "created_date" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" timestamp(3) NOT NULL,
    "availableTickets" int4 NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."User";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."User" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "name" text NOT NULL,
    "password" text NOT NULL,
    "created_date" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('8ef2d61d-b438-4e59-9c94-5391c46cca57', '8d829596af00848e3571d35076c1be1cb4bd9d3cdbccdedc833fe28dbcc1d2d7', '2024-07-20 18:34:25.3274+07', '20240720113425_init', NULL, NULL, '2024-07-20 18:34:25.260847+07', 1);

INSERT INTO "public"."Event" ("id", "name", "date", "venue", "creatorId", "created_date", "updated_date", "time") VALUES
('01ca2c8e-53c7-4c21-bd8c-c3e4570ed19b', 'Concert 1', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:47:07.576', '2024-07-21 08:07:51.871', '19:00'),
('03b2d732-95f5-4b86-9c33-394d60209487', 'Concert 2', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:43:27.376', '2024-07-21 08:07:51.871', '1:00'),
('03c406ce-03fb-405b-aa49-e24660dd0806', 'Concert 3', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:39:38.608', '2024-07-21 08:07:51.871', '3:00'),
('0928d6d9-1f89-46cb-8061-fb757e66279e', 'Concert 23', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 17:36:47.882', '2024-07-21 17:36:47.882', '1:00'),
('09fffec4-0cf0-4148-b30f-1190ae9ad13a', 'Concert 4', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:36:54.522', '2024-07-21 08:07:51.871', '10:00'),
('105b8ce5-963f-4bb7-8102-dda27b36547b', 'Concert 5', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:30:49.558', '2024-07-21 08:07:51.871', '11:00'),
('1583738f-53e0-4cb3-acab-e8994e826065', 'Concert 6', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 07:08:39.793', '2024-07-21 08:07:51.871', '12:00'),
('1af912bc-22bb-4976-9416-6402d1a9743e', 'Concert 23', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 17:32:35.131', '2024-07-21 17:32:35.131', '1:00'),
('3051e45c-74da-4aef-b6cd-dc7c6ca8718c', 'Concert 7', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 07:13:26.098', '2024-07-21 08:07:51.871', '13:00'),
('30fd090d-431b-4e08-a6c0-e4294909f438', 'Concert 8', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:38:56.022', '2024-07-21 08:07:51.871', '19:00'),
('4ce7c218-33da-4678-8ea6-820648996df6', 'Concert 9 ', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:45:44.301', '2024-07-21 08:07:51.871', '19:00'),
('57b00e17-79d8-4e12-968a-06c9a7a8f5f1', 'Concert 10', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:41:48.335', '2024-07-21 08:07:51.871', '19:00'),
('86d92d03-fe39-4d9f-bb32-75850c15f93b', 'Concert 11', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:45:02.08', '2024-07-21 08:07:51.871', '19:00'),
('974f9c6a-69b6-4999-8a67-09f188ab966b', 'Concert 23', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 17:34:28.139', '2024-07-21 17:34:28.139', '1:00'),
('987ba511-7e88-420a-975c-d4ace32bf41b', 'Concert 12', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:48:08.03', '2024-07-21 08:07:51.871', '19:00'),
('a6ab9f97-41cf-4f3a-a4c4-f3c26f2bee3f', 'Concert 13', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:29:49.045', '2024-07-21 08:07:51.871', '19:00'),
('ad5b116d-0099-4940-b0a1-0ef930c4c567', 'Concert 23', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 17:35:35.466', '2024-07-21 17:35:35.466', '1:00'),
('cbb37702-9fde-4081-aa49-b3bb4d86b411', 'Concert 14', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:40:51.096', '2024-07-21 08:07:51.871', '19:00'),
('f9904bd3-89a5-48d4-a957-2d6c2299503c', 'Concert 15', '2024-09-20 19:00:00', 'Stadium', 'e019603d-1000-4978-9a06-085a179cd63f', '2024-07-21 04:36:28.626', '2024-07-21 08:07:51.871', '19:00');

INSERT INTO "public"."Ticket" ("id", "userId", "eventId", "created_date", "updated_date", "ticketCategoryId", "quantity") VALUES
('2bb8223b-7de7-4817-839c-e3b95ae1204e', 'e019603d-1000-4978-9a06-085a179cd63f', '987ba511-7e88-420a-975c-d4ace32bf41b', '2024-07-21 09:24:31.301', '2024-07-21 09:24:31.301', '5296e8b2-0f81-45fa-94f1-6690f5068f8b', -1),
('bfbeab10-cd5b-450f-86ea-508624c77569', 'e019603d-1000-4978-9a06-085a179cd63f', '987ba511-7e88-420a-975c-d4ace32bf41b', '2024-07-21 09:21:56.312', '2024-07-21 09:21:56.312', '5296e8b2-0f81-45fa-94f1-6690f5068f8b', 2),
('cf070c57-76c2-49e7-bed2-95ed5302423a', 'e019603d-1000-4978-9a06-085a179cd63f', '987ba511-7e88-420a-975c-d4ace32bf41b', '2024-07-21 09:23:44.168', '2024-07-21 09:23:44.168', '5296e8b2-0f81-45fa-94f1-6690f5068f8b', 2),
('d57f4178-5285-4903-85f9-da18abc9fe11', 'e019603d-1000-4978-9a06-085a179cd63f', '987ba511-7e88-420a-975c-d4ace32bf41b', '2024-07-21 09:25:57.267', '2024-07-21 09:25:57.267', '5296e8b2-0f81-45fa-94f1-6690f5068f8b', 100);

INSERT INTO "public"."TicketCategory" ("id", "name", "price", "eventId", "created_date", "updated_date", "availableTickets") VALUES
('0cd3f881-ce0c-4f27-ab36-d469eac99b03', 'General Admission', 50, 'f9904bd3-89a5-48d4-a957-2d6c2299503c', '2024-07-21 04:36:28.65', '2024-07-21 04:36:28.65', 100),
('0d7d9768-90c1-46c0-b606-83dae9faa2ad', 'General Admission', 50, '01ca2c8e-53c7-4c21-bd8c-c3e4570ed19b', '2024-07-21 04:47:07.601', '2024-07-21 04:47:07.601', 100),
('1328dab0-abf6-49ef-b6fc-05a1d6b249e2', 'General Admission', 50, 'cbb37702-9fde-4081-aa49-b3bb4d86b411', '2024-07-21 04:40:51.117', '2024-07-21 04:40:51.117', 100),
('159507b1-71bc-44c4-a4ce-93d616627126', 'VIP', 100, 'f9904bd3-89a5-48d4-a957-2d6c2299503c', '2024-07-21 04:36:28.65', '2024-07-21 04:36:28.65', 50),
('15de0d3f-a564-4abe-8722-75b0bd2fd19e', 'VIP', 100, '3051e45c-74da-4aef-b6cd-dc7c6ca8718c', '2024-07-21 07:13:26.133', '2024-07-21 07:13:26.133', 50),
('2a658547-733f-49a9-bbff-fb29392e0f88', 'General Admission', 50, '1583738f-53e0-4cb3-acab-e8994e826065', '2024-07-21 07:08:39.818', '2024-07-21 07:08:39.818', 100),
('2ccf3378-f064-4d48-af78-ba6366141b6c', 'General Admission', 50, '57b00e17-79d8-4e12-968a-06c9a7a8f5f1', '2024-07-21 04:41:48.346', '2024-07-21 04:41:48.346', 100),
('30685127-7187-467f-a50b-2f06b14ae967', 'General Admission', 50, '30fd090d-431b-4e08-a6c0-e4294909f438', '2024-07-21 04:38:56.045', '2024-07-21 04:38:56.045', 100),
('32968407-0e08-4390-990d-5db23fb51b11', 'General Admission', 50, '4ce7c218-33da-4678-8ea6-820648996df6', '2024-07-21 04:45:44.31', '2024-07-21 04:45:44.31', 100),
('3b999fda-b1cf-464d-9f2f-38e53fb08727', 'General Admission', 50, 'ad5b116d-0099-4940-b0a1-0ef930c4c567', '2024-07-21 17:35:35.466', '2024-07-21 17:35:35.466', 100),
('45475e98-fcfc-4b95-af07-0dc99c25dc67', 'General Admission', 50, '0928d6d9-1f89-46cb-8061-fb757e66279e', '2024-07-21 17:36:47.882', '2024-07-21 17:36:47.882', 100),
('479f81b8-37d1-40ca-98f9-18e9f7e75c76', 'VIP One', 100, '974f9c6a-69b6-4999-8a67-09f188ab966b', '2024-07-21 17:34:28.139', '2024-07-21 17:34:28.139', 50),
('4c30165e-5657-4b0c-a1c2-113ea9dd134a', 'VIP', 100, '86d92d03-fe39-4d9f-bb32-75850c15f93b', '2024-07-21 04:45:02.09', '2024-07-21 04:45:02.09', 50),
('5296e8b2-0f81-45fa-94f1-6690f5068f8b', 'VIP', 100, '987ba511-7e88-420a-975c-d4ace32bf41b', '2024-07-21 06:25:32.769', '2024-07-21 09:42:16.407', 4),
('5afc6ba0-f649-43db-98fd-72c3bcec5567', 'VIP One', 100, 'ad5b116d-0099-4940-b0a1-0ef930c4c567', '2024-07-21 17:35:35.466', '2024-07-21 17:35:35.466', 50),
('5e03e755-465d-4f81-a6ca-17f201c3a312', 'General Admission', 50, '86d92d03-fe39-4d9f-bb32-75850c15f93b', '2024-07-21 04:45:02.09', '2024-07-21 04:45:02.09', 100),
('64888e6f-a7f3-4346-acd8-9e38645825d5', 'General Admission', 50, '3051e45c-74da-4aef-b6cd-dc7c6ca8718c', '2024-07-21 07:13:26.133', '2024-07-21 07:13:26.133', 100),
('6c53ddec-8a35-4594-b201-fe4085a0f5d4', 'General Admission', 50, '1af912bc-22bb-4976-9416-6402d1a9743e', '2024-07-21 17:32:35.131', '2024-07-21 17:32:35.131', 100),
('6d7d54cf-a575-481d-86f9-f20c8a5a8334', 'VIP', 100, '03c406ce-03fb-405b-aa49-e24660dd0806', '2024-07-21 04:39:38.628', '2024-07-21 04:39:38.628', 50),
('6d891c98-beb2-4fc0-9768-08ae2dd577f9', 'VIP', 100, '03b2d732-95f5-4b86-9c33-394d60209487', '2024-07-21 04:43:27.388', '2024-07-21 04:43:27.388', 50),
('6e41fdda-ba72-4c27-8d4b-c4d2d8a7ec07', 'VIP', 100, 'cbb37702-9fde-4081-aa49-b3bb4d86b411', '2024-07-21 04:40:51.117', '2024-07-21 04:40:51.117', 50),
('83393b50-6bcf-4ea0-944e-aa7e95dc28c4', 'General Admission', 50, '03c406ce-03fb-405b-aa49-e24660dd0806', '2024-07-21 04:39:38.628', '2024-07-21 04:39:38.628', 100),
('87975ca6-5e87-4a02-b825-56ae05168cb3', 'VIP', 100, '1583738f-53e0-4cb3-acab-e8994e826065', '2024-07-21 07:08:39.818', '2024-07-21 07:08:39.818', 50),
('8a8a99fa-34af-4c27-93f6-12628432895d', 'VIP', 100, '4ce7c218-33da-4678-8ea6-820648996df6', '2024-07-21 04:45:44.31', '2024-07-21 04:45:44.31', 50),
('91cd33fe-6d53-463d-979f-7b3971ca223a', 'VIP', 100, '57b00e17-79d8-4e12-968a-06c9a7a8f5f1', '2024-07-21 04:41:48.346', '2024-07-21 04:41:48.346', 50),
('944b4cc0-f353-4518-aac5-3667f50dff8d', 'General Admission', 50, '03b2d732-95f5-4b86-9c33-394d60209487', '2024-07-21 04:43:27.388', '2024-07-21 04:43:27.388', 100),
('a128c2d2-1e78-4a71-b0a8-5bf0c959d0fd', 'VIP One', 100, '1af912bc-22bb-4976-9416-6402d1a9743e', '2024-07-21 17:32:35.131', '2024-07-21 17:32:35.131', 50),
('ac54392c-1be6-4924-bb36-38ffddf1c74b', 'General Admission', 50, '09fffec4-0cf0-4148-b30f-1190ae9ad13a', '2024-07-21 04:36:54.532', '2024-07-21 04:36:54.532', 100),
('adf18bd5-eeaa-4c78-a31b-8b236b10aa92', 'VIP', 100, 'a6ab9f97-41cf-4f3a-a4c4-f3c26f2bee3f', '2024-07-21 04:29:49.087', '2024-07-21 04:29:49.087', 50),
('b70739d3-2f56-471a-9eea-49f91e6f799f', 'VIP', 100, '09fffec4-0cf0-4148-b30f-1190ae9ad13a', '2024-07-21 04:36:54.532', '2024-07-21 04:36:54.532', 50),
('c54fdb16-0bc7-49f6-a3e6-fd48f17c0fbb', 'General Admission', 50, '974f9c6a-69b6-4999-8a67-09f188ab966b', '2024-07-21 17:34:28.139', '2024-07-21 17:34:28.139', 100),
('dad69be2-ed47-49ff-8d8e-527dca01723e', 'VIP', 100, '105b8ce5-963f-4bb7-8102-dda27b36547b', '2024-07-21 04:30:49.608', '2024-07-21 04:30:49.608', 50),
('e3bd221e-3834-4317-9578-38c821cf4b74', 'General Admission', 50, '105b8ce5-963f-4bb7-8102-dda27b36547b', '2024-07-21 04:30:49.608', '2024-07-21 04:30:49.608', 100),
('ec12c89b-0d98-4d57-a09b-43090a3c903d', 'VIP', 100, '30fd090d-431b-4e08-a6c0-e4294909f438', '2024-07-21 04:38:56.045', '2024-07-21 04:38:56.045', 50),
('f153285d-d078-4383-82cb-773a0008c246', 'VIP One', 100.008, '0928d6d9-1f89-46cb-8061-fb757e66279e', '2024-07-21 17:36:47.882', '2024-07-21 17:36:47.882', 50),
('f1834753-d1ae-454d-b081-2936657a4709', 'General Admission', 50, 'a6ab9f97-41cf-4f3a-a4c4-f3c26f2bee3f', '2024-07-21 04:29:49.087', '2024-07-21 04:29:49.087', 100),
('f4426a8d-5fe8-454a-b1cf-8ba2c6efca46', 'VIP', 100, '01ca2c8e-53c7-4c21-bd8c-c3e4570ed19b', '2024-07-21 04:47:07.601', '2024-07-21 04:47:07.601', 50);

INSERT INTO "public"."User" ("id", "email", "name", "password", "created_date", "updated_date") VALUES
('3334c453-cead-459b-9cd1-0071d7f34ef1', 'testuser@example.com', 'Test User', '$2a$10$AsZwR6rFXthkorpH4jl8FOrL9/ksAPdObk0wrut3mjCs1X2eNR8ya', '2024-07-20 19:02:43.374', '2024-07-20 19:02:43.374'),
('4ff57e4c-8783-46d5-a21a-fcff9d0b3bd7', 'steve2@gmail.com', 'Steve', '$2a$10$fKA7uT3NleLccwouEFAbUefm13CNGpJytV/xW0LSVlvxhuo7dEFR.', '2024-07-20 20:00:39.478', '2024-07-20 20:00:39.478'),
('6fff5090-5b7d-4b99-b65f-5ca34051540b', 'steve@gmail.com', 'Steve', '$2a$10$pYlBzJtg7SBphWsZKbMK8.sB.2WS9JyW0J99OX4uh.cRSObp/u0A2', '2024-07-20 18:20:47.006', '2024-07-20 18:20:47.006'),
('a4e70b61-8f96-4b32-b029-d083abd6c777', 'steve11@gmail.com', 'Steve', '$2a$10$xDxPeotIleBseWRlXoqXWu3LUgR5GP48HdaGoD2cpqdWPnmGpT8UO', '2024-07-21 12:14:36.465', '2024-07-21 12:14:36.465'),
('bc99b842-b5ec-4871-a301-e8b483118c38', 'steve3@gmail.com', 'Steve', '$2a$10$kdooS8N9fP.EQhl.zZXKAeHsdTG5DunVza6DaBnXPEs1Vjp12Zuny', '2024-07-20 20:02:11.611', '2024-07-20 20:02:11.611'),
('e019603d-1000-4978-9a06-085a179cd63f', 'steve1@gmail.com', 'Steve', '$2a$10$u0gUj7cDSXyJ9JePBV1EtOTcWfWdmKsfswnubAQokM7txnJOVCLaG', '2024-07-20 18:49:13.858', '2024-07-20 18:49:13.858');

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Ticket" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Ticket" ADD FOREIGN KEY ("ticketCategoryId") REFERENCES "public"."TicketCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Ticket" ADD FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."TicketCategory" ADD FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
