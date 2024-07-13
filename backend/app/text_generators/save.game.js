const fs = require('fs');

// Function to get the current date and time in 'YYYYMMDD_HHmmss' format
function getFormattedDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// Function to save JSON to a file with a timestamped filename
async function saveJsonToFile(jsonObject, baseFileName) {
    const dateTime = getFormattedDateTime();
    // const fileName = `${baseFileName}_${dateTime}.json`;
    const fileName = `./../savegames/${baseFileName}.json`;
    const jsonString = JSON.stringify(jsonObject, null, 2);

    await fs.promises.writeFile(fileName, jsonString);
}


module.exports = {
    saveJsonToFile
};