/**
 * Perform CRUD operations: Create, Read, Update, Delete
 */

const fs = require('fs');
const path = require('path');

/**
 * Check if a directory exists
 * @param {String} directoryPath
 * @return {Boolean}
 */
function checkDirectoryExists(directoryPath) {
    try {
        return fs.statSync(directoryPath).isDirectory();
    } catch (err) {
        return false;
    }
}

/**
 * Check if a file exists
 * @param {String} filePath 
 * @returns {Boolean}
 */
function checkFileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

/**
 * Create a directory if it doesn't exist
 * @param {String} directoryPath 
 * @returns {void}
 */
function createNewDirectory(directoryPath) {
    if (checkDirectoryExists(directoryPath)) {
        console.log(`Directory '${directoryPath}' already exists.`);
    } else {
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
            if (err) {
                console.error(`Error creating directory: ${ err }`);
            } else {
                console.log(`Directory '${directoryPath}' created successfully.`);
            }
        });
    }
}

/**
 * Create an empty file inside a directory if it doesn't exist
 * @param {String} directoryPath 
 * @param {String} fileName 
 * @returns {void}
 */
function createNewFile(directoryPath, fileName) {
    const filePath = path.join(directoryPath, fileName);
    if (checkFileExists(filePath)) {
        console.log(`File '${fileName}' already exists in directory '${directoryPath}'.`);
    } else {
        fs.open(filePath, 'w', (err, fileDescriptor) => {
            if (err) {
                console.error(`Error creating file: ${ err }`);
            } else {
                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        console.error(`Error closing file: ${ err }`);
                    } else {
                        console.log(`Empty file '${fileName}' created successfully in directory '${directoryPath}'.`);
                    }
                });
            }
        });
    }
}

/**
 * Write content to a file
 * @param {String} directoryPath 
 * @param {String} fileName 
 * @param {String} fileContent 
 * @returns {void}
 */
function writeContentToFile(directoryPath, fileName, fileContent) {
    const filePath = path.join(directoryPath, fileName);
    if (checkFileExists(filePath)) {
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.error(`Error writing content to file: ${ err }`);
            } else {
                console.log(`Content updated in file '${fileName}' successfully in directory '${directoryPath}'.`);
            }
        });
    } else {
        console.log(`File '${fileName}' does not exist in directory '${directoryPath}'.`);
    }
}

/**
 * Rename a file in the specified directory
 * @param {String} directoryPath 
 * @param {String} oldFileName 
 * @param {String} newFileName 
 * @returns {void}
 */
function renameFileInDirectory(directoryPath, oldFileName, newFileName) {
    const oldFilePath = path.join(directoryPath, oldFileName);
    const newFilePath = path.join(directoryPath, newFileName);
    fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            console.error(`Error renaming file: ${ err }`);
        } else {
            console.log(`File '${oldFileName}' renamed to '${newFileName}' successfully in directory '${directoryPath}'.`);
        }
    });
}

/**
 * Delete a file from the specified directory
 * @param {String} directoryPath 
 * @param {String} fileName
 * @returns {void}
 */
function deleteFileFromDirectory(directoryPath, fileName) {
    const filePath = path.join(directoryPath, fileName);
    if (checkFileExists(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${ err }`);
            } else {
                console.log(`File '${fileName}' deleted successfully from directory '${directoryPath}'.`);
            }
        });
    } else {
        console.log(`File '${fileName}' does not exist in directory '${directoryPath}'.`);
    }
}

// Main

const targetDirectory = '/Users/HP/Desktop/testDir/';
const targetFileName = 'a.txt';
const targetFileContent = 'Hello, this is my file content!';
const newFileName = 'updatedFile.txt';

// Operation to perform
const operation = 'createFile';

switch (operation) {
    case 'createDirectory':
        createNewDirectory(targetDirectory);
        break;

    case 'createFile':
        createNewFile(targetDirectory, targetFileName);
        break;

    case 'writeFileContent':
        writeContentToFile(targetDirectory, targetFileName, targetFileContent);
        break;

    case 'renameFile':
        renameFileInDirectory(targetDirectory, targetFileName, newFileName);
        break;

    case 'deleteFile':
        deleteFileFromDirectory(targetDirectory, targetFileName);
        break;

    default:
            console.log('Invalid operation.');
    }