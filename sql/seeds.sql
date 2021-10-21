-- add departments
INSERT INTO department
  (name)
VALUES
  ("Engineering"),
  ("Finance"),
  ("Legal");

-- roles
INSERT INTO role
(title, salary, department_id)

VALUES
('Salesperson', 80000, 1),
('Sales Lead', 100000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Laywer', 190000, 4);

-- employees

INSERT INTO employee (first_name, last_name, role_id, mgmt_id)

VALUES
('John', 'Doe', 1, 'Ashley Rodriguez'),
('Mike', 'Chan', 2, 'John Doe'),
('Ashley', 'Rodriquez', 3, null),
('Kevin', 'Tupik', 4, 'Ashley Rodriguez'),
('Malia', 'Brown', 5, null),
('Keanu', 'Reeves', 6, null),
('Tom','Allen', 7, 'Keanu Reeves');