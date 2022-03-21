package com.example.reversitwo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/",method = RequestMethod.GET)
public class HomeController {
    public String index () {
        return "index";
    }
}
