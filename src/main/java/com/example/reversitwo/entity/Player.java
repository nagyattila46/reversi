package com.example.reversitwo.entity;


public enum Player {

    RED(1),BLUE(2);

    private Integer value;

    Player(int i) {

    }

    @Override
    public String toString(){
        return null;
    }

    public int getValue(){
        return value;
    }
}
