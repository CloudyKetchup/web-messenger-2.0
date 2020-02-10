package com.krypton.mediaservice.config;

import lombok.AllArgsConstructor;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class FeignConfig
{
    @Bean
    public HttpMessageConverters getHttpMessageConverters()
    {
        return new HttpMessageConverters();
    }
}
