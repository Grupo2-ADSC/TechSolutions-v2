DROP DATABASE IF EXISTS TechSolutions;

CREATE DATABASE IF NOT EXISTS TechSolutions;

USE TechSolutions;

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(16) NOT NULL,
nome VARCHAR(50) NOT NULL,
telefone CHAR(14) NOT NULL,
email VARCHAR(100) NOT NULL,
senha VARCHAR(16) NOT NULL
);

CREATE TABLE armazem (
idArmazem INT PRIMARY KEY AUTO_INCREMENT,
numeroArmazem INT NOT NULL,
areaArmazem DECIMAL(12,2) NOT NULL,
qtdSetores INT NOT NULL,
cep CHAR(9) NOT NULL,
estado CHAR(2) NOT NULL,
fkEmpresa INT NOT NULL, 
FOREIGN KEY (fkEmpresa) 
REFERENCES empresa (idEmpresa)
);

/*A empresa precisa ter pelo menos um armazem cadastrado no banco para logar*/
insert into armazem values 
(null, 12, 7000, 2, '04836-375','SP', 1);

CREATE TABLE setor (
idSetor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
fkArmazem INT NOT NULL, 
CONSTRAINT fkArmazem FOREIGN KEY (fkArmazem) 
REFERENCES armazem (idArmazem) ON DELETE CASCADE
);

insert into setor values
	(null, 'Setor A', 1),
    (null, 'Setor B', 1);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(45) NOT NULL,
fkSetor INT NOT NULL, 
CONSTRAINT fkSetor FOREIGN KEY (fkSetor) 
REFERENCES setor (idSetor) ON DELETE CASCADE
);

insert into sensor values
	(null, 'DHT11', 1),
    (null, 'DHT11', 2);

CREATE TABLE registro (
idRegistro INT AUTO_INCREMENT,
dado DOUBLE NOT NULL,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
fkSensor INT NOT NULL, 
CONSTRAINT fkSensor FOREIGN KEY (fkSensor) 
	REFERENCES sensor (idSensor) ON DELETE CASCADE,
PRIMARY KEY (idRegistro, fkSensor)
);

insert into registro (idRegistro, dado, fkSensor) values
	(null, 66.00, 1),
    (null, 60.10, 2);

SHOW TABLES;

SELECT * FROM empresa;
SELECT * FROM armazem;
SELECT * FROM setor;
SELECT * FROM sensor;
SELECT * FROM registro;


SELECT * FROM empresa
JOIN armazem ON empresa.idEmpresa = armazem.fkEmpresa;

SELECT empresa.nome AS 'Empresa', armazem.* FROM empresa
JOIN armazem ON empresa.idEmpresa = armazem.fkEmpresa;

SELECT * FROM setor
JOIN sensor ON setor.idSetor = sensor.fkSetor;

SELECT armazem.idArmazem AS 'Armazem', sensor.idSensor, sensor.modelo_sensor FROM armazem
JOIN sensor ON armazem.idArmazem = sensor.fkArmazem;

SELECT * FROM sensor
JOIN registro ON sensor.idSensor = registro.fkSensor;

SELECT sensor.idSensor AS 'Sensor', registro.dataHora AS 'Data e Hora', registro.dado AS 'Umidade' FROM sensor
JOIN registro ON sensor.idSensor = registro.fkSensor;