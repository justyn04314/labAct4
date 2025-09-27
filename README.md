Project Overview

This project is a simple Authentication and Reporting API built with Express.js, MySQL, JWT, and bcrypt.

- Lab 3 focused on authentication: user signup, login, logout, and profile access using JWT with revocable tokens.

- Lab 4 extends the project with SQL JOIN reports, showing user relationships, roles, profiles, logins, and referrals.

Set up and How to run:
1. Install the necessary software like ( Node.js Gitbash postman, vs code, Xampp) 
2. Open Xampp and start APache and mySQL 
3. Go to phpMyadmin (http://localhost/phpmyadmin). 
4. Create a user account and a data called “lab_auth”
5. Paste these code in the sql to create a two tables
6. Open the VS code and do the these structure 
 - CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100) NOT NULL UNIQUE,
   password_hash VARCHAR(255) NOT NULL, full_name VARCHAR(120), role VARCHAR(30) DEFAULT 'student',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
   
- CREATE TABLE IF NOT EXISTS revoked_tokens ( id INT AUTO_INCREMENT PRIMARY KEY, jti VARCHAR(64) NOT NULL UNIQUE,
 expires_at DATETIME NOT NULL, revoked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

7. For lab act 4, add the additonal tables
-    CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  phone VARCHAR(30),
  city VARCHAR(80),
  country VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

- CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(40) UNIQUE NOT NULL
);

- CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

- CREATE TABLE login_audit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ip_address VARCHAR(45),
  success TINYINT(1) DEFAULT 1,
  occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

 - CREATE TABLE referrals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  referrer_user_id INT NOT NULL,
  referred_user_id INT NOT NULL,
  referred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (referrer_user_id) REFERENCES users(id),
  FOREIGN KEY (referred_user_id) REFERENCES users(id)
);


8. Insert sample seed data (adjust user IDs as needed to match your users table).
9. In your project folder, update .env file with your database credentials
10. Run the project in terminal Npm run dev
11. Test in browser http://localhost:3000/api/health
12. If it shows “ok” or “connected” the setip is successful


API ENDPOINTS 
LAB 3

- POST {{baseUrl}}/auth/signup - register a new user 
- POST {{baseUrl}}/auth/login - Login and get token
- GET {{baseUrl}}/profile - Get user profile (requires token) 
- POST {{baseUrl}}/auth/logout - Logout and revoke current token this is my previous read me and now update it

LAB 4

- GET {{baseUrl}}/reports/users-with-roles → Users who have at least one role (INNER JOIN)

- GET {{baseUrl}}/reports/users-with-profiles → All users and their profiles if they exist (LEFT JOIN)

- GET {{baseUrl}}/reports/roles-right-join → All roles and the users who have them (RIGHT JOIN)

- GET {{baseUrl}}/reports/profiles-full-outer → All users and profiles, combined into one set (FULL OUTER via UNION)

- GET {{baseUrl}}/reports/user-role-combos → Every user × every role (CROSS JOIN)

- GET {{baseUrl}}/reports/referrals → Show who referred whom (SELF JOIN)

- GET {{baseUrl}}/reports/latest-login → Latest login record per user (subquery + LEFT JOIN)

   
