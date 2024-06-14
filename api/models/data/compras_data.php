<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/compras_handler.php');
/*
*	Clase para manejar el encapsulamiento de los datos de la tabla CLIENTE.
*/
class ComprasData extends ComprasHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;
    private $filename = null;
    /*
    *   Métodos para validar y establecer los datos.
    */

    
    public function setIdOrden($value) //id del pedido
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcompra = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la compra es incorrecto';
            return false;
        }
    }

    public function setIdDetalle($value) //detalle del pedido
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->iddetalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle es incorrecto';
            return false;
        }
    }

    public function setPrecioProducto($value)
    {
        if (Validator::validateString($value)) {
            $this->precioproducto = $value;
            return true;
        } else {
            $this->data_error = 'el precio del producto es incorrecto';
            return false;
        }
    }

    public function setNombreCliente($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombrecliente = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setEstado($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El estado debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estadocompra = $value;
            return true;
        } else {
            $this->data_error = 'El estado debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setDireccion($value)
    {
        if (Validator::validateString($value)) {
            $this->direccion = $value;
            return true;
        } else {
            $this->data_error = 'La dirección está incorrecta';
            return false;
        }
    }

    public function setProducto($value)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El producto es incorrecto';
            return false;
        
        } else {
            $this->producto = $value;
            return true;
        }
    }

    public function setCantidad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad registrada en la compra es incorrecto';
            return false;
        }
    }

    public function setFecha($value)
    {
        if (Validator::validateString($value)) {
            $this->fecha = $value;
            return true;
        } else {
            $this->data_error = 'La fecha es incorrecta';
            return false;
        }
    }

    //Para mostrar la imagen del producto del detalle
    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 800, 800)) {
            $this->imagenproducto = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagenproducto = $filename;
            return true;
        } else {
            $this->imagenproducto = 'default.png';
            return true;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_producto'];
            return true;
        } else {
            $this->data_error = 'Producto inexistente';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
