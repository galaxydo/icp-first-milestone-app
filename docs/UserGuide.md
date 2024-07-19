---

### User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Login Page](#login-page)
    - [Steps to Login](#steps-to-login)
3. [File Manager Page](#file-manager-page)
    - [Uploading Files](#uploading-files)
    - [Managing Collections](#managing-collections)
4. [Canvas Page](#canvas-page)
    - [Viewing Images](#viewing-images)
    - [Rearranging Images](#rearranging-images)
5. [Additional Tips](#additional-tips)

---

[![Demo](http://img.youtube.com/vi/vL4PBYuxgDA/0.jpg?jul20)](http://www.youtube.com/watch?v=vL4PBYuxgDA "Galaxy IC Demo")
[Click to watch Video](http://www.youtube.com/watch?v=vL4PBYuxgDA)

## Introduction

Welcome to the Galaxy Web App User Guide. This guide provides step-by-step instructions on how to effectively use the app. The Galaxy Web App allows users to upload images into a canister hosted on the Internet Computer, organize images into collections, and view images on a canvas for arrangement and visualization.

---

## Login Page

The Login Page is your entry point to the Galaxy Web App. This page is a static HTML page served directly from the Internet Computer (ICP) assets canister.

### Steps to Login

1. **Open the Galaxy Web App**: Navigate to the application URL in your web browser.
2. **Login Button**: You will see a login button on the landing page with an on-click handler.
3. **Authorize with Internet Identity (II)**: Clicking the login button will redirect you to the Internet Identity canister for authentication.
4. **Store Identity**: Once you successfully log in, your identity will be stored in local storage using `@dfinity/auth-client`.
5. **Service Worker Registration**: A service worker (SW) will be registered to handle subsequent requests and manage the application.
6. **Page Refresh**: The page will refresh, and control over the page will be handed to the service worker.

---

## File Manager Page

The File Manager Page allows you to upload and manage your images. This page is rendered and managed by the service worker.

### Uploading Files

1. **Navigate to the File Manager Page**: After logging in, you can access the File Manager Page, which is rendered with Preact.
2. **Select Files to Upload**: Click the "Upload" button to select files from your local device. A preview gallery will display selected files.
3. **Submit Files**: The file blob is added to hidden input fields, and then the form is submitted.
4. **Service Worker Handling**: The service worker route `POST /uploadFiles` receives files and asynchronously calls the `uploadPicture` method on the canister.
5. **File Table**: As the files upload, a loading row is added to the file table, followed by the actual file details once the upload is complete. The file table updates with `/FileRow` requests using htmx, waiting for the canister `readPicture` method to return the details.

### Managing Collections

**not implemented**

1. **Create Collections**: Organize your uploaded images into collections. Provide a name for the collection when uploading files or create a new collection explicitly.
2. **View Collections**: View and manage your collections in the File Manager.
3. **Delete Images**: If needed, delete images from your collections.

---

## Canvas Page

The Canvas Page allows you to view and rearrange your uploaded images on a canvas, using Excalidraw.

### Viewing Images

1. **Navigate to the Canvas Page**: Access the Canvas Page from the main navigation.
2. **Loading Images**: The page will load all images from your selected collection using the canister middleware endpoint `__fs__/fileId`, which is composed of the Owner Principal, Collection Name, and File Name.
3. **Private Collections**: The canister ensures only images from your own collections are shown to maintain privacy and security. (**not implemented**)

### Rearranging Images

1. **Drag and Drop**: Use the Excalidraw canvas to drag and drop images, rearranging them as needed.
2. **Save Layouts**: Save your new layouts for future reference after rearranging the images. (**not implemented**)
