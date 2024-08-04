package com.furnitures.Exception;

import com.furnitures.Response.ApiResponses;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponses>resourceNotFoundExceptionHandler(ResourceNotFoundException ex){

        ApiResponses apiResponses=new ApiResponses();

        apiResponses.setDate(new Date());
        apiResponses.setErrorDesc(ex.getMessage());

        return  new ResponseEntity<>(apiResponses, HttpStatus.OK);


    }

}
