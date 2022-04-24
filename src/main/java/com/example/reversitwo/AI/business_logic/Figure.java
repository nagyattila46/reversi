
package com.example.reversitwo.AI.business_logic;

/**
 * It is a common interface for the figures that reside at the table (fox, hounds).
 * @author valyis
 */
public interface Figure {
    int getCol();
    int getRow();
    void setCol(int x);
    void setRow(int a);
    
}
