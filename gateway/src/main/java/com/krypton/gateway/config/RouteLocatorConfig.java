package com.krypton.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.function.Predicate;

@Configuration
public class RouteLocatorConfig
{

	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder builder)
	{
		return builder.routes()
				.route(r -> r
					.path("/socket/messaging/**")
					.uri("lb://websocket-server")
				)
				.build();
	}
}
