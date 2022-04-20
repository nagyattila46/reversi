package com.example.reversitwo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(path = "/",method = RequestMethod.GET)
public class HomeController {
    public String index () {
        return "index";
    }
}
