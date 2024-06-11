<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/diasentreno_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class DiasPagoData extends DiasPagoHandler
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
            $this->data_error = 'El identificador del día de pago es incorrecto';
            return false;
        }
    }

    public function setNumeroDias($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->numerodias = $value;
            return true;
        } else {
            $this->data_error = 'Formato de número de días incorrecto';
            return false;
        }
    }

    public function setPago($value)
    {
        if (Validator::validateMoney($value)) {
            $this->pagodia = $value;
            return true;
        } else {
            $this->data_error = 'Formato de pago incorrecto';
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

}