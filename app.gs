function init() {

    var BASE = "https://interfondos.com.pe/valores-cuota-diarios.php";

    Logger.clear();

    //Poner el ID del spreadhseet!!
    var documentId = "XXXXXXXXXXXXXXXXXXXXXXXXXX";

    //Llamamos al URL
    var data = getPage(BASE);

    //Scrappeamos
    var updateData = scrap(data);

    //Añadimos la fecha
    updateData.unshift(getDate());

    //Escribimos
    updateSheet(documentId, updateData);

    //Correo de confirmación?
    //sendMe("subject","body")
}