package com.krawl.backend.captcha;

public interface CaptchaVerifier {
    boolean verify(String token, String remoteIp);
}


