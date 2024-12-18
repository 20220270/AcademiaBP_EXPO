<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/alumnos_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class AlumnosData extends AlumnosHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del alumno es incorrecto';
            return false;
        }
    }

    public function setNombre($value, $min = 1, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setApellido($value, $min = 1, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El apellido debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->apellido = $value;
            return true;
        } else {
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setNacimiento($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechanacimiento = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de nacimiento es incorrecta';
            return false;
        }
    }

    public function setPosicion($value, $min = 1, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'La posición debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->posicion = $value;
            return true;
        } else {
            $this->data_error = 'La posición debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setIdStaffCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idstaffcategoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del staff y categoría es incorrecto';
            return false;
        }
    }

    public function setIdDiasPago($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->ididaspago = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del día y pago es incorrecto';
            return false;
        }
    }

    public function setEstado($value, $min = 1, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El estado debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El estado debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente/encargado es incorrecto';
            return false;
        }
    }

    public function setFoto($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 2000, 2000)) {
            $this->foto = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->foto = $filename;
            return true;
        } else {
            $this->foto = 'default.png';
            return true;
        }
    }

    public function setFechaInscripcion($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechainscripcion = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de inscripcion es incorrecta';
            return false;
        }
    }

    public function setIdAlumnosCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idalumnoscategoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del alumno-categoria es incorrecto';
            return false;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['foto_alumno'];
            return true;
        } else {
            $this->data_error = 'Alumno inexistente';
            return false;
        }
    }

    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }
    public function getFilename()
    {
        return $this->filename;
    }
}