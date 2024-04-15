function convertTimeStamp(timestamp) {
    // format it to MM/DD/YYYY
    return new Date(timestamp).toLocaleDateString();
}