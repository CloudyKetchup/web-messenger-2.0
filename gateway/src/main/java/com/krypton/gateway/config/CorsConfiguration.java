package com.krypton.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import static org.springframework.web.cors.reactive.CorsUtils.isCorsRequest;

@Configuration
@EnableWebFlux
public class CorsConfiguration
{
    @Bean
    public WebFilter corsFilter()
    {
        return (ServerWebExchange ctx, WebFilterChain chain) ->
        {
            var request = ctx.getRequest();

            if (isCorsRequest(request)) {
                var response = ctx.getResponse();
                var headers = response.getHeaders();
//                headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
                headers.add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
                headers.add("Access-Control-Max-Age", "3600");
                headers.add("Access-Control-Allow-Headers", "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN" );

                if (request.getMethod() == HttpMethod.OPTIONS)
                {
                    response.setStatusCode(HttpStatus.OK);
                    return Mono.empty();
                }
            }
            return chain.filter(ctx);
        };
    }
}
