/* Líneas de comando para crear la base de datos
** y el administrador.
** Parametros recibidos:
** :DBNAME = Nombre de la base de datos
** :PROJECTUSER = Nombre del usuario asignado a esta BD
** :PASSWORDDB = Contraseña del usuario
*/

CREATE DATABASE :BDNAME;
CREATE USER :PROJECTUSER WITH PASSWORD :PASSWORDDB;
ALTER ROLE :PROJECTUSER SET client_encoding TO 'utf8';
ALTER ROLE :PROJECTUSER SET default_transaction_isolation TO 'read committed';
ALTER ROLE :PROJECTUSER SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE :BDNAME TO :PROJECTUSER;
