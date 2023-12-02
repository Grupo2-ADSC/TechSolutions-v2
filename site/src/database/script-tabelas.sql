DROP DATABASE IF EXISTS TechSolutions;

CREATE DATABASE IF NOT EXISTS TechSolutions;

USE TechSolutions;

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
senha VARCHAR(16) NOT NULL,
email VARCHAR(100) NOT NULL,
cnpj CHAR(16) NOT NULL,
nome VARCHAR(50) NOT NULL,
telefone CHAR(14) DEFAULT 'Sem telefone'
);

CREATE TABLE armazem (
idArmazem INT PRIMARY KEY AUTO_INCREMENT,
numeroArmazem INT,
areaArmazem DECIMAL(5,3),
qtdSetores INT,
cep CHAR(8),
logradouro VARCHAR(45),
numero INT,
bairro VARCHAR(45),
cidade VARCHAR(45),
estado CHAR(2),
fkEmpresa INT, 
FOREIGN KEY (fkEmpresa) 
REFERENCES empresa (idEmpresa)
);

CREATE TABLE setor (
idSetor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
fkArmazem INT, 
CONSTRAINT fkArmazem FOREIGN KEY (fkArmazem) 
REFERENCES armazem (idArmazem)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(45),
fkSetor INT, 
CONSTRAINT fkSetor FOREIGN KEY (fkSetor) 
REFERENCES setor (idSetor)
);

CREATE TABLE registro (
idRegistro INT AUTO_INCREMENT,
dado DOUBLE,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkSensor INT, 
CONSTRAINT fkSensor FOREIGN KEY (fkSensor) 
	REFERENCES sensor (idSensor),
PRIMARY KEY (idRegistro, fkSensor)
);

SHOW TABLES;

SELECT * FROM empresa;
SELECT * FROM funcionario;
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