INSERT INTO department (name)
VALUES ("Customer Service"),
        ("Accounting"),
        ("Human Resources");

INSERT INTO role (role_id, title, department_id, salary)
VALUES (101, "Customer Service Manager", 1, 18),
        (102, "Accountant", 2 ,25),
        (103, "HR Manager", 3 ,30),
        (104, "Customer Service Rep", 1, 15),
        (105, "Accounts Receivable", 2, 17),
        (106, "HR Assistant", 3, 16);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aang", "Air", 103, 103),
        ("Katara", "Water", 101, 101),
        ("Sokka", "Water", 102, 102),
        ("Zuko", "Fire", 106, 103),
        ("Toph", "Beifong", 104, 101),
        ("MoMo", "Air", 105, 102);