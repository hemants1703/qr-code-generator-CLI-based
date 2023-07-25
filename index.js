import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Enter a URL to convert it to a QR code: ",
            name: "url"
        }
    ])
    .then((answers) => {
        var qrImage = qr.image(answers.url, { type: 'png' });
        qrImage.pipe(fs.createWriteStream('QR_IMAGE.png'));

        fs.createWriteStream("QR_URL.txt").write(answers.url);
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong");
        }
    });