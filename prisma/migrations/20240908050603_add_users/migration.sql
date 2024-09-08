-- Insert user classifications
INSERT INTO user_classifications (id, type)
VALUES
    (1, 'ADMIN'),
    (2, 'VIEW'),
    (3, 'PATIENT'),
    (4, 'DOCTOR');

-- Insert users into the users table
INSERT INTO users (email, name, lastname, classificationId)
VALUES
    -- Admins
    ('admin1@example.com', 'Alice', 'Smith', 1),
    ('admin2@example.com', 'Bob', 'Johnson', 1),

    -- View Users
    ('viewuser1@example.com', 'Charlie', 'Williams', 2),
    ('viewuser2@example.com', 'Diana', 'Jones', 2),

    -- Patients
    ('patient1@example.com', 'Ethan', 'Brown', 3),
    ('patient2@example.com', 'Fiona', 'Davis', 3),
    ('patient3@example.com', 'George', 'Miller', 3),
    ('patient4@example.com', 'Hannah', 'Wilson', 3),
    ('patient5@example.com', 'Isaac', 'Moore', 3),
    ('patient6@example.com', 'Jack', 'Taylor', 3),
    ('patient7@example.com', 'Katherine', 'Anderson', 3),
    ('patient8@example.com', 'Liam', 'Thomas', 3),
    ('patient9@example.com', 'Mia', 'Jackson', 3),
    ('patient10@example.com', 'Noah', 'White', 3),

    -- Doctors
    ('doctor1@example.com', 'Olivia', 'Harris', 4),
    ('doctor2@example.com', 'Paul', 'Martin', 4),
    ('doctor3@example.com', 'Quinn', 'Thompson', 4),
    ('doctor4@example.com', 'Rachel', 'Garcia', 4),
    ('doctor5@example.com', 'Samuel', 'Martinez', 4);