package com.campus_rating_system;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class CampusRatingSystemController {

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World";
    } 
}
