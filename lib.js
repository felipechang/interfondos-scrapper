/**
 * Scrap page
 * @param {string|string[]} data
 * @returns {Array}
 */
function scrap(data) {
    var updateData = [];
    data = data.split("valorescuota")[1];
    data = data.replace(">", "");
    data = data.split("<tr class=\"nd\">")[0];
    data = data.split("</tr>");
    data.splice(0, 1);
    data.map(function (value) {

        value = value.replace(/\?/g, "");
        value = value.split("php\">");
        if (value.length === 1) {
            value = value[0].split("\"#DADADA\">");
        }
        if (value[0].trim()) {
            value = value[1].split("</td>");
            //var title = value[0].replace("</a>", "").trim();
            var curr = value[2].split("bgcolor=\"#F6F6F6\">")[1];
            updateData.push(curr);
        }
    });
    return updateData;
}

/**
 * Update Google spreadsheet
 * @param {string} documentId
 * @param {Array} updateData
 */
function updateSheet(documentId, updateData) {
    var document = SpreadsheetApp.openById(documentId);
    var sheet = document.getActiveSheet();
    sheet.appendRow(updateData);
}

/**
 * Get current date
 * @returns {string}
 */
function getDate() {
    var today = new Date();

    //They publish yesterdays data
    var dd = today.getDate() - 1;
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}

/**
 * Get page data
 * @param {string} url
 * @returns {string}
 */
function getPage(url) {
    const r = UrlFetchApp.fetch(url);
    const c = r.getResponseCode();
    if (c === 200) {
        return r.getContentText();
    } else {
        return "";
    }
}

/**
 * Send email to current user
 * @param {string} subject
 * @param {string} body
 */
function sendMe(subject, body) {
    var address = Session.getActiveUser().getEmail();
    MailApp.sendEmail(address, subject, body);
}