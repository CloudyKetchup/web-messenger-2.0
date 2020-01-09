package com.krypton.databaseservice.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan("com.krypton.common.model")
@EnableJpaRepositories(basePackages = "com.krypton.databaseservice.repository")
public class JpaConfig {}
