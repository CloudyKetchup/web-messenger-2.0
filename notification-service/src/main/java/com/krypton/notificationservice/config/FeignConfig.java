package com.krypton.notificationservice.config;

import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig
{
    @Bean
    public HttpMessageConverters getHttpMessageConverters()
    {
        return new HttpMessageConverters();
    }
}
