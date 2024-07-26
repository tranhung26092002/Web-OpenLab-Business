package edu.ptit.openlab.payload.response;
import lombok.Data;

@Data
public class BaseResponse  {
    private int status;
    private String message;
    private Object data;

    public BaseResponse(){

    }

    public BaseResponse(int status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

}
