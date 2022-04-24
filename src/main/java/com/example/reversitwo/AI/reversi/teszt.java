/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.reversitwo.AI.reversi;

import java.util.Vector;

/**
 *
 * @author attila
 */
public abstract class teszt extends GameSearch{
 
    
        
    public static void main(String[] args) {
        
        ReversiAllas proba=new ReversiAllas();
        int[][] x={{0,0,0,0,0,0,0,0},
                {1,1,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,1,2,0,0,0},
                {0,0,0,2,1,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0},
                {0,0,0,0,0,0,0,0}};
        proba.setMatrix(x);

        System.out.println(proba);
        
    }


}
