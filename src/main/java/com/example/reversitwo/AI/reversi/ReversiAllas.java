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
public class ReversiAllas extends Position{
    public int N=8;
    public int [][] állás=new int[][]{
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,1,2,0,0,0},
            {0,0,0,2,1,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0},
            {0,0,0,0,0,0,0,0}};

    // this is initializer code
          

    int szabadMezokSzama=setSzabadMezokSzama();
    int egyesekSzama=2;
    int kettesekSzama=2;
    
    
//   public int szabadMezok(){
//       for (int i = 0; i < N; i++) {
//           for (int j = 0; j < N; j++) {
//               if(állás[i][j]!=0){
//                   szabadMezokSzama--;
//               }
//           }
//       }
//       return szabadMezokSzama;
//    }


    public int getN() {
        return N;
    }

    public int[][] getÁllás() {
        return állás;
    }

    public void setN(int N) {
        this.N = N;
    }

    public void setMatrix(int[][] inputállás) {
        setN(állás.length);
        állás = new int[inputállás.length][inputállás[0].length];
        for (int row=0; row<N; row++){
            for (int col=0; col<N; col++){
                this.állás[row][col] = inputállás[row][col];
            }
        }
        
    }

    public int getEgyesekSzama() {
        int db=0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if(állás[i][j]==1){
                    db++;
                }
            }
        }
        return db;
    }

    public int getKettesekSzama() {
        int db=0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if(állás[i][j]==2){
                    db++;
                }
            }
        }
        return db;
    }

    public int getSzabadMezokSzama() {
        return szabadMezokSzama;
    }

    public int setSzabadMezokSzama() {
        szabadMezokSzama=0;
        for (int i = 0; i < N; i++) {
           for (int j = 0; j < N; j++) {
               if(this.állás[i][j]==0){
                   szabadMezokSzama++;
               }
           }
       }
        return szabadMezokSzama;
        
    }

    public void setEgyesekSzama(int egyesekSzama) {
        this.egyesekSzama = egyesekSzama;
    }

    public void setKettesekSzama(int kettesekSzama) {
        this.kettesekSzama = kettesekSzama;
    }
    
    
    

    
    @Override
    public String toString() {
        StringBuilder sb = new  StringBuilder("Pos:\n");
        for (int row=0; row<N; row++) {
            for (int col=0; col<N; col++) 
                sb.append(this.állás[row][col]==' '?'-':állás[row][col]);
        sb.append("\n");
        }
        return sb.toString();
        
    }
}

