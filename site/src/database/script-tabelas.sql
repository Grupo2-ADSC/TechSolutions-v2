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
INSERT INTO empresa (`idEmpresa`, `cnpj`, `nome`, `telefone`, `email`, `senha`) VALUES ('1', '1234567891011132', 'Teste', '11949591340', 'just@gmail.com', 'Justo123#');
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
	(null, 66, 1),
    (null, 60, 2),
    (null, 62, 2),
    (null, 60, 2),
    (null, 65, 1),
    (null, 63, 2),
    (null, 66, 2),
    (null, 60, 2);

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

SELECT armazem.idArmazem AS 'Armazem', sensor.idSensor, sensor.modelo FROM armazem
JOIN sensor ON armazem.idArmazem = sensor.fkSetor;

SELECT * FROM sensor
JOIN registro ON sensor.idSensor = registro.fkSensor;

SELECT sensor.idSensor AS 'Sensor', registro.dataHora AS 'Data e Hora', registro.dado AS 'Umidade' FROM sensor
JOIN registro ON sensor.idSensor = registro.fkSensor;

SELECT DATE_FORMAT(dataHora, '%H:%i') AS 'Hora',
       AVG(dado) AS 'Umidade Média'
FROM registro
WHERE fkSensor = 1  -- Substitua pelo ID do sensor desejado
GROUP BY HOUR(dataHora), MINUTE(dataHora), DATE_FORMAT(dataHora, '%H:%i')
ORDER BY HOUR(dataHora), MINUTE(dataHora)
LIMIT 0, 5000;

SELECT DATE_FORMAT(r.dataHora, '%H:%i') AS 'Hora',
       r.dado AS 'Umidade',
       s.idSensor AS 'ID do Sensor'
FROM registro r
JOIN sensor s ON r.fkSensor = s.idSensor
JOIN setor se ON s.fkSetor = se.idSetor
JOIN armazem a ON se.fkArmazem = a.idArmazem
WHERE a.idArmazem = 1  -- Substitua pelo ID do armazém desejado
ORDER BY r.dataHora
LIMIT 0, 5000;

SELECT 
    s.idSensor AS 'ID do Sensor',
    r.dado AS 'Umidade',
    DATE_FORMAT(r.dataHora, '%H:%i') AS 'Hora do Registro'
FROM 
    registro r
JOIN 
    sensor s ON r.fkSensor = s.idSensor
JOIN 
    setor se ON s.fkSetor = se.idSetor
JOIN 
    armazem a ON se.fkArmazem = a.idArmazem
WHERE 
    a.idArmazem = 1;
    
			  SELECT 
				s.idSensor AS  idSensor,
				r.dado AS 'Umidade',
				DATE_FORMAT(r.dataHora, '%H:%i') AS 'Hora do Registro' FROM registro r
			JOIN sensor s ON r.fkSensor = s.idSensor
			JOIN setor se ON s.fkSetor = se.idSetor
			JOIN armazem a ON se.fkArmazem = a.idArmazem
			WHERE a.idArmazem = 1;
									
SELECT s.idSensor AS idSensor,
r.dado AS umidade FROM registro r
JOIN sensor s ON r.fkSensor = s.idSensor
JOIN setor se ON s.fkSetor = se.idSetor
JOIN armazem a ON se.fkArmazem = a.idArmazem
WHERE a.idArmazem = 1;
WITH RankedRegistro AS (
    SELECT
        s.idSensor AS 'ID do Sensor',
        r.dado AS 'Umidade',
        DATE_FORMAT(r.dataHora, '%H:%i') AS 'Hora do Registro',
        ROW_NUMBER() OVER (PARTITION BY s.idSensor ORDER BY r.dataHora DESC) AS RowNum
    FROM
    ;
    
SELECT * FROM sensor s
            JOIN setor se ON s.fkSetor = se.idSetor
            JOIN armazem a ON se.fkArmazem = a.idArmazem
        WHERE a.idArmazem = 1;
        sensor s
    JOIN
        registro r ON s.idSensor = r.fkSensor
    JOIN
        setor se ON s.fkSetor = se.idSetor
    JOIN
        armazem a ON se.fkArmazem = a.idArmazem
    WHERE
        a.idArmazem = 1
)
SELECT
    'ID do Sensor' AS 'ID do Sensor',
    MAX(CASE WHEN RowNum = 1 THEN Umidade END) AS 'Última Umidade',
    MAX(CASE WHEN RowNum = 1 THEN 'Hora do Registro' END) AS 'Hora do Último Registro'
FROM
    RankedRegistro
GROUP BY
    'ID do Sensor';
insert into registro (idRegistro, dado, fkSensor) values
	(null, 12, 2);


SELECT
    s.*,
    r.idRegistro,
    r.dado AS 'umidade',
    DATE_FORMAT(r.dataHora, '%Y-%m-%d %H:%i:%s') AS 'hora'
FROM
    sensor s
JOIN
    (
        SELECT
            fkSensor,
            MAX(dataHora) AS ultimaDataHora
        FROM
            registro
        GROUP BY
            fkSensor
    ) max_data
ON
    s.idSensor = max_data.fkSensor
JOIN
    registro r
ON
    s.idSensor = r.fkSensor
    AND max_data.ultimaDataHora = r.dataHora
JOIN
    setor se
ON
    s.fkSetor = se.idSetor
JOIN
    armazem a
ON
    se.fkArmazem = a.idArmazem
WHERE
    a.idArmazem = 1;  -- Substitua pelo ID do armazém desejado
