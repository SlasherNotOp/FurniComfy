package com.furnitures.Exception;

import lombok.Data;

@Data
public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;

    private String fieldName;





    public ResourceNotFoundException(String message) {

        super(message);

    }


}
