package com.template.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<Object> handleDomainException(DomainException ex, WebRequest request) {
        var status = HttpStatus.BAD_REQUEST;
        log.error("handling 400 bad request", ex.getMessage());

        var error = Error.builder()
                .statusCode(status.value())
                .title(ex.getMessage())
                .dateTime(LocalDateTime.now())
                .build();

        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException ex, WebRequest request) {
        var status = HttpStatus.NOT_FOUND;

        var error = Error.builder()
                .statusCode(status.value())
                .title(ex.getMessage())
                .dateTime(LocalDateTime.now())
                .build();

        return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        // handle validation exception
        var error = Error.builder()
                .statusCode(status.value())
                .title("Error")
                .dateTime(LocalDateTime.now())
                .fields(getFailedValidationFields(ex))
                .build();

        return super.handleExceptionInternal(ex, error, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleMaxUploadSizeExceededException(
            MaxUploadSizeExceededException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        log.error("handling 400 MaxUploadSizeExceededException request", ex.getMessage());

        status = HttpStatus.BAD_REQUEST;
        var error = Error.builder()
                .statusCode(status.value())
                .title(ex.getMessage())
                .dateTime(LocalDateTime.now())
                .build();

        return handleExceptionInternal(ex, error, headers, status, request);
    }

    private List<PropertyField> getFailedValidationFields(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getAllErrors()
                .stream()
                .map(this::buildPropertyFieldError)
                .collect(Collectors.toList());
    }

    private PropertyField buildPropertyFieldError(ObjectError error) {

        // TODO this is failing to cast complex validation exceptions like duplicated username
        return new PropertyField(((FieldError) error).getField(), ((FieldError) error).getRejectedValue(), messageSource.getMessage(error, LocaleContextHolder
                .getLocale()));
    }
}
