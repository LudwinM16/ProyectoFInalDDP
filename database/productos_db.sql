-- Base de datos para Gestión de Tienda final (password_hash)
CREATE DATABASE IF NOT EXISTS productos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE productos_db;

-- Tabla usuarios con rol
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin','empleado') DEFAULT 'empleado'
);

-- Tabla productos (con cantidad)
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  cantidad INT NOT NULL DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo (no incluye usuario admin - usar php_init_admin.php)
INSERT INTO productos (nombre, precio, cantidad) VALUES
('Laptop Lenovo', 799.99, 5),
('Mouse inalámbrico', 19.90, 50),
('Teclado mecánico', 59.99, 20);
