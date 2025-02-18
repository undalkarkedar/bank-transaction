export const fileUploadMsg = {
  fileSelection: 'No file selected.',
  fileType: 'Only CSV files are allowed.',
  emptyFile: 'The CSV file is empty.',
  whiteSpace: 'The CSV file is empty or contains only whitespace.',
  noData: 'The CSV file contains only headers. It doesnt have any data.',
  parsingError: 'Error parsing CSV file.',
  readingError: 'Error reading file',
  addingTransition: 'Error adding transactions. Please try again.',
} as const;
