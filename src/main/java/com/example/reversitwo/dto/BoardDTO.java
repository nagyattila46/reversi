package com.example.reversitwo.dto;

import com.example.reversitwo.entity.Board;
import com.example.reversitwo.entity.Player;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Locale;

public class BoardDTO {

    private int N=8;

    private Long ID;
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
    private int egyesekSzama=2;
    private int kettesekSzama=2;
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

    public void setEgyesekSzama(int egyesekSzama) {
        this.egyesekSzama = egyesekSzama;
    }

    public int getKettesekSzama() {
        return kettesekSzama;
    }

    public void setKettesekSzama(int kettesekSzama) {
        this.kettesekSzama = kettesekSzama;
    }

    public BoardDTO setMezo(BoardDTO b, Player p, int i, int j){
        b.palya[i][j]=p.getValue();
        return b;
    }

}
