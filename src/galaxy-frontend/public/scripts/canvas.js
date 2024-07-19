const App = (props) => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      {
        style: {},
      },
      React.createElement(ExcalidrawLib.Excalidraw, props),
    ),
  );
};

const excalidrawWrapper = document.getElementById("app");
const root = ReactDOM.createRoot(excalidrawWrapper);

const appProps = {
  excalidrawAPI: (api) => {
    window.ea = api;

    window.eaToggleTheme = () => {
      api.updateScene({
        appState: {
          theme: api.getAppState().theme == 'dark' ? 'light' : 'dark',
        }
      })
    }

    updateSceneWithFiles();
  },
  viewModeEnabled: false,
  zenModeEnabled: false,
  gridModeEnabled: false,
  objectsSnapModeEnabled: false,
  theme: "dark",
  name: "Galaxy",
};

root.render(React.createElement(App, appProps));

async function fetchFiles() {
  const response = await fetch('/readdir');
  if (!response.ok) {
    throw new Error('Failed to fetch file list');
  }
  return response.json();
}

async function fetchFileContentAndDimensions(filePath) {
  const response = await fetch(`/readFile?fileName=${encodeURIComponent(filePath)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch file content for ${filePath}`);
  }
  const blob = await response.blob();
  console.log('Blob MIME type:', blob.type); // Log the MIME type
  const uint8Array = new Uint8Array(await blob.arrayBuffer());

  // Create an image element to get dimensions
  const img = new Image();
  const url = URL.createObjectURL(blob);

  return new Promise((resolve) => {
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        content: uint8Array,
        width: img.width,
        height: img.height,
        blob, // Add blob to the resolved object
        filePath, // Add filePath to the resolved object
      });
    };
    img.src = url;
  });
}

async function addFiles(files, fileData) {
  const fileDataArray = await Promise.all(files.map(async (file) => {
    const { content, width, height, blob, filePath } = fileData[file];
    const dataURL = await blobToDataURL(blob, filePath);
    return {
      id: file,
      mimeType: getMimeType(file),
      dataURL,
      created: Date.now(),
      lastRetrieved: Date.now(),
    };
  }));

  console.log('fileDataArray', fileDataArray);

  ea.addFiles(fileDataArray);
}

function initializeElements(files, fileData) {
  const elements = [];
  const numFiles = files.length;
  const numRows = Math.ceil(Math.sqrt(numFiles));
  const numCols = Math.ceil(numFiles / numRows);
  const cellWidth = 800 / numCols;
  const cellHeight = 600 / numRows;

  files.forEach((file, index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;
    const x = col * cellWidth;
    const y = row * cellHeight;

    const { width, height } = fileData[file];
    const aspectRatio = width / height;
    let adjustedWidth, adjustedHeight;

    if (aspectRatio > 1) {
      adjustedWidth = cellWidth;
      adjustedHeight = cellWidth / aspectRatio;
    } else {
      adjustedHeight = cellHeight;
      adjustedWidth = cellHeight * aspectRatio;
    }

    elements.push({
      id: file, // Use file name as id
      x,
      y,
      width: adjustedWidth,
      height: adjustedHeight,
      type: 'image',
      fileId: file, // Use file name as fileId
      status: 'pending',
      scale: [1, 1],
      strokeColor: '#000000', // Default stroke color
      backgroundColor: 'transparent', // Default background color
      fillStyle: 'hachure', // Default fill style
      strokeWidth: 1, // Default stroke width
      strokeStyle: 'solid', // Default stroke style
      roundness: null, // Default roundness
      roughness: 0, // Default roughness
      opacity: 100, // Default opacity
      angle: 0, // Default angle
      seed: Math.floor(Math.random() * 1000), // Random seed
      version: 1, // Initial version
      versionNonce: Math.floor(Math.random() * 1000), // Random version nonce
      isDeleted: false, // Not deleted
      groupIds: [], // No groups
      frameId: null, // No frame
      boundElements: null, // No bound elements
      updated: Date.now(), // Current timestamp
      link: null, // No link
      locked: false, // Not locked
      customData: {}, // No custom data
    });
  });

  return elements;
}

async function updateSceneWithFiles() {
  try {
    const files = await fetchFiles();
    const fileDataPromises = files.map((file) => fetchFileContentAndDimensions(file));
    const fileDataArray = await Promise.all(fileDataPromises);
    const fileData = Object.fromEntries(files.map((file, index) => [file, fileDataArray[index]]));

    const elements = initializeElements(files, fileData);
    console.log('elements', elements);
    await addFiles(files, fileData);
    ea.updateScene({ elements });
  } catch (error) {
    console.error('Error updating scene with files:', error);
  }
}

function blobToDataURL(blob, filePath) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataURL = reader.result;
      const mimeType = getMimeType(filePath);
      // Ensure the Data URL has the correct MIME type
      const correctedDataURL = dataURL.replace('application/octet-stream', mimeType);
      resolve(correctedDataURL);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function getMimeType(filePath) {
  const extension = filePath.split('.').pop().toLowerCase();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
  };
  return mimeTypes[extension] || 'application/octet-stream';
}
