package com.visualization.maps.map.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.visualization.maps.api.service.ApiService;
import com.visualization.maps.map.service.MapService;

@CrossOrigin
@RestController
@RequestMapping(value="/map/v1")
public class MapController {

    @Resource(name="mapService")
    private MapService mapService;

    @Resource(name="apiService")
    private ApiService apiService;

    @GetMapping(value="/bus/{routeNo}")
    public ResponseEntity< Object > getBus(@PathVariable("routeNo") String routeNo) throws Exception{

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("routeNo", routeNo);

        List< Map<String,Object> > getBus = mapService.getBus(paramMap);

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("resultData", getBus);

        return new ResponseEntity<Object>(result, HttpStatus.OK);
    }

    @GetMapping(value="/bus/{cityCode}/{routeId}")
    public ResponseEntity< Object > getBusNodes(@PathVariable("cityCode") String cityCode
            , @PathVariable("routeId") String routeId) throws Exception{

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("cityCode", cityCode);
        paramMap.put("routeId", routeId);


        Map<String,Object> getBusNodes = mapService.getBusNodes(paramMap);

        List<Map<String,Object>> tempBusNodes = (List<Map<String, Object>>) getBusNodes.get("getBusNodes");

        if ( tempBusNodes.size() < 1 )  {

            List< Map<String,Object>> responseBusNodes = apiService.getRouteAcctoThrghSttnList(paramMap);

            Map<String, Object> insertParam = new HashMap<String, Object>();
            insertParam.putAll(paramMap);
            insertParam.put("resultData", responseBusNodes);

            mapService.insertBusNodes(insertParam);

            getBusNodes = mapService.getBusNodes(paramMap);

        }

        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("getBusNodes", getBusNodes);
        resultMap.put("getBusDetailInfo", mapService.getBusDetailInfoOne(paramMap));

        return new ResponseEntity<Object>(resultMap, HttpStatus.OK);
    }

}
