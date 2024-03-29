package com.codl.utils;

import java.util.List;

public class InvalidInputException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private List<ErrorInfo> errors;

	public List<ErrorInfo> getErrors() {
		return this.errors;
	}

	public InvalidInputException(List<ErrorInfo> errors) {
		super();
		this.errors = errors;
	}

	public InvalidInputException(String message, List<ErrorInfo> errors) {
		super(message);
		this.errors = errors;
	}

}
