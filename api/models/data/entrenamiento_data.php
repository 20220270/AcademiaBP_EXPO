<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/entrenamiento_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class EntrenamientoData extends EntrenamientoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */

     //Establecer los datos de los hararios
    public function setIdHorario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idhorario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del horario es incorrecto';
            return false;
        }
    }

    public function setDia($value, $min = 2, $max = 50)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'Formato incorrecto para el día';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->diaentreno = $value;
            return true;
        } else {
            $this->data_error = 'El día debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    public function setHoraInicio($value, $min = 2, $max = 60)
    {
        // Eliminar la validación de validateString
        if (Validator::validateLength($value, $min, $max)) {
            $this->horainicio = $value;
            return true;
        } else {
            $this->data_error = 'El horario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    
    public function setHoraFinalizacion($value, $min = 2, $max = 60)
    {
        // Eliminar la validación de validateString
        if (Validator::validateLength($value, $min, $max)) {
            $this->horafinalizacion = $value;
            return true;
        } else {
            $this->data_error = 'El horario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    

     //Establecer los datos de los lugares
     public function setIdLugar($value)
     {
         if (Validator::validateNaturalNumber($value)) {
             $this->idlugar = $value;
             return true;
         } else {
             $this->data_error = 'El identificador del lugar es incorrecto';
             return false;
         }
     }

     public function setNombreLugar($value, $min = 2, $max = 100)
{
    if (Validator::validateLength($value, $min, $max)) {
        $this->nombrelugar = $value;
        return true;
    } else {
        $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
        return false;
    }
}


    public function setDireccionLugar($value, $min = 2, $max = 100)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->direccionlugar = $value;
            return true;
        } else {
            $this->data_error = 'La dirección debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    
    public function setURLlugar($value, $min = 2, $max = 100)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->urllugar = $value;
            return true;
        } else {
            $this->data_error = 'La URL debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
    

    public function setImagenLugar($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 800, 800)) {
            $this->imagenlugar = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagenlugar = $filename;
            return true;
        } else {
            $this->imagenlugar = 'default.png';
            return true;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_lugar'];
            return true;
        } else {
            $this->data_error = 'Lugar inexistente';
            return false;
        }
    }

    //Establecer los datos de los lugares y horarios
    public function setIdLugarHorario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idlugarhorario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador principal entre lugares y entrenamientos es incorrecto';
            return false;
        }
    }

    public function setIdLugarr($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idlugarr = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del lugar a asignar es incorrecto';
            return false;
        }
    }
    public function setIdHorarioo($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idhorarioo = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del horario a asignar es incorrecto';
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
