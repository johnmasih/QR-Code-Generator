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
    let canvas = document.querySelector(".qr-body canvas");

    
    if (img) {
        const link = document.createElement("a");
        link.href = img.src;  
        link.setAttribute("download", "QR_Code.png");

        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
    }

    
    if (canvas) {
        const pngUrl = canvas.toDataURL("image/png"); 

        const link = document.createElement("a");
        link.href = pngUrl;
        link.setAttribute("download", "QR_Code.png");

        // Mobile fix: force click inside DOM
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
