package com.visualization.maps.map.service.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface MapMapper {

	List< Map<String,Object> > getCityList() throws Exception;

	List< Map<String,Object> > getBus( Map<String,Object> paramMap ) throws Exception;

	List< Map<String,Object> > getBusNodes( Map<String,Object> paramMap ) throws Exception;

	Map<String,Object> getBusDetailInfoOne( Map<String,Object> paramMap ) throws Exception;

	void insertBusNodes( Map<String, Object> paramMap) throws Exception;

}
