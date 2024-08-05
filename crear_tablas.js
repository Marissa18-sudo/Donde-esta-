const sqlite3 = require('sqlite3').verbose();

// Abrir la base de datos
let db = new sqlite3.Database('./donde_esta.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Crear las tablas
db.serialize(() => {
    // Tabla Usuarios
    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        ID_Usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL,
        Correo TEXT NOT NULL UNIQUE,
        Contraseña TEXT NOT NULL,
        Telefono TEXT,
        Tipo_Usuario TEXT,
        Empresa TEXT,
        Fecha_Registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tabla Ubicaciones
    db.run(`CREATE TABLE IF NOT EXISTS Ubicaciones (
        ID_Ubicacion INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre_Ubicacion TEXT NOT NULL,
        Direccion TEXT,
        Latitud REAL,
        Longitud REAL,
        ID_Usuario INTEGER,
        Tipo_Ubicacion TEXT,
        FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
    )`);

    // Tabla Contenedores
    db.run(`CREATE TABLE IF NOT EXISTS Contenedores (
        ID_Contenedor INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre_Contenedor TEXT NOT NULL,
        Descripcion TEXT,
        ID_Usuario INTEGER,
        Fecha_Alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ID_Ubicacion INTEGER,
        Estado TEXT,
        FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario),
        FOREIGN KEY (ID_Ubicacion) REFERENCES Ubicaciones(ID_Ubicacion)
    )`);

    // Tabla Tipos_Contenedores
    db.run(`CREATE TABLE IF NOT EXISTS Tipos_Contenedores (
        ID_Tipo INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre_Tipo TEXT NOT NULL
    )`);

    // Tabla intermedia Contenedores_Tipos
    db.run(`CREATE TABLE IF NOT EXISTS Contenedores_Tipos (
        ID_Contenedor INTEGER,
        ID_Tipo INTEGER,
        PRIMARY KEY (ID_Contenedor, ID_Tipo),
        FOREIGN KEY (ID_Contenedor) REFERENCES Contenedores(ID_Contenedor),
        FOREIGN KEY (ID_Tipo) REFERENCES Tipos_Contenedores(ID_Tipo)
    )`);
});

// Cerrar la base de datos
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Cerrada la conexión a la base de datos.');
});
