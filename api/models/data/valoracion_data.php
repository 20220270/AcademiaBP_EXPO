<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/valoracion_handler.php');
/*
*	Clase para manejar el encapsulamiento de los datos de la tabla CLIENTE.
*/
class ValoracionData extends ValoracionHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;

    /*
    *   Métodos para validar y establecer los datos.
    */
    public function setIdValoracion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idvaloracion = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la valoración es incorrecto';
            return false;
        }
    }

    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->iddetalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle de la orden es incorrecto';
            return false;
        }
    }

    public function setIdProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idproducto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto de la orden es incorrecto';
            return false;
        }
    }

    public function setNombreProducto($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreproducto = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCalificacion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->calificacion = $value;
            return true;
        } else {
            $this->data_error = 'La calificación tiene un formato incorrecto';
            return false;
        }
    }

    public function setComentario($value, $min = 2, $max = 250)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'Comentario con formato incorrecto';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->comentario = $value;
            return true;
        } else {
            $this->data_error = 'El comentario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }


    public function setEstadoComentario($value)
    {
        if (Validator::validateString($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'Estado incorrecto';
            return false;
        }
    } 

    public function setFecha($value)
    {
        if (Validator::validateDate($value)) {
            $this->fecha = $value;
            return true;
        } else {
            $this->data_error = 'Fecha incorrecta';
            return false;
        }
    } /*Esto se debe cambiar ya que el estado es un enum */


    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}