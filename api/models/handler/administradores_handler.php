<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */



class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $dui = null;
    protected $telefono = null;
    protected $correo = null;
    protected $alias = null;
    protected $clave = null;
    protected $estado = null;
    protected $nivel = null;
    protected $imagen = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_administrador, alias_administrador, clave_administrador
                FROM tb_administradores
                WHERE  alias_administrador = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_administrador'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['aliasAdministrador'] = $data['alias_administrador'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_administrador
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_administrador'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores
                SET clave_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, foto_administrador, nivel, fecha_registro, estado_adminstrador
                FROM tb_administradores
                INNER JOIN tb_niveles_administradores USING(id_nivel)
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_admistrador = ?, apellido_administrador = ?, dui_administrador = ?, correo_administrador = ?, telefono_administrador = ?, alias_administrador = ?, foto_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->alias, $this->imagen, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro
                FROM tb_administradores
                INNER JOIN tb_niveles_administradores USING(id_nivel)
                WHERE nombre_admistrador LIKE ? OR alias_administrador LIKE ? OR correo_administrador LIKE ? OR dui_administrador LIKE ? OR nivel LIKE ? OR estado_adminstrador LIKE ?
                ORDER BY id_administrador';
        $params = array($value, $value, $value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_administradores(nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, estado_adminstrador, id_nivel, foto_administrador)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->alias, $this->clave, $this->estado, $this->nivel, $this->imagen);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
                ORDER BY id_administrador';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET estado_adminstrador = ?, id_nivel = ?
                WHERE id_administrador = ?';
        $params = array($this->estado, $this->nivel, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readAdminsNiveles()
    {
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, correo_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
                WHERE id_administrador = ? AND estado_administrador = "Activo"
                ORDER BY nombre_admistrador';
        $params = array($this->nivel);
        return Database::getRows($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto_administrador
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Método para la recuperación de contraseña
    public function checkEmailExists($email)
{
    $sql = 'SELECT COUNT(*) AS count FROM tb_administradores WHERE correo_administrador = ?';
    $params = array($email);
    $data = Database::getRow($sql, $params);
    return $data['count'] > 0;
}
}
