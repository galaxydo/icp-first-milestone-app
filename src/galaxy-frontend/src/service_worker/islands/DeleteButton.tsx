import { h } from 'preact';
import { Button } from '@/components/daisyui';
import Icon from '@/components/Icon';
import folderGit2Icon from "@iconify/icons-lucide/folder-git-2";
import { routes } from "@generated/routes";
import { backendActor } from '@/canister';
import fs from '@/fs';
import state from '@/state';

const DeleteButton = () => {
  // return (
  //   <div>
  //     <form hx-post="/DeleteButton" hx-include="[type='checkbox']" hx-swap="none">
  //       <div className="flex items-center justify-between">
  //           <Button
  //             _="">
  //             Delete
  //         </Button>
  //       </div>
  //     </form>
  // </div>
  // )
  
  return (
    <Button 
      // _="on click log me end on change from <input[type='checkbox']/> log me"
      hx-post={routes.post.DeleteButton}
      hx-confirm="Are you sure you want to delete the selected files?"
      hx-include="[type='checkbox']"
      hx-swap="none"
      color="ghost"
      size="sm" 
      className="border-base-content/20 sm:flex">
      <Icon icon={folderGit2Icon} fontSize={16} />
      <span>Delete</span>
      <span class="text-bold" _="on change from <#Files input[type='checkbox']/> or change from <#SelectAllCheckbox/> set val to (<#Files input[type='checkbox']:checked/>).length then log val then put val into me">0</span>
      <span>files</span>
    </Button>
  );
};


export async function GET(req: Request) {
  return <DeleteButton />;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const filesToDelete = [];

    for (let entry of formData.entries()) {
      if (entry[0] === 'FileRow') {
        filesToDelete.push(entry[1]);
      }
    }

    // Delete files from backend and filesystem
    const results = await Promise.all(filesToDelete.map(async (file) => {
      const [owner, collection, name] = file.split('/');
      const backendResult = await backendActor.deletePicture(collection, name);
      const filePath = `/${owner}/${collection}/${name}`;
      
      try {
        await fs.unlink(filePath);
        return backendResult;
      } catch (err) {
        console.error(`Error deleting file from filesystem: ${filePath}`, err);
        return false;
      }
    }));

    return [<div>OK</div>, { 'HX-Trigger': 'FileDeleted' }]
  } catch (error) {
    console.error('Error processing DELETE request:', error);
    return <div>{error}</div>
  }
}

export default DeleteButton;
