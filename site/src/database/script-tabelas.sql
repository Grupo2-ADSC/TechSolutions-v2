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

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(100),
fkArmazem INT, 
CONSTRAINT fkArmazem FOREIGN KEY (fkArmazem) 
REFERENCES armazem (idArmazem)
)AUTO_INCREMENT = 40; 

CREATE TABLE registro (
idRegistro INT AUTO_INCREMENT,
umidade DOUBLE,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkSensor INT, 
CONSTRAINT fkSensor FOREIGN KEY (fkSensor) 
	REFERENCES sensor(idSensor),
PRIMARY KEY (idRegistro, fkSensor)
)AUTO_INCREMENT = 30;

SHOW TABLES;

SELECT * FROM empresa;
SELECT * FROM funcionario;
SELECT * FROM armazem;
SELECT * FROM setor;
SELECT * FROM sensor;
SELECT * FROM registro;

SELECT * FROM empresa
JOIN endereco ON empresa.fkendereco = endereco.idEndereco;

SELECT * FROM empresa
JOIN funcionario ON empresa.idEmpresa = funcionario.fkEmpresa;

SELECT empresa.nome AS 'Empresa', funcionario.nome, funcionario.sobrenome, funcionario.cargo FROM empresa
JOIN funcionario ON empresa.idEmpresa = funcionario.fkEmpresa;

SELECT * FROM empresa
JOIN armazem ON empresa.idEmpresa = armazem.fkEmpresa;

SELECT empresa.nome AS 'Empresa', armazem.* FROM empresa
JOIN armazem ON empresa.idEmpresa = armazem.fkEmpresa;

SELECT * FROM armazem
JOIN sensor ON armazem.idArmazem = sensor.fkArmazem;

SELECT armazem.idArmazem AS 'Armazem', sensor.idSensor, sensor.modelo_sensor FROM armazem
JOIN sensor ON armazem.idArmazem = sensor.fkArmazem;

SELECT * FROM sensor
JOIN registro ON sensor.idSensor = registro.fkSensor;

SELECT sensor.idSensor AS 'Sensor', registro.dataRegistro AS 'Data e Hora', registro.umidadeRegistro AS 'Umidade' FROM sensor
JOIN registro ON sensor.idSensor = registro.fkSensor;