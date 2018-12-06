const CLOUD_NAME = "parker1"

var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// on submit call to this function
async function uploadImg(elForm, ev) {
   // ev.preventDefault();
   // A function to be called if request succeeds
    function onSuccess(res) {
        console.log('uploadedImg', res);
        console.log('uploadedImg', res.url);
        return res;
    }

    var res = await doUploadImg(elForm, onSuccess)
    console.log('res=',res.url)
    return res.url;
}

function doUploadImg(elInput, onSuccess) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    var formData = new FormData();
    formData.append('file', elInput.files[0])
    formData.append('upload_preset', 'ymaycqwv');

   return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    .then(onSuccess)
    .catch(function (error) {
        console.error(error)
    })
   
}

export default{
    uploadImg
}
