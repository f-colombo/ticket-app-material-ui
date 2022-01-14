
-- db_ticket.tipo_usuario definition

CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- db_ticket.usuario definition

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`id_tipo`),
  KEY `id_tipo` (`id_tipo`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- db_ticket.ticket definition

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `descripcion` varchar(512) NOT NULL,
  `pedido` tinyint(1) NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`id_usuario`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO db_ticket.tipo_usuario
(nombre, activo, creado)
VALUES('Administrator', 1, CURRENT_TIMESTAMP);

INSERT INTO db_ticket.tipo_usuario
(nombre, activo, creado)
VALUES('User', 1, CURRENT_TIMESTAMP);

INSERT INTO db_ticket.usuario
(id_tipo, nombre, email, pass, activo, creado)
VALUES(1, 'Usr Admin', 'admin@ticketapp.com', 'adminP$1', 1, CURRENT_TIMESTAMP);

INSERT INTO db_ticket.usuario
(id_tipo, nombre, email, pass, activo, creado)
VALUES(2, 'Usr User', 'user@ticketapp.com', 'userP$1', 1, CURRENT_TIMESTAMP);
