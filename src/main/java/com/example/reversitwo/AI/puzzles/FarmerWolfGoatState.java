package com.example.reversitwo.AI.puzzles;

import com.example.reversitwo.AI.search.AbstractState;
import com.example.reversitwo.AI.search.State;

import java.util.HashSet;
import java.util.Set;

public class FarmerWolfGoatState extends AbstractState {
	
	enum Side {
        EAST { public Side getOpposite() { return WEST; } },
        WEST { public Side getOpposite() { return EAST; } };
        
        abstract public Side getOpposite();
    }
    private Side farmer = Side.EAST;
    private Side wolf = Side.EAST;
    private Side goat = Side.EAST;
    private Side cabbage = Side.EAST;
    

    /**
     * Constructs a new default state.  Everyone is on the east side.
     */
    public FarmerWolfGoatState() {
    }

    /**
     * Constructs a move state from a parent state     
     */
    public FarmerWolfGoatState(FarmerWolfGoatState parent, 
    		Side farmer, Side wolf, Side goat, Side cabbage) {
        super(parent);
        
        this.farmer = farmer;
        this.wolf = wolf;
        this.goat = goat;
        this.cabbage = cabbage;
    }
    
   

    /**
     * Returns a set of all possible moves from this state.
     */
    public Iterable<State> getPossibleMoves() {
        Set<State> moves = new HashSet<State>();
        // Move wolf
        if (farmer==wolf)
            new FarmerWolfGoatState(this,farmer.getOpposite(),
                                         wolf.getOpposite(),
                                         goat,
                                         cabbage).addIfSafe(moves);
        // Move goat
        if (farmer==goat)
            new FarmerWolfGoatState(this,farmer.getOpposite(),
                                         wolf,
                                         goat.getOpposite(),
                                         cabbage).addIfSafe(moves);
        // Move cabbage
        if (farmer==cabbage)
            new FarmerWolfGoatState(this,farmer.getOpposite(),
                                         wolf,
                                         goat,
                                         cabbage.getOpposite()).addIfSafe(moves);
        // Move just farmer
        new FarmerWolfGoatState(this,farmer.getOpposite(),
                                     wolf,
                                     goat,
                                     cabbage).addIfSafe(moves);

        return moves;
    }
    
    private final void addIfSafe(Set<State> moves) {
        boolean unsafe = (farmer != wolf && farmer != goat) ||
                         (farmer != goat && farmer != cabbage);
        if (!unsafe)
            moves.add(this);
    }

    /**
     * The solution is specified as everyone being on the west side
     * @return true if this state is a solution
     */
    public boolean isSolution() {
        return farmer== Side.WEST &&
               wolf== Side.WEST &&
               goat== Side.WEST &&
               cabbage== Side.WEST;
    }



    /**
     * Returns a heuristic approximation of the number of moves required
     * to solve this problem from this state.  This is implemented as
     * the number of characters on the east side.
     */
    public double getHeuristic() {
        int sum = 0;
        if (farmer  == Side.EAST) sum++;
        if (wolf    == Side.EAST) sum++;
        if (cabbage == Side.EAST) sum++;
        if (goat    == Side.EAST) sum++;
        return sum;
    }
    /**
     * Compares whether two states are equal.
     */
    public boolean equals(Object o) {
        if (o==null || !(o instanceof FarmerWolfGoatState))
            return false;
        FarmerWolfGoatState fwgs = (FarmerWolfGoatState)o;
        return farmer  == fwgs.farmer && 
               wolf    == fwgs.wolf && 
               cabbage == fwgs.cabbage &&
               goat    == fwgs.goat;
    }
    /**
     * Returns a hashcode for this state (for lookup optimization).
     */
    public int hashCode() {
        return (farmer  == Side.EAST ? 1 : 0)+
               (wolf    == Side.EAST ? 2 : 0)+
               (cabbage == Side.EAST ? 4 : 0)+
               (goat    == Side.EAST ? 8 : 0);
    }
    /**
     * Returns a string representation of this state
     */
    public String toString() {
        return (farmer  == Side.EAST ? "F" : " ")+
               (wolf    == Side.EAST ? "W" : " ")+
               (cabbage == Side.EAST ? "C" : " ")+
               (goat    == Side.EAST ? "G" : " ")+
               " | ~~~~~ | "+
               (farmer  == Side.WEST ? "F" : " ")+
               (wolf    == Side.WEST ? "W" : " ")+
               (cabbage == Side.WEST ? "C" : " ")+
               (goat    == Side.WEST ? "G" : " ")+
               " (heuristic: "+getHeuristic()+")";
    }

}
