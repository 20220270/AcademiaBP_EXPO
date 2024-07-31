<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/categoriasalumnos_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class CategoriasAlunmosData extends CategoriasAlumnosHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

    

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

    public function setEdadMinima($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->edadminima = $value;
            return true;
        } else {
            $this->data_error = 'La edad mínima es incorrecta';
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

    public function setIdCategoriasHorarios($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcategoriahorario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la asiganción horario-categoría es incorrecto';
            return false;
        }
    }

    public function CategoriasHorarios($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcategoriaa = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoría a asignar es incorrecto';
            return false;
        }
    }
    public function Horarios($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idhorario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del horario a asignar es incorrecto';
            return false;
        }
    }

    

    public function setImagenCategoria($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 4500, 4000)) {
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


    public function setFilename()
    {
        if ($data = $this->readFilename()) {
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
