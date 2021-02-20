package com.visualization.maps.map.service;

import java.util.List;
import java.util.Map;

public interface MapService {

	List< Map<String,Object> > getCityList() throws Exception;

	List< Map<String,Object> > getBus( Map<String,Object> paramMap ) throws Exception;

	Map<String,Object> getBusNodes( Map<String,Object> paramMap ) throws Exception;

	Map<String,Object> getBusDetailInfoOne( Map<String,Object> paramMap ) throws Exception;

	void insertBusNodes( Map<String, Object> paramMap ) throws Exception;
}
