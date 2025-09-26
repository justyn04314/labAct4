const db = require('../config/db');

// === INNER JOIN example (Part 3A) ===
exports.usersWithRoles = (req, res) => {
  const sql = `
    SELECT u.id, u.email, r.role_name
    FROM users u
    INNER JOIN user_roles ur ON ur.user_id = u.id
    INNER JOIN roles r ON r.id = ur.role_id
    ORDER BY u.id, r.role_name;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === LEFT JOIN (Part 3B) ===
exports.usersWithProfiles = (req, res) => {
  const sql = `
    SELECT u.id, u.email, p.phone, p.city, p.country
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    ORDER BY u.id;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === RIGHT JOIN (Part 3C) ===
exports.rolesRightJoin = (req, res) => {
  const sql = `
    SELECT r.role_name, ur.user_id AS user_id, u.email
    FROM user_roles ur
    RIGHT JOIN roles r ON r.id = ur.role_id
    LEFT JOIN users u ON u.id = ur.user_id
    ORDER BY r.role_name, user_id;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === FULL OUTER (Part 3D) ===
exports.profilesFullOuter = (req, res) => {
  const sql = `
    SELECT u.id AS user_id, u.email, p.id AS profile_id
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id

    UNION

    SELECT u2.id AS user_id, u2.email, p2.id AS profile_id
    FROM users u2
    RIGHT JOIN profiles p2 ON p2.user_id = u2.id

    ORDER BY user_id;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === CROSS JOIN (Part 3E) ===
exports.userRoleCombos = (req, res) => {
  const sql = `
    SELECT u.id AS user_id, u.email, r.role_name
    FROM users u
    CROSS JOIN roles r
    ORDER BY u.id, r.role_name;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === SELF JOIN (Part 3F) ===
exports.referrals = (req, res) => {
  const sql = `
    SELECT ref.referrer_user_id,
           u1.email AS referrer_email,
           ref.referred_user_id,
           u2.email AS referred_email,
           ref.referred_at
    FROM referrals ref
    INNER JOIN users u1 ON u1.id = ref.referrer_user_id
    INNER JOIN users u2 ON u2.id = ref.referred_user_id
    ORDER BY ref.referred_at DESC;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};

// === Latest login per user (Part 3G) ===
exports.latestLogin = (req, res) => {
  const sql = `
    SELECT u.id, u.email, la2.ip_address, la2.occurred_at
    FROM users u
    LEFT JOIN (
      SELECT la.user_id, la.ip_address, la.occurred_at
      FROM login_audit la
      JOIN (
        SELECT user_id, MAX(occurred_at) AS max_time
        FROM login_audit
        GROUP BY user_id
      ) mx ON la.user_id = mx.user_id AND la.occurred_at = mx.max_time
    ) la2 ON la2.user_id = u.id
    ORDER BY u.id;
  `;
  db.query(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(rows);
  });
};