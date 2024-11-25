class CustomResponse {
    constructor() {
        this.timestamp = new Date().toISOString(); // Include timestamp for better debugging
        this.status = null; // HTTP status code
        this.message = null; // A user-friendly message
        this.data = null; // Payload for success responses
    }

    // Method to create a success response
    successResponse(status, message, data = null) {
        this.status = status;
        this.data = data;
        this.message = message;
        return this;
    }

    // Method to create an error response
    errorResponse(status, message, data = null) {
        this.status = status;
        this.message = message || 'Something Went Wrong';
        this.data = data;
        return this;
    }
}

module.exports = CustomResponse;
