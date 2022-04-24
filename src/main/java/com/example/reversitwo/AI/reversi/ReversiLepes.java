/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.reversitwo.AI.reversi;



/**
 *
 * @author attila
 */
public class ReversiLepes extends Move{
    
    public int row,col;

    public ReversiLepes(int sor, int oszlop) {
        row=sor;
        col=oszlop;
    }

    
    
    

    public ReversiLepes() {
        super();
    }

    public int getCol() {
        return col;
    }

    public int getRow() {
        return row;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public void setRow(int row) {
        this.row = row;
    }
    
    
    
    
}
