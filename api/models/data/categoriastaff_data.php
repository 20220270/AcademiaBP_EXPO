<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/categoriastaff_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaStaffData extends CategoriaStaffHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setIdStaffCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idstaffcategoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del dato es incorrecto';
            return false;
        }
    }

    public function setIdStaff($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idstaff = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del staff es incorrecto';
            return false;
        }
    }
    public function setidCategorias($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcategorialumnohorario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto';
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
