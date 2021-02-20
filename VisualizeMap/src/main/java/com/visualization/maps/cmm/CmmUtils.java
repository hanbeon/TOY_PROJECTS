package com.visualization.maps.cmm;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class CmmUtils {

	private static final String[] DEFAULT_API_REQUIRED_ARR = {"serviceKey","url"};

	public static Map getRequestApi(Map<String,Object> paramMap) throws Exception{

		Map<String, Object> resultMap = new HashMap<String, Object>();

		if ( apiRequiredParamValidation(paramMap) == false) {
			resultMap.put("flag", "false");
		};

		String urlStr = (String)paramMap.get("url");
		StringBuilder urlBuilder = new StringBuilder(urlStr);
		urlBuilder.append( apiParamFormatter(paramMap, "UTF-8") );

		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		System.out.println("Response code: " + conn.getResponseCode());

		BufferedReader rd;
		if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
		    rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
		} else {
		    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
		}


		StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        resultMap.put("resultData", convertToXmlFromStringItems(sb.toString()));

		return resultMap;
	}

	public static boolean apiRequiredParamValidation(Map<String,Object> paramMap) {

		for ( String arg : DEFAULT_API_REQUIRED_ARR ) {
			if ( "".equals( paramMap.get(arg) ) ) {

				return false;
			}
		}

		return true;
	}

	public static String apiParamFormatter(Map<String,Object> paramMap
			, String encoderType)  throws Exception{

		StringBuilder builder = new StringBuilder();
		int i = 0;
		for ( String arg : paramMap.keySet()) {
			String key = arg;
			if ( "url".equals(key) == true ) continue;
			String value = (String)paramMap.get(key);
			String separation = i==0 ? "?" : "&";
			builder.append(separation);
			/*builder.append(URLEncoder.encode(key, encoderType));*/
			builder.append(key);
			builder.append("=");
			/*builder.append(URLEncoder.encode(value, encoderType));*/
			builder.append(value);
			i++;
		}

		return builder.toString();
	}

	/*
	 * API Value String > Xml 파싱 후 item 추출
	 */
	public static List<Map<String,Object> > convertToXmlFromStringItems(String strXml) throws Exception{

		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();

		Document document = builder.parse(new InputSource(new StringReader(strXml)));

		NodeList nodeList = document.getElementsByTagName("items");
		Node node = nodeList.item(0);

		int itemCnt = node.getChildNodes().getLength();
		int itemChildrenCnt = node.getChildNodes().item(0).getChildNodes().getLength();

		Map<String, Object> parseMap = new HashMap<String, Object>();

		List<Map<String,Object> > resultList = new ArrayList<Map<String,Object>>();

		int i,j=0;
		for ( i = 0; i < itemCnt; i++ ) {
			for ( j = 0; j < itemChildrenCnt; j++ ) {


				String key   = node.getChildNodes().item(i).getChildNodes().item(j).getNodeName();
				String value = node.getChildNodes().item(i).getChildNodes().item(j).getTextContent();

				parseMap.put(key, value);

			}

			resultList.add(parseMap);
			parseMap = new HashMap<String, Object>();
		}


		return resultList;

	}
}
