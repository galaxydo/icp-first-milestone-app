import arrowDownToLineIcon from "@iconify/icons-lucide/arrow-down-to-line";
import uploadIcon from "@iconify/icons-lucide/upload";
import xIcon from "@iconify/icons-lucide/x";

import { Button, Modal } from "@/components/daisyui";

import Icon from "@/components/Icon";
import FileUploader from "@/components/forms/FileUploader";

const UploadButton = () => {
    return (
        <>
            <Button
                _="on click add @open to <dialog[role='files']/> then add .modal-open to <dialog[role='files']/>"
                startIcon={<Icon icon={uploadIcon} className="size-4" />}
                size="sm"
                aria-label="Upload file"
                color={"ghost"}
                className=" border-base-content/20">
                Upload
            </Button>
            <Modal open={false} backdrop role="files">
                <div className="flex items-center justify-between">
                    <p className="font-medium">Upload Files</p>
                    <form method="dialog">
                        <Button
                            color="ghost"
                            size={"sm"}
                            aria-label="Close upload file modal"
                            _="on click remove @open from <dialog/> then remove .modal-open from <dialog/>"
                            shape={"circle"}
                            startIcon={<Icon icon={xIcon} className="size-5" />}></Button>
                    </form>
                </div>
                
                    <FileUploader _="
init
    js()
        const inputElement = document.querySelector(`input[type='file']`);
        const pond = FilePond.create(inputElement, {
                            acceptedFileTypes: ['image/*'],
                            maxFileSize: '1MB'
                        });
    end
" data-max-file-size="2MB"/>


            </Modal>
        </>
    );
};

export default UploadButton;
