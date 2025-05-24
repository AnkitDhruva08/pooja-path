const pg_db_pool = require('../config/db-config');
const dbPoolManager = require('../config/db-pool-manager');

const pgDbPool = dbPoolManager.get("pgDbPool", pg_db_pool);

module.exports.user_registration_model = async (userRegistrationData) => {
  console.log('User Registration Data in Model ===>>>', userRegistrationData);

  const { username, email, password, role } = userRegistrationData;

  // 1. Email Check
  const checkEmail = {
    text: `SELECT id FROM users WHERE email = $1 AND active = true;`,
    values: [email],
  };

  const existingUser = await pgDbPool.query(checkEmail);

  if (existingUser.rowCount > 0) {
    return {
      status: 400,
      message: 'User already registered with this email.',
    };
  }

  // 2. Insert New User
  const sql = {
    text: `
      INSERT INTO users (username, email, password, role, active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id;
    `,
    values: [username, email, password, role],
  };

  try {
    const data = await pgDbPool.query(sql);
    console.log('Registered User ID:', data.rows[0].id);
    return {
      status: 200,
      message: 'User Registered Successfully',
      id: data.rows[0].id,
    };
  } catch (error) {
    console.error('Registration Error:', error);
    return {
      status: 500,
      message: 'Failed to Register User',
      error: error.message,
    };
  }
};





