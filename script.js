const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let img = document.querySelector(".qr-body img");
    let canvas = document.querySelector("canvas");

    // CASE 1: If QR Code is an <img> (some versions of QRCodeJS render image)
    if (img) {
        fetch(img.src)
            .then(res => res.blob())
            .then(blob => {
                let url = URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = "QR_Code.png";
                a.click();
                URL.revokeObjectURL(url);
            });
        return;
    }

    // CASE 2: If QR code is a <canvas>
    if (canvas) {
        canvas.toBlob(function (blob) {
            let url = URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "QR_Code.png";
            a.click();
            URL.revokeObjectURL(url);
        });
    }
});



function isEmptyInput(){
    // if(qrText.value.length > 0){
    //     generateQRCode();
    // }
    // else{
    //     alert("Enter the text or URL to generate your QR code");
    // }
    qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or URL to generate your QR code");;
}
function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width:size,
        colorLight:"#fff",
        colorDark:"#000",
    });
}
