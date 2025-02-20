-- Drop existing tables and functions
DROP TRIGGER IF EXISTS "on_user_update" ON "user";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "donors";
DROP FUNCTION IF EXISTS set_updated_at_to_now();

-- Create updated_at function
CREATE OR REPLACE FUNCTION set_updated_at_to_now()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create tables
CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL,
  "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "donors" (
  "donor_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(150) UNIQUE NOT NULL,
  "phone" VARCHAR(20),
  "address" VARCHAR(1000) NOT NULL,
  "amount" NUMERIC(10, 2) NOT NULL,
  "Donation_date" DATE DEFAULT CURRENT_DATE,
  "Paid" BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create trigger
CREATE TRIGGER on_user_update
  BEFORE UPDATE ON "user"
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at_to_now();

-- Insert sample data
INSERT INTO "donors" (name, email, phone, address, amount, "Paid", "Donation_date") VALUES 
('Abdirahman Mohamed', 'Abdimo122@gmail.com', '320-400-3445', '1552 Treo Ave S', 100.00, TRUE, CURRENT_DATE),
('Ali Ali', 'Abdiis@gmail.com', '320-888-9998', '4522 fskd Ave N', 50.00, FALSE, CURRENT_DATE);

-- Sample user data (commented out)
/*
INSERT INTO "user" ("username", "password") VALUES
('unicorn10', '$2a$10$oGi81qjXmTh/slGzYOr2fu6NGuCwB4kngsiWQPToNrZf5X8hxkeNG'), --pw: 123
('cactusfox', '$2a$10$8./c/6fB2BkzdIrAUMWOxOlR75kgmbx/JMrMA5gA70c9IAobVZquW'); --pw: 123
*/
