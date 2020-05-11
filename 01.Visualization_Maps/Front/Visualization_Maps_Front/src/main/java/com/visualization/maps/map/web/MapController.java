package com.visualization.maps.map.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/")
public class MapController {

    @RequestMapping(value= {"/",""})
    public String test4() throws Exception {

        return "test4";
    }

}
