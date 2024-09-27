# AcademiaBP_EXPO
La Academia BP se destaca por brindar una experiencia emocionante y accesible para jóvenes amantes del fútbol. Al unirse, los estudiantes pueden seleccionar planes mensuales, otorgándoles acceso exclusivo a entrenamientos dinámicos. Además de la experiencia de suscripción, la academia ofrece la oportunidad de adquirir artículos deportivos como mochilas, ropa deportiva, botellas de agua, etc. Artículos funcionales para el día a día de los deportistas.

# Integrantes:
* Iván Daniel Salguero Esperanza (20220270)
* Ricardo Daniel De Leon Cruz (20220039)
* Rebeca Marcela Hernández Amaya (20200248)
* Dennis Alejandro Gonzales Carrillo (20220440)
* Anderson Renè Figueroa Coto (20220105)

# Estándares de programación utilizados en
#JavaScipt:
* SCREAMING_SNAKE_CASE: Se utilizan en las constantes.
* K&R Style (Kernighan and Ritchie): Se utiliza en la ubicación de los contenidos de if y else.
* CamelCase: Se utilizan principalmente en los ID de los componentes, parametros y las funciones.

#PHP:
* SnakeCase: Se utiliza para identificar los nombres de los campos de la base
* PascalCase: Se utilizan en el nombre de las clases
* CamelCase: Se utilizan principalmente en las funciones.
* lowercase: Se utilizan principalmente en los atributos.

# OWASP Top 10 - 2021:

Cryptographic Failures

son vulnerabilidades relacionadas con la implementación y el uso inadecuado de algoritmos y prácticas criptográficas en aplicaciones.
Estas fallas pueden comprometer la confidencialidad, integridad y autenticidad de la información y en nuestro proyecto hemos aplicado un metodo de cifrado para no guardar las contraseñas como texto plano.

Insecure Design

en el contexto del OWASP  la falta de HTTPS es considerado como insecure design debido a que la aplicacon web dejara de proteger los datos que estan en transito y 
esto la puede volver vulnerable a ataques y pueden pasar consecuencias como que se expongan datos sensibles de los usuarios.

https://www.academiabp.website/AcademiaBP_EXPO/views/admin/menu.html

Identification and Authentication Failure

Esta vulnerabilidad se refiere al problema en la gestión de identidades y en el proceso de autenticación, lo que puede facilitar un ataque.

No limitar el número de intentos de inicio de sesión permite a un atacante probar múltiples combinaciones de usuario y contraseña, aumentando las posibilidades de acceder a cuentas de usuario, 
por eso en nuestro proyecto hemos implementado que el usuario tenga tres intentos para poder ingresar en los inicios de sesion, si se equivoca su cuenta sera bloqueada por 24 horas.





