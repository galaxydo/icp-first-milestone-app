FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
);

FilePond.create(
    document.querySelector('input[type="file"]'),
    {
        acceptedFileTypes: ['image/*'],
    }
);

function resetFilepond() {
    const fp = FilePond.find(document.querySelector('.filepond--root'));
    if (fp.getFiles().length != 0) {
        for (var i = 0; i <= fp.getFiles().length - 1; i++) {
          fp.removeFile(fp.getFiles()[0].id)
        }
    }
}

// function handleAddFile(event) {
//   console.log('ENABLE NOW');
//   const button = document.getElementById('push');
//   if (button) {
//     button.removeAttribute('disabled');
//     button.classList.remove('btn-disabled');
//   }
// }

// function handleAddFileStart(event) {
//   console.log('DISABLE MEEE');
//   const button = document.getElementById('push');
//   if (button) {
//     button.setAttribute('disabled', 'true');
//     button.classList.add('btn-disabled');
//   }
// }

// document.addEventListener('FilePond:addfile', handleAddFile);
// document.addEventListener('FilePond:addfilestart', handleAddFileStart);
