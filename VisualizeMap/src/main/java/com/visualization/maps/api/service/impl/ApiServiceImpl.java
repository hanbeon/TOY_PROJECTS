package com.visualization.maps.api.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.visualization.maps.api.service.ApiService;
import com.visualization.maps.cmm.CmmUtils;

@SuppressWarnings("unchecked")
@Service("apiService")
public class ApiServiceImpl implements ApiService{

    private static final String SERVICE_KEY = "mMub96pnrS1NCnZYyaP03ZToETCTfTG1N%2BDlHfuDa00cqb%2FrTZ3dW6qvkPVawOT7ED%2F2jN%2Bd4N84DwTBl%2Bp2Dw%3D%3D";
    // 버스 노선 경로 정류장
    private static final String GET_ROUTE_ACCTO_THRGH_STTN_LIST = "http://openapi.tago.go.kr/openapi/service/BusRouteInfoInqireService/getRouteAcctoThrghSttnList";
    // 실시간 버스 노선 경로
    private static final String GET_ROUTE_ACCTO_BUS_LC_LIST = "http://openapi.tago.go.kr/openapi/service/BusLcInfoInqireService/getRouteAcctoBusLcList";

    @Override
    public List<Map<String, Object>> getRouteAcctoThrghSttnList(Map<String, Object> paramMap) throws Exception {

        paramMap.put("serviceKey", SERVICE_KEY);
        paramMap.put("url", GET_ROUTE_ACCTO_THRGH_STTN_LIST);
        paramMap.put("numOfRows", "10000");

        Map<String,Object> responseMap = CmmUtils.getRequestApi(paramMap);

        return (List<Map<String,Object>>)responseMap.get("resultData");
    }

    @Override
    public List<Map<String, Object>> getRouteAcctoBusLcList(Map<String, Object> paramMap) throws Exception {

        paramMap.put("serviceKey", SERVICE_KEY);
        paramMap.put("url", GET_ROUTE_ACCTO_BUS_LC_LIST);
        paramMap.put("numOfRows", "10000");

        Map<String,Object> responseMap = CmmUtils.getRequestApi(paramMap);

        return (List<Map<String,Object>>)responseMap.get("resultData");
    }

}
