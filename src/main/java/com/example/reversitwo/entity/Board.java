package com.example.reversitwo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Board {

    private int N=8;
    @Id
    @GeneratedValue
    private Long ID;
    @Lob
    private int[][] palya= {
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,1,2,0,0,0},
            {0,0,0,2,1,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0}};

    private int szabadMezokSzama;
    private int egyesekSzama;
    private int kettesekSzama;
    private boolean turn=true;

    public boolean isTurn() {
        return turn;
    }

    public void setTurn(boolean turn) {
        this.turn = turn;
    }

    public int getN() {
        return N;
    }

    public void setN(int n) {
        N = n;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public int[][] getPalya() {
        return palya;
    }

    public void setPalya(int[][] palya) {
        this.palya = palya;
    }

    public int getSzabadMezokSzama() {
        return szabadMezokSzama;
    }

    public void setSzabadMezokSzama(int szabadMezokSzama) {
        this.szabadMezokSzama = szabadMezokSzama;
    }

    public int getEgyesekSzama() {
        return egyesekSzama;
    }

    public int getKettesekSzama() {
        return kettesekSzama;
    }

    public void setEgyesekSzama(int egyesekSzama) {
        this.egyesekSzama = egyesekSzama;
    }


    public void setKettesekSzama(int kettesekSzama) {
        this.kettesekSzama = kettesekSzama;
    }

    public Board setMezo(Board b,Player p,int i,int j){
        b.palya[i][j]=p.getValue();
        return b;
    }
}
