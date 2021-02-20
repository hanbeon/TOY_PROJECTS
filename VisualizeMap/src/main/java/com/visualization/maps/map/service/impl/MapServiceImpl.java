package com.visualization.maps.map.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.visualization.maps.map.service.MapService;

@Service("mapService")
public class MapServiceImpl implements MapService{

	@Resource(name="mapMapper")
	private MapMapper mapMapper;

	@Override
	public List<Map<String, Object>> getCityList() throws Exception {

		return mapMapper.getCityList();
	}

	@Override
	public List<Map<String, Object>> getBus(Map<String, Object> paramMap) throws Exception {

		return mapMapper.getBus(paramMap);
	}

	@Override
	public Map<String, Object> getBusNodes(Map<String, Object> paramMap) throws Exception {

		List<Map<String,Object>> getBus = mapMapper.getBusNodes(paramMap);

		List<Map<String,Object>> upWayNodes    = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> downWayNodes  = new ArrayList<Map<String,Object>>();

		for ( int i = 0 ; i < getBus.size(); i++ ) {

			if ( "UP".equals(getBus.get(i).get("way"))  ) {
				upWayNodes.add(getBus.get(i));
			} else {
				downWayNodes.add(getBus.get(i));
			}
		}

		Map<String,Object> resultMap = new HashMap<String, Object>();
		resultMap.put("getBusNodes", getBus);
		resultMap.put("upWayNodes", upWayNodes);
		resultMap.put("downWayNodes", downWayNodes);

		return resultMap;
	}

	@Override
	public void insertBusNodes(Map<String, Object> paramMap) throws Exception {

		Map<String, Object> map = new HashMap<String, Object>();
		List< Map<String, Object> > resultList = (List<Map<String, Object>>) paramMap.get("resultData");
		for ( Map temp : resultList ) {
			map.putAll(temp);
			map.put("cityCode", paramMap.get("cityCode"));
			map.put("routeId", paramMap.get("routeId"));
			map.put("nodeord", Integer.parseInt((String)map.get("nodeord")));

			mapMapper.insertBusNodes(map);
		}

	}

	@Override
	public Map<String, Object> getBusDetailInfoOne(Map<String, Object> paramMap) throws Exception {
		return mapMapper.getBusDetailInfoOne(paramMap);
	}


}
