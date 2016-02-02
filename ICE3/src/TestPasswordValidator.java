import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

public class TestPasswordValidator {

	PasswordValidator pv;
	@Before
	public void setup()
	{
		 pv = new PasswordValidator();
	}
	@Test
	public void testLength() {
		pv.setPassword("12345678");
		boolean result = pv.goodPasswordLength();
		assertTrue("It failed " + result, result );
	}
	
	@Test
	public void testDigits() {
		pv.setPassword("password12");
		boolean result = pv.hasDigits();
		assertTrue("It failed " + result, result );

	}

}
