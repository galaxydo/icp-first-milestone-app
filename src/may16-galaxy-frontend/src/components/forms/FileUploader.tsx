// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import "filepond/dist/filepond.css";
// import { FilePond, FilePondProps, registerPlugin } from "react-filepond";
import { Button } from "../daisyui";
import Icon from "../Icon";
import arrowDownToLineIcon from "@iconify/icons-lucide/arrow-down-to-line";


const FileUploader = (props: any) => {
  //.uploadFilesForm
  return <div className="mt-4"><form hx-post="/uploadFiles" hx-target="#UploadProcess" hx-swap="beforeend"><div class="filepond--wrapper"><input type="file" {...props} /></div>
    <input value='[{"value":"personal"}]' name='input-custom-dropdown' class='tagify--custom-dropdown' placeholder='Add tags'
 _="
init
    set inputElem to me
    js(inputElem)
      tagify = new Tagify(inputElem, {

          
          maxTags: 10,
      })
    end
      "/>
    <div className="mt-8 text-end">
      <Button
        _="on click remove @open from <dialog/> then remove .modal-open from <dialog/> then add @checked='true' to <div[role='rightDrawer'] .drawer-toggle />"
        hx-disabled-elt="this"
        color="primary"
        size={"sm"}
        startIcon={<Icon icon={arrowDownToLineIcon} className="size-4" />}>
        Import
      </Button>
    </div></form></div>;
  //.end
};

export default FileUploader;
