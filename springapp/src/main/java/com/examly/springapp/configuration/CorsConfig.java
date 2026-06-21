package com.examly.springapp.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**")
                        // .allowedOrigins("*")
                        // .allowedOrigins("https://8081-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
                        .allowedOrigins("http://localhost:8082")
                        // "https://8080-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
                        .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
