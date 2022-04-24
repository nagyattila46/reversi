package com.example.reversitwo.AI.puzzles;

import com.example.reversitwo.AI.search.AbstractState;
import com.example.reversitwo.AI.search.State;

import java.util.HashSet;
import java.util.Set;

/**
 * This class defines the state for the Missionaries and Cannibals problem
 * as stated in the book.
 * 
 * @author Marcello
 */

public class MissionaryState extends AbstractState {

	/**
	 * Constructs a new default missionary and cannibal state.
	 * This is specified as the game start state with 3 missionaries and
	 * 3 cannibals on the east side with a boat.
	 */
	public MissionaryState() {
	}

	private int eastMissionaries = 3;
	private int eastCannibals = 3;
	private int westMissionaries = 0;
	private int westCannibals = 0;
	private boolean boatOnEast = true;
	
	/**
	 * Constructs a move state from a parent state     
	 */
	private MissionaryState(MissionaryState parent, 
			int deltaMissionaries, int deltaCannibals) {
		super(parent);
		this.boatOnEast = !parent.boatOnEast;
		if (this.boatOnEast) {
			deltaMissionaries = -deltaMissionaries;
			deltaCannibals = -deltaCannibals;
		}
		this.eastMissionaries = parent.eastMissionaries - deltaMissionaries;
		this.westMissionaries = parent.westMissionaries + deltaMissionaries;
		this.eastCannibals = parent.eastCannibals - deltaCannibals;
		this.westCannibals = parent.westCannibals + deltaCannibals;
	}

	/**
	 * Returns a set of all possible moves from this state.
	 */
	public Set<State> getPossibleMoves() {
		Set<State> moves = new HashSet<State>();
		new MissionaryState(this, 1, 0).addIfSafe(moves);
		new MissionaryState(this, 2, 0).addIfSafe(moves);
		new MissionaryState(this, 0, 1).addIfSafe(moves);
		new MissionaryState(this, 0, 2).addIfSafe(moves);
		new MissionaryState(this, 1, 1).addIfSafe(moves);
		return moves;
	}
	private void addIfSafe(Set<State> moves) {
		if ((eastMissionaries <= eastCannibals || eastCannibals==0) &&
			(westMissionaries <= westCannibals || westCannibals==0) &&
			eastMissionaries>=0 && eastCannibals>=0 &&
			westMissionaries>=0 && westCannibals>=0)
			moves.add(this);
	}
	/**
	 * The solution is specified as having all missionaries and cannibals on
	 * west side.  It does not matter where the boat is.
	 * @return true if this state is a solution
	 */
	public boolean isSolution() {
		return eastMissionaries==0 && eastCannibals==0;
	}
	
	/**
	 * Returns a heuristic approximation of the number of moves required
	 * to solve this problem from this state.  This is implemented as
	 * 2 times the number of people on the east side
	 */
	public double getHeuristic() {
		return 2*(eastMissionaries+eastCannibals);
	}
	/**
	 * Compares whether two objects are equal.
	 */
	public boolean equals(Object o) {
		if (o==null || !(o instanceof MissionaryState))
			return false;
		MissionaryState ms = (MissionaryState)o;
		return this.boatOnEast==ms.boatOnEast &&
				this.eastMissionaries==ms.eastMissionaries &&
				this.eastCannibals==ms.eastCannibals;
	}
	/**
	 * Returns a hashcode for this state (for lookup optimization).
	 */
	public int hashCode() {
		return ((boatOnEast?1:0)<<16)|
				(eastMissionaries<<8)|
				(eastCannibals);
	}
	/**
	 * Returns a string representation of this state
	 */
	public String toString() {
		return "["+eastMissionaries+"/"+eastCannibals
			+"  "+(boatOnEast?"B":" ")+" | ~~~~~ | "+ (boatOnEast?" ":"B") +"  "
			+ westMissionaries+"/"+westCannibals+"] (moves: " + getDistance() + ")";
	}

}
