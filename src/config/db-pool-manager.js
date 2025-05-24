const { Pool } = require('pg');

const pools = new Map();


module.exports = {
  get: (name, pool) => {
    if (!pools.has(name)) {
      pools.set(name, pool);
    }
    return pools.get(name);
  },
};


