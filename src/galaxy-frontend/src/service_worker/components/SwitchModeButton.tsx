import { Button } from "@/components/daisyui";

const SwitchModeButton = ({ currentView }) => {
  return (
    <div className="flex items-center">
      <Button
        className={`px-4 py-2 rounded-l-md border-base-content/20 hover:border-transparent hover:bg-base-content/20 transition-colors duration-300 ${currentView === 'canvas' ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
        variant={"outline"}
        size={"sm"}
        color={"ghost"}
        _="on click set the window's location to '/canvas'"
      >
        Canvas View
      </Button>
      <div className="w-0.5 h-6 bg-gray-400 mx-1"></div>
      <Button
        className={`px-4 py-2 rounded-r-md border-base-content/20 hover:border-transparent hover:bg-base-content/20 transition-colors duration-300 ${currentView === 'files' ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
        variant={"outline"}
        size={"sm"}
        color={"ghost"}
        _="on click set the window's location to '/'"
      >
        File Manager
      </Button>
    </div>
  );
};

export default SwitchModeButton;
