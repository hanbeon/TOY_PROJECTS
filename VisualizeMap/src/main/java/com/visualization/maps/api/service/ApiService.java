package com.visualization.maps.api.service;

import java.util.List;
import java.util.Map;

public interface ApiService {

    /*
     * 버스 노선 경로
     */
    public List< Map<String, Object> > getRouteAcctoThrghSttnList(Map<String, Object> paramMap) throws Exception;

    /*
     * 실시간 버스 노선
     */
    public List< Map<String,Object> > getRouteAcctoBusLcList(Map<String, Object> paramMap) throws Exception;
}
