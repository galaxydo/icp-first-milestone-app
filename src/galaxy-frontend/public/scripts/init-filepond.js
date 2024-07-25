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
