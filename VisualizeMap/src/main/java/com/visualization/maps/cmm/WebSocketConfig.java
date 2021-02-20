package com.visualization.maps.cmm;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer{

    @Bean
    public WebSocketHandler webSocketHandler(){
        return new com.visualization.maps.cmm.handler.WebSocketHandler();
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        //registry.addHandler(webSocketHandler(), "/webSocket").addInterceptors(new WebSocketInterceptor()).withSockJS();
        registry.addHandler(webSocketHandler(), "/webSocket").addInterceptors().withSockJS();

    }


}
