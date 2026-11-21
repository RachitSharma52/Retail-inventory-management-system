package com.retail.inventory.dto;

public class ApiResponse<T> {
    private boolean success;
    private String message;
    private Integer count;
    private T data;

    public ApiResponse() {}

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(boolean success, Integer count, T data) {
        this.success = success;
        this.count = count;
        this.data = data;
    }

    public ApiResponse(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
}
