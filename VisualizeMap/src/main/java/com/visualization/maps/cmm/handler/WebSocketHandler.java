package com.visualization.maps.cmm.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.visualization.maps.api.service.ApiService;

public class WebSocketHandler extends TextWebSocketHandler{

    private Logger logger = LoggerFactory.getLogger(WebSocketHandler.class);

    @Inject
    private ApiService apiService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        logger.info("{} 접속,");

        //logger.info("{} 접속," + session.getId() + "\t" + session.getPrincipal().getName());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        logger.info("{} 종료");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        logger.info("Message : {}",message);

        ObjectMapper mapper = new ObjectMapper();

        String msg = message.getPayload();
        System.out.println(msg);
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap = mapper.readValue(msg, new TypeReference<Map<String, String>>(){});

        System.out.println(mapper.writeValueAsString(paramMap));
        System.out.println("####"+paramMap.get("routeId"));
        List< Map<String,Object>> responseBusNodes = apiService.getRouteAcctoBusLcList(paramMap);

        System.out.println(mapper.writeValueAsString(responseBusNodes));

        session.sendMessage(new TextMessage(mapper.writeValueAsString(responseBusNodes)));

    }
}
