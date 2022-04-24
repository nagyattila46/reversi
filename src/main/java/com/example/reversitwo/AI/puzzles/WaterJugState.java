package com.example.reversitwo.AI.puzzles;

import com.example.reversitwo.AI.search.AbstractState;
import com.example.reversitwo.AI.search.State;

import java.util.HashSet;
import java.util.Set;


/**
 * This class defines the state for the Water Jug problem as stated in the book.
 * 
 * @author Marcello
 */
public class WaterJugState extends AbstractState implements State {


	/**
	 * Constructs a new default water jug state.  Both jugs are empty.
	 */
	public WaterJugState() {
	}

	private int left = 0;
	private int right = 0;
	
	
	/**
	 * Constructs a move state from a parent state     
	 */
	private WaterJugState(WaterJugState parent, int left, int right) {
		super(parent);
		this.left = left;
		this.right = right;
	}

	/**
	 * Returns a set of all possible moves from this state.
	 */
	public Set<State> getPossibleMoves() {
		Set<State> moves = new HashSet<State>();
		// fill
		moves.add(new WaterJugState(this,3,right));
		moves.add(new WaterJugState(this,left,5));
		// empty
		moves.add(new WaterJugState(this,0,right));
		moves.add(new WaterJugState(this,left,0));
		// left to right
		int delta = Math.min(left, 5-right);
		if (delta>0)
			moves.add(new WaterJugState(this,left-delta,right+delta));
		// right to left
		delta = Math.min(3-left, right);
		if (delta>0)
			moves.add(new WaterJugState(this,left+delta,right-delta));
		
		return moves;
	}
	/**
	 * The solution is specified as having 4 gallons in the right jug.
	 * @return true if this state is a solution
	 */
	public boolean isSolution() {
		return right==4;
	}
	
	/**
	 * Returns a heuristic approximation of the number of moves required
	 * to solve this problem from this state.  This is implemented as
	 * the difference between the left jug being 2 and right jug being 5,
	 * the move that is prior to winning.
	 */
	public double getHeuristic() {
		if (right==4) 
			return 0;
		return 1+Math.abs(left-2)+Math.abs(right-5);
	}
	
	/**
	 * Compares whether two objects are equal.
	 */
	public boolean equals(Object o) {
		if (o==null || !(o instanceof WaterJugState))
			return false;
		WaterJugState wjs = (WaterJugState)o;
		return this.left==wjs.left &&
				this.right==wjs.right;
	}
	/**
	 * Returns a hashcode for this state (for lookup optimization).
	 */
	public int hashCode() {
		return left*5+right;
	}
	/**
	 * Returns a string representation of this state
	 */
	public String toString() {
		return "(" + left + ") (" + right + ") (moves: " + getDistance() + ")";
	}

}