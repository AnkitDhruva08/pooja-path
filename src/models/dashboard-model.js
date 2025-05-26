
const pg_db_pool = require('../config/db-config');
const dbPoolManager = require('../config/db-pool-manager');

const pgDbPool = dbPoolManager.get('pgDbPool', pg_db_pool);

module.exports.getDashboardBookings = async (user) => {
  try {
    let sql;

    if (user.role === 'user') {
        sql = {
          text: `
            SELECT 
              b.id AS booking_id,
              b.service,
              b.date,
              b.location,
              b.status,
              u.username AS pandit_name
            FROM bookings b
            LEFT JOIN users u ON b.pandit_id = u.id
            WHERE b.user_id = $1
            ORDER BY b.date DESC;
          `,
          values: [user.id],
        };
      } else if (user.role === 'pandit') {
        sql = {
          text: `
            SELECT 
              b.id AS booking_id,
              b.service,
              b.date,
              b.location,
              b.status,
              u.username AS yajman_name
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            WHERE b.pandit_id = $1
            ORDER BY b.date DESC;
          `,
          values: [user.id],
        };
      } else {
      return {
        status: 400,
        message: 'Invalid user role',
        data: [],
      };
    }

    const result = await pgDbPool.query(sql);

    return {
      status: 200,
      message: 'Dashboard bookings fetched',
      data: result.rows,
    };
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    return {
      status: 500,
      message: 'Internal Server Error',
      error: err.message,
    };
  }
};



module.exports.insertBooking = async (userId, pandit_id, serviceName, date, location) => {
    try {
      console.log('Inserting booking with data:', {
        userId,
        pandit_id,
        service: serviceName,
        date,
        location,
      });
  
      const sql = {
        text: `
          INSERT INTO bookings (user_id, pandit_id, service, date, location, status, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, NOW())
          RETURNING id;
        `,
        values: [userId, pandit_id, serviceName, date, location, 'pending'],
      };
  
      const result = await pgDbPool.query(sql);
  
      return {
        status: 200,
        message: 'Booking created successfully',
        data: {
          bookingId: result.rows[0].id,
        },
      };
    } catch (err) {
      console.error('Error inserting booking:', err);
  
      return {
        status: 500,
        message: 'Failed to create booking',
        error: err.message,
      };
    }
  };
  
  
  
module.exports.updateBookingStatus = async (bookingId, status) => {
  const sql = {
    text: `
      UPDATE bookings
      SET status = $1
      WHERE id = $2;
    `,
    values: [status, bookingId],
  };

  try {
    await pgDbPool.query(sql);
    return {
      status: 200,
      message: 'Booking status updated successfully',
    };
  } catch (err) {
    console.error('Error updating booking status:', err);
    return {
      status: 500,
      message: 'Failed to update booking status',
      error: err.message,
    };
  }
}




module.exports.getAllPandits = async () => {
    try {
      const sql = {
        text: `SELECT id, username FROM users WHERE role = 'pandit' ORDER BY username ASC;`,
      };
  
      const result = await pgDbPool.query(sql);
      console.log('Fetched pandits:', result.rows);
  
      return {
        status: 200,
        data: result.rows,
      };
    } catch (err) {
      console.error('Error fetching pandits:', err);
      return {
        status: 500,
        message: 'Failed to fetch pandits',
        error: err.message,
      };
    }
  };