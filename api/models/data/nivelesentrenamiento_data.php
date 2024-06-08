<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/nivelesentrenamiento_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class NivelesEntrenamientoData extends NivelesEntrenamientoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

     //Metodos para los niveles de competencia
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del nivel es incorrecto';
            return false;
        }
    }

    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateString($value)) {
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

    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1200, 1200)) {
            $this->imagen = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }

    public function setDescripcion($value, $min = 2, $max = 250)
    {
        if (!$value) {
            return true;
        } elseif (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_nivel'];
            return true;
        } else {
            $this->data_error = 'Este nivel no está registrado';
            return false;
        }
    }

    //Metodos para las categorias

    public function setIdCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcategoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto';
            return false;
        }
    }

    public function setNombreCategoria($value, $min = 2, $max = 50)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombrecategoria = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setEdadMaxima($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->edadmaxima = $value;
            return true;
        } else {
            $this->data_error = 'La edad máxima es incorrecta';
            return false;
        }
    }

    public function setNivel($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idnivel = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del nivel asignado es incorrecto';
            return false;
        }
    }

    public function setIdHorarios($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idhorariolugar = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del horario a asignar es incorrecto';
            return false;
        }
    }

    

    public function setImagenCategoria($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1200, 1200)) {
            $this->imagencategoria = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagencategoria = $filename;
            return true;
        } else {
            $this->imagencategoria = 'default.png';
            return true;
        }
    }


    public function setFilename2()
    {
        if ($data = $this->readFilenameCat()) {
            $this->filename = $data['imagen_categoria'];
            return true;
        } else {
            $this->data_error = 'Esta categoría no está registrado';
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
