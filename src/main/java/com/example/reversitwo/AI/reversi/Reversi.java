
package com.example.reversitwo.AI.reversi;


import java.util.LinkedList;
import java.util.Scanner;


/**
 *
 * @author attila
 */
public class Reversi extends GameSearch{
    
    public boolean drawnPosition(Position p) {
        
        ReversiAllas pos=(ReversiAllas) p;
        //elfogytak a mezők és ugyanannyi fehér mint fekete
        return pos.getSzabadMezokSzama() == 0 && pos.getEgyesekSzama() == pos.getKettesekSzama();
    }

    public boolean wonPosition(Position p, boolean player) {
        
        ReversiAllas pos=(ReversiAllas) p;
        
        // TODO ez az összes eset csak akkor érvényes, ha a player = true, false esetén meg kell fordítani
        
        if(player==true && pos.getSzabadMezokSzama()==0)
        {
            if(pos.getEgyesekSzama()<pos.getKettesekSzama()){
                return true;
            }//human nyert
            
        }
        
        if(player==false && pos.getSzabadMezokSzama()==0)
        {
            if(pos.getEgyesekSzama()>pos.getKettesekSzama()){
                
                return true;
            }//gép nyert
        }
        if(pos.getSzabadMezokSzama()>0 && (pos.getEgyesekSzama()==0 || pos.getKettesekSzama()==0)){
            System.out.println("getszabadmezok"+pos.getSzabadMezokSzama()+" egyesek"+pos.getEgyesekSzama()+" kettesek"+pos.getKettesekSzama());
            return true;
        }
        // TODO lehet, hogy a szabadMezőkSzáma>0, de a kettesekSzáma==0, akkor is return true;
        return false; //elfogytak a mezők és (player ? fehér>fekete : fehér < fekete)
    }

    public float positionEvaluation(Position p, boolean player) {
        //darabszám - különbség (player ? fehérdb-feketedb : feketedb - fehérdb)
       ReversiAllas pos = (ReversiAllas) p;
        
        if(player){
            return pos.getEgyesekSzama()-pos.getKettesekSzama() ;
        }
        else return pos.getKettesekSzama()-pos.getEgyesekSzama(); // TODO  az előző sor fordítva
    }

    public void printPosition(Position p) {
       
       ReversiAllas pos =(ReversiAllas) p;
        
        for (int i = 0; i < pos.N; i++) {
            for (int j = 0; j < pos.N; j++) {
                System.out.print(pos.állás[i][j]+" ");
            }
            System.out.println();
            System.out.println();
        }
    }



    public Position[] possibleMoves(Position p, boolean player) {

        ReversiAllas pos=(ReversiAllas) p;

        int sajat=0, ellenfel=0;
        if(player){
            sajat=2;
            ellenfel=1;

        }else{
            sajat=1;
            ellenfel=2;

        }

        LinkedList<Position> possible=new LinkedList<Position>();
        possible.clear();
        for (int i = 0; i < pos.N; i++) {
            for (int j = 0; j < pos.N; j++) {
                if(pos.állás[i][j]==0)
                {
                    //jobb
                    for (int k = j+1; k < pos.N; k++) {
                        if(k==pos.N-1){
                            break;
                        }
                    if(pos.állás[i][k]==ellenfel){
                        if(pos.állás[i][k+1]==sajat){
                        ReversiAllas a=new ReversiAllas();
                        a.setN(pos.N);
                        a.setMatrix(pos.állás);
                        //makeMove(a, player,new ReversiLepes(i,j));
                            a.állás[i][j]=1;
                        possible.add(a);

                        }
                    }
                        break;
                    }
                    //bal

                    for (int k = j-1; k >= 0; k--) {
                            if(k==0){
                                break;
                            }

                            if(pos.állás[i][k]==ellenfel){
                                if(pos.állás[i][k-1]==sajat){
                                    ReversiAllas a=new ReversiAllas();
                                    a.setN(pos.N);
                                    a.setMatrix(pos.állás);
                                    //makeMove(a, player,new ReversiLepes(i,j));
                                    a.állás[i][j]=1;
                                    possible.add(a);

                                }
                            }
                        break;
                    }

                    //fel
                    for (int k = i-1; k >= 0; k--) {
                            if(k==0){
                                break;
                            }

                            if(pos.állás[k][j]==ellenfel){
                                if(pos.állás[k-1][j]==sajat){
                                    ReversiAllas a=new ReversiAllas();
                                    a.setN(pos.N);
                                    a.setMatrix(pos.állás);
                                    //makeMove(a, player,new ReversiLepes(i,j));
                                    a.állás[i][j]=1;
                                    possible.add(a);

                                }
                            }
                        break;
                    }


                    //le
                    for (int k = i+1; k <pos.N-1; k++) {
                            if(k==(pos.N)-2){
                                break;
                            }

                            if(pos.állás[k][j]==ellenfel){
                                if(pos.állás[k+1][j]==sajat){
                                    ReversiAllas a=new ReversiAllas();
                                    a.setN(pos.N);
                                    a.setMatrix(pos.állás);
                                    //makeMove(a, player,new ReversiLepes(i,j));
                                    a.állás[i][j]=1;
                                    possible.add(a);

                                }
                            }
                        break;
                    }

                    //jobb fel

                    for (int k = i-1; k >= 0; k--) {
                        for (int l = j+1; l <pos.N ; l++) {

                                if(k==0){
                                    break;
                                }
                                if(l==pos.N-1){
                                    break;
                                }

                                if(pos.állás[k][j]==ellenfel){
                                    if(pos.állás[k-1][j+1]==sajat){
                                        ReversiAllas a=new ReversiAllas();
                                        a.setN(pos.N);
                                        a.setMatrix(pos.állás);
                                        //makeMove(a, player,new ReversiLepes(i,j));
                                        a.állás[i][j]=1;
                                        possible.add(a);

                                    }
                                }


                        }
                        break;
                    }

                    //jobb le

                    for (int k = i+1; k <pos.N; k++) {
                        for (int l = j-1; l >=0 ; l--) {

                            if(k==pos.N-1){
                                break;
                            }
                            if(l==0) {
                                break;
                            }

                            if(pos.állás[k][j]==ellenfel){
                                if(pos.állás[k+1][j-1]==sajat){
                                    ReversiAllas a=new ReversiAllas();
                                    a.setN(pos.N);
                                    a.setMatrix(pos.állás);
                                    //makeMove(a, player,new ReversiLepes(i,j));
                                    a.állás[i][j]=1;
                                    possible.add(a);

                                }
                            }
                        }
                        break;
                    }
                    //bal fel
                    for (int k = i-1; k >=0; k--) {
                        for (int l = j-1; l >=0 ; l--) {


                                if(k==0){
                                    break;
                                }
                                if(l==0){
                                    break;
                                }

                                if(pos.állás[k][j]==ellenfel){
                                    if(pos.állás[k-1][j-1]==sajat){
                                        ReversiAllas a=new ReversiAllas();
                                        a.setN(pos.N);
                                        a.setMatrix(pos.állás);
                                        //makeMove(a, player,new ReversiLepes(i,j));
                                        a.állás[i][j]=1;
                                        possible.add(a);

                                    }
                                }


                        }
                        break;
                    }

                    //bal le
                    for (int k = i+1; k <pos.N; k++) {
                        for (int l = j-1; l >=0 ; l--) {


                                if(k==pos.N-1){
                                    break;
                                }
                                if(l==0){
                                    break;
                                }

                                if(pos.állás[k][j]==ellenfel){
                                    if(pos.állás[k+1][j-1]==sajat){
                                        ReversiAllas a=new ReversiAllas();
                                        a.setN(pos.N);
                                        a.setMatrix(pos.állás);
                                        //makeMove(a, player,new ReversiLepes(i,j));
                                        a.állás[i][j]=1;
                                        possible.add(a);

                                    }
                                }


                        }
                        break;
                    }


                }



                }
            }

        Position []answer=new Position[possible.size()];
        for (int i=0; i<answer.length; i++) answer[i] = possible.get(i);


        return answer;
       
        
    }

    public ReversiAllas makeMove(Position p, boolean player, Move move)   {
        
        ReversiAllas pos=(ReversiAllas) p;
        ReversiLepes lepes=(ReversiLepes) move;
        //player 
        //true=human=2  false=machine=1
        int aktualis=0;
        int ellenfel=0;
        if(player==true){
            aktualis=2;
            ellenfel=1;
        }
        if(player==false){
            aktualis=1;
            ellenfel =2;
        }

        ReversiAllas pos2=new ReversiAllas();
        pos2.setMatrix(pos.állás);
        pos2.állás[lepes.row][lepes.col]=aktualis;
        return pos2;

        //a lépést megcsinálni, egy állást konstruálni és visszaadni egy új állásban
    }

    public boolean reachedMaxDepth(Position p, int depth) {
        return depth>5;
    }

    public Move createMove(Position p, boolean player) {
    
        //be kell kérni egy sort és egy oszlopot,arra egy move-t kreálni és visszaadni
        
        ReversiAllas pos=(ReversiAllas) p;
        ReversiLepes reversiLepes=new ReversiLepes();
        boolean ok=false;
        Scanner sc=new Scanner(System.in);
        int sor=-1,oszlop=-1;
        try {
            if(player){
                do{
                    System.out.print("\nSor:");
                    sor=sc.nextInt();
                    System.out.print("\nOszlop:");
                    oszlop=sc.nextInt();

                    if(sor>=0 && sor<pos.N && oszlop>=0 && oszlop<pos.N && pos.állás[sor][oszlop]==0){
                        ok=true;
                    }


                }while(!ok);
            }

            
           
            
        } catch (IndexOutOfBoundsException e) {
            System.out.println("Hibás adat");
        }

        reversiLepes.setRow(sor);
        reversiLepes.setCol(oszlop);
        return reversiLepes;

    
    }


    public static void main(String[] args) {
        ReversiAllas a=new ReversiAllas();
        Reversi r=new Reversi();
        r.playGame(a,false);
    }

    
    
    
}
