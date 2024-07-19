#### 1. **Main Page**
- **Routes**
  - `/`
  - `/files`
- **Components**
  - `FilesPage`

#### 2. **FilesPage Component**
- **Subcomponents**
  - `Topbar`
  - `Overview`
    - `FreeSpaceWrapper`
    - `UploadProcess`
      - `SingleProcess`
        - `ProcessPercent`
      - `Activity`
        - `ActivityItem`
  - `AllFiles`
    - `FilesTable`
      - `FilesTableBody`
        - `LoadingFileRow`
        - `StorageFileRow`
  - `UploadButton`
    - `Modal`
      - `FileUploader`

#### 3. **Routes and Islands**
- **GET Routes**
  - `/CanvasPage`
  - `/FileRow`
  - `/FilesPage`
  - `/FilesTableBody`
  - `/FreeSpaceValue`
  - `/GenerateLoginPage`
  - `/ToggleTheme`
  - `/UploadProcess`
  - `/WhoAmI`
- **POST Routes**
  - `/UploadProcess`

#### 4. **FilesTableBody Island**
- **Subcomponents**
  - `LoadingFileRow`
  - `StorageFileRow`

### Detailed Breakdown

#### Main Page
- **Routes**
  - `/` and `/files` both render the `FilesPage` component.

#### FilesPage Component
- **Topbar**: Displays the top navigation bar.
- **Overview**: Displays the canister overview, including free space and upload processes.
  - **FreeSpaceWrapper**: Shows the available free space.
  - **UploadProcess**: Displays the list of files being uploaded.
    - **SingleProcess**: Represents a single file upload process.
      - **ProcessPercent**: Shows the upload progress percentage.
    - **Activity**: Displays recent activities.
      - **ActivityItem**: Represents a single activity item.
- **AllFiles**: Displays all files in a table format.
  - **FilesTable**: The table structure for displaying files.
    - **FilesTableBody**: The body of the table, which is dynamically loaded.
      - **LoadingFileRow**: Represents a loading state for a file row.
      - **StorageFileRow**: Represents a file row with actual data.
- **UploadButton**: Button to open the file upload modal.
  - **Modal**: The modal dialog for uploading files.
    - **FileUploader**: The file upload form.

#### Routes and Islands
- **GET Routes**: Each route corresponds to a specific component that is rendered when the route is accessed.
- **POST Routes**: Handles file upload processes.

#### FilesTableBody Island
- **LoadingFileRow**: Represents a loading state for a file row.
- **StorageFileRow**: Represents a file row with actual data.

### Visual Representation

```
Main Page
├── Routes
│   ├── /
│   └── /files
│
├── FilesPage Component
│   ├── Topbar
│   ├── Overview
│   │   ├── FreeSpaceWrapper
│   │   ├── UploadProcess
│   │   │   ├── SingleProcess
│   │   │   │   └── ProcessPercent
│   │   │   └── Activity
│   │   │       └── ActivityItem
│   ├── AllFiles
│   │   ├── FilesTable
│   │   │   └── FilesTableBody
│   │   │       ├── LoadingFileRow
│   │   │       └── StorageFileRow
│   └── UploadButton
│       └── Modal
│           └── FileUploader
│
├── Routes and Islands
│   ├── GET Routes
│   │   ├── /CanvasPage
│   │   ├── /FileRow
│   │   ├── /FilesPage
│   │   ├── /FilesTableBody
│   │   ├── /FreeSpaceValue
│   │   ├── /GenerateLoginPage
│   │   ├── /ToggleTheme
│   │   ├── /UploadProcess
│   │   └── /WhoAmI
│   └── POST Routes
│       └── /UploadProcess
│
└── FilesTableBody Island
    ├── LoadingFileRow
    └── StorageFileRow

