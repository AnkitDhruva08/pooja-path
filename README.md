# pooja-path





CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) CHECK (role IN ('user', 'pandit')) DEFAULT 'user',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




INSERT INTO public.users (username, email, password, role)
VALUES
('rahul', 'rahul@example.com', 'pass@123', 'user'),
('neha', 'neha@example.com', 'pass@123', 'user'),
('pandit_amit', 'amit@example.com', 'pass@123', 'pandit'),
('pandit_suresh', 'suresh@example.com', 'pass@123', 'pandit');



CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pandit_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  service VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(255),
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);





INSERT INTO bookings (user_id, pandit_id, service, date, location, status) VALUES
(9, 2, 'Griha Pravesh', '2025-06-15', 'Delhi', 'confirmed'),
(10, 11, 'Satyanarayan Katha', '2025-07-01', 'Lucknow', 'confirmed'),
(9, 12, 'Wedding Puja', '2025-06-20', 'Noida', 'pending');