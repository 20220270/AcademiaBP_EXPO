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

    protected $tiempo = null;
    protected $dias = null;
    protected $bloqueo = null;
    protected $condicion = null;
    protected $fecha_hoy = null;

    protected $accountLockedUntil = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
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
             $_SESSION['idNivel'] = $data['id_nivel'];
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

    public function countUsers()
    {
        $sql = 'SELECT COUNT(*) as total FROM tb_administradores';
        $data = Database::getRow($sql);
        return $data['total'];
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
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, foto_administrador, id_nivel, nivel, fecha_registro, estado_adminstrador,
                ultima_sesion
                FROM tb_administradores
                INNER JOIN tb_niveles_administradores USING(id_nivel)
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET foto_administrador = ?, nombre_admistrador = ?, apellido_administrador = ?, dui_administrador = ?, correo_administrador = ?, telefono_administrador = ?, alias_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->imagen, $this->nombre, $this->apellido, $this->dui, $this->correo, $this->telefono, $this->alias, $_SESSION['idAdministrador']);
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


    public function checkCorreo()
    {
        $sql = 'SELECT correo_administrador, nombre_admistrador
                FROM tb_administradores
                WHERE correo_administrador = ?;';
        $params = array($this->correo);
        return Database::getRow($sql, $params);
    }

    public function updateClave()
    {
        $sql = 'UPDATE tb_administradores
                SET clave_administrador = ?
                WHERE correo_administrador = ?';
        $params = array($this->clave, $this->correo);
        return Database::executeRow($sql, $params);
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
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador,
        ultima_sesion
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
                ORDER BY id_administrador';
        return Database::getRows($sql);
    }

    public function readAll2()
    {
        $sql = "SELECT DISTINCT id_administrador, CONCAT(nombre_admistrador, ' ', apellido_administrador) as Nombre, correo_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
                ORDER BY id_administrador";
        return Database::getRows($sql);
    }

    //Administradores activos
    public function readAllActivos()
    {
        $sql = "SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador,
        ultima_sesion
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
        WHERE estado_adminstrador = 'Activo'
                ORDER BY id_administrador";
        return Database::getRows($sql);
    }

    //Administradores activos
    public function readAllInactivos()
    {
        $sql = "SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador,
        ultima_sesion
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
        WHERE estado_adminstrador = 'Inactivo'
                ORDER BY id_administrador";
        return Database::getRows($sql);
    }

    //Administradores activos
    public function readAllAdminsRecientes()
    {
        $sql = "SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador,
        ultima_sesion
        FROM tb_administradores
        INNER JOIN tb_niveles_administradores USING(id_nivel)
                ORDER BY fecha_registro DESC";
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, id_nivel, estado_adminstrador, fecha_registro, foto_administrador
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

    // Verificar si el usuario existe.
    public function checkUserExists($usuario)
    {
        $sql = 'SELECT COUNT(*) AS count FROM tb_administradores WHERE alias_administrador = ?';
        $params = array($usuario);
        $data = Database::getRow($sql, $params);
        return $data['count'] > 0;
    }

    // Obtener los intentos fallidos.
    public function getFailedAttempts($usuario)
    {
        $sql = 'SELECT intentos_administrador FROM tb_administradores WHERE alias_administrador = ?';
        $params = array($usuario);
        $data = Database::getRow($sql, $params);
        return $data['intentos_administrador'];
    }

    // Obtener el tiempo de bloqueo.
    public function getLockTime($usuario)
    {
        $sql = 'SELECT bloqueado_hasta FROM tb_administradores WHERE alias_administrador = ?';
        $params = array($usuario);
        $data = Database::getRow($sql, $params);
        return $data['bloqueado_hasta'];
    }

    // Incrementar los intentos fallidos.
    public function incrementFailedAttempts($usuario)
    {
        $sql = 'UPDATE tb_administradores SET intentos_administrador = intentos_administrador + 1 WHERE alias_administrador = ?';
        $params = array($usuario);
        return Database::executeRow($sql, $params);
    }

    // Reiniciar los intentos fallidos.
    public function resetFailedAttempts($usuario)
    {
        $sql = 'UPDATE tb_administradores SET intentos_administrador = 0 WHERE alias_administrador = ?';
        $params = array($usuario);
        return Database::executeRow($sql, $params);
    }

    // Bloquear la cuenta hasta una fecha/hora específica.
    public function lockAccount($usuario, $bloqueadoHasta)
    {
        $sql = 'UPDATE tb_administradores SET bloqueado_hasta = ? WHERE alias_administrador = ?';
        $params = array($bloqueadoHasta, $usuario);
        return Database::executeRow($sql, $params);
    }


    public function resetTimeAttempt($timer)
    {
        $sql = 'UPDATE tb_administradores SET tiempo_intento = ? WHERE alias_administrador = ?';
        $params = array($timer, $this->alias);
        return Database::executeRow($sql, $params);
    }


    public function resetAttempts()
    {
        $sql = 'UPDATE tb_administradores SET intentos_administrador = 0 WHERE alias_administrador = ?';
        $params = array($this->alias);
        return Database::executeRow($sql, $params);
    }

    public function changeStateBlock()
    {
        $sql = 'UPDATE tb_administradores SET estado_administrador = 1, fecha_bloqueo = NULL WHERE alias_administrador = ?';
        $params = array($this->alias);
        return Database::executeRow($sql, $params);
    }

    public function getIdAdministrador($correo)
    {
        $sql = 'SELECT id_administrador FROM tb_administradores WHERE correo_administrador = ? AND alias_administrador = "Administrador"';
        $params = array($correo);

        // Ejecuta la consulta y retorna el resultado
        return Database::getRow($sql, $params)['id_administrador'] ?? null; // Devuelve null si no se encuentra el usuario
    }

    public function getFechaCreacionClave($aliasUsuario)
    {
        $sql = 'SELECT ultima_cambio_clave FROM tb_administradores WHERE alias_administrador = ?';
        $params = array($aliasUsuario);
        // Ejecuta la consulta y devuelve la fecha de creación de la clave
        if ($data = Database::getRow($sql, $params)) {
            return $data['ultima_cambio_clave'];
        } else {
            return null; // Si no se encuentra el usuario, retorna null
        }
    }

    
    public function blockAccount()
    {
        $sql = 'UPDATE tb_administradores
            SET cuenta_bloqueada_hasta = ?, intento_fallidos = 3
            WHERE correo_administrador = ?;';
        $params = array($this->accountLockedUntil, $this->correo); // Parámetros para la consulta SQL
        return Database::executeRow($sql, $params); // Ejecución de la consulta SQL
    }

    public function getUserData()
    {
        $sql = 'SELECT *
                FROM tb_administradores
                WHERE alias_administrador = ?';
        $params = array($this->alias);
        return Database::getRow($sql, $params);
    }

    public function updateLastLogin()
    {
    $sql = 'UPDATE tb_administradores
            SET ultima_sesion = NOW()
            WHERE id_administrador = ?';
    $params = array($_SESSION['idAdministrador']);
    return Database::executeRow($sql, $params);
    }

    public function updateLastLogin2()
    {
    $sql = 'UPDATE tb_administradores
            SET ultima_sesion = NOW()
            WHERE alias_administrador = ?';
        $params = array($this->alias);
        return Database::getRow($sql, $params);
    }


}
