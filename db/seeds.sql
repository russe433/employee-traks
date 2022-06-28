INSERT INTO department (id)
    VALUES
    ('Information Technology'),
    ('Marketing'),
    ('Customer Service'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
    VALUES
    ('Manager', 70000, 1),
    ('Salesperson', 50000, 4),
    ('Help Desk Tech', 50000, 1),
    ('Customer Service Rep', 35000, 3),
    ('Marketer', 40000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('Michael', 'Meyers', 1, ,),
    ('Trevor', 'Belmont', 1, ,),
    ('Lora', 'Miles', 3, 1),
    ('Bobo', 'Baggins', 4, 1),
    ('Alucard', 'Tepes', 2, 2),
    ('Odysseus', 'Nobody', 5, 2);