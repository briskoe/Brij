package time;
//Evan Daily
import static org.junit.Assert.*;

import org.junit.Ignore;
import org.junit.Test;

public class TimeTest {

	@Test
	public void testGetMilliseconds() {
		assertTrue(Time.getMilliseconds("12:05:05:06") + " =/= " + 6, (Time.getMilliseconds("12:05:05:06") == 6));
	}
	
	@Ignore
	public void testMain() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetTotalSeconds() {
		assertTrue(Time.getTotalSeconds("12:05:05") + " =/= " + 43505, (Time.getTotalSeconds("12:05:05") == 43505));
	}

	@Test
	public void testGetTotalSecondsBoundary() {
		assertTrue(Time.getTotalSeconds("00:00:00") + " =/= " + 0, (Time.getTotalSeconds("00:00:00") == 0));
	}
	
	@Test (expected = Exception.class)
	public void testGetTotalSecondsBadInput() {
		assertTrue(Time.getTotalSeconds("Twelve") + " =/= " + 12, (Time.getTotalSeconds("Twelve") == 12));
	}	
	
	@Test 
	public void testGetSeconds() {
		assertTrue(Time.getSeconds("12:05:05") + " =/= " + 05, (Time.getSeconds("12:05:05") == 05));
	}

	@Test
	public void testGetTotalMinutes() {
		assertTrue(Time.getTotalMinutes("12:05:05") + " =/= " + 05, (Time.getTotalMinutes("12:05:05") == 05));
	}

	@Test
	public void testGetTotalHours() {
		assertTrue(Time.getTotalHours("12:05:05") + " =/= " + 12, (Time.getTotalHours("12:05:05") == 12));
	}

}
