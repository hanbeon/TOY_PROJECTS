package com.visualization.maps.cmm;

import java.util.HashMap;

import org.springframework.jdbc.support.JdbcUtils;

@SuppressWarnings({ "unchecked", "serial", "rawtypes" })
public class LowerHashMap extends HashMap{

    @Override
    public Object put(Object key, Object value) {

        return super.put(JdbcUtils.convertUnderscoreNameToPropertyName((String) key), value);
    }

}
