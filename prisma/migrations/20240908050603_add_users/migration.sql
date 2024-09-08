-- Insert user classifications
/*INSERT INTO user_classifications (id, type)
VALUES
    (1, 'ADMIN'),
    (2, 'VIEW'),
    (3, 'PATIENT'),
    (4, 'DOCTOR');*/

-- Insert users into the users table, password value "pwd"
/*INSERT INTO public.users (id, email, "name", lastname, "password", "classificationId")
VALUES
    (nextval('users_id_seq'::regclass), 'admin1@example.com', 'John', 'Smith', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 1),
    (nextval('users_id_seq'::regclass), 'admin2@example.com', 'Bob', 'Johnson', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 1),

    (nextval('users_id_seq'::regclass), 'viewuser1@example.com', 'Charlie', 'Williams', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 2),
    (nextval('users_id_seq'::regclass), 'viewuser2@example.com', 'Diana', 'Jones', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 2),

    (nextval('users_id_seq'::regclass), 'patient1@example.com', 'Ethan', 'Brown', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient2@example.com', 'Fiona', 'Davis', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient3@example.com', 'George', 'Miller', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient4@example.com', 'Hannah', 'Wilson', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient5@example.com', 'Isaac', 'Moore', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient6@example.com', 'Jack', 'Taylor', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient7@example.com', 'Katherine', 'Anderson', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient8@example.com', 'Liam', 'Thomas', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient9@example.com', 'Mia', 'Jackson', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),
    (nextval('users_id_seq'::regclass), 'patient10@example.com', 'Noah', 'White', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 3),

    (nextval('users_id_seq'::regclass), 'doctor1@example.com', 'Olivia', 'Harris', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 4),
    (nextval('users_id_seq'::regclass), 'doctor2@example.com', 'Paul', 'Martin', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 4),
    (nextval('users_id_seq'::regclass), 'doctor3@example.com', 'Quinn', 'Thompson', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 4),
    (nextval('users_id_seq'::regclass), 'doctor4@example.com', 'Rachel', 'Garcia', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 4),
    (nextval('users_id_seq'::regclass), 'doctor5@example.com', 'Samuel', 'Martinez', '$2a$10$QeKUTZh3tnY0LmZnenkuWOzLQTapenQ.HeXKeNDTPKyBRZdd0lE5O', 4);*/