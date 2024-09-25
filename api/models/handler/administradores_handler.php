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
    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    /*
     *  Métodos para gestionar la cuenta del administrador.
     */


     public function checkUser($username, $password)
     {
         $sql = 'SELECT id_administrador, alias_administrador, clave_administrador, ultima_cambio_clave, intentos_administrador, bloqueado_hasta
                 FROM tb_administradores
                 WHERE alias_administrador = ?';
         $params = array($username);
     
         if (!($data = Database::getRow($sql, $params))) {
             return false;
         }
     
         // Verificar si la cuenta está bloqueada
         if ($data['bloqueado_hasta'] && time() < strtotime($data['bloqueado_hasta'])) {
             return 'bloqueado';
         }
     
         // Verificar la contraseña
         if (password_verify($password, $data['clave_administrador'])) {
             
             // Verificar si la contraseña ha expirado
             $fechaCambio = strtotime($data['ultima_cambio_clave']);
             $fechaLimite = $fechaCambio + (90 * 24 * 60 * 60);
     
             if (time() > $fechaLimite) {
                 return 'expirada';
             }
     
             // Resetear intentos fallidos
             $sql = 'UPDATE tb_administradores SET intentos_administrador = 0, bloqueado_hasta = NULL WHERE id_administrador = ?';
             $params = array($data['id_administrador']);
             Database::executeRow($sql, $params);
     
             return true;
         } else {
             // Incrementar intentos fallidos si la contraseña es incorrecta
             $intentos_fallidos = $data['intentos_administrador'] + 1;
             $bloqueado_hasta = null;
     
             if ($intentos_fallidos >= 3) {
                 $bloqueado_hasta = date('Y-m-d H:i:s', strtotime('+24 hours'));
             }
     
             $sql = 'UPDATE tb_administradores SET intentos_administrador = ?, bloqueado_hasta = ? WHERE id_administrador = ?';
             $params = array($intentos_fallidos, $bloqueado_hasta, $data['id_administrador']);
             Database::executeRow($sql, $params);
     
             return $bloqueado_hasta ? 'bloqueado' : false;
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
        $sql = 'SELECT id_administrador, nombre_admistrador, apellido_administrador, dui_administrador, correo_administrador, telefono_administrador, alias_administrador, clave_administrador, nivel, estado_adminstrador, fecha_registro, foto_administrador
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
}
