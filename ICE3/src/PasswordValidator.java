
public class PasswordValidator {

	public String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String p) {
		password = p;
	}

	// public boolean goodPasswordLength() {
	// return password.length() >= 8;
	// }
	//
	// public boolean hasDigits() {
	// int digits = 0;
	// for (int i = 0; i < password.length(); i++) {
	//
	// try {
	// Integer.parseInt(password.charAt(i) + "");
	// digits++;
	// } catch (NumberFormatException e) {
	// }
	// }
	// return (digits >= 2);
	// }

	public boolean goodPasswordLength() {
		if (password == null) {
			return false;
		}
		return password.length() >= 8;
	}

	public boolean hasDigits() {
		if (!goodPasswordLength()) {
			return false;
		}
		int digits = 0;
		for (int i = 0; i < password.length(); i++) {

//			try {
//				Integer.parseInt(password.charAt(i) + "");
//				digits++;
//			} catch (NumberFormatException e) {
//				
//			} 
			if(Character.isDigit(password.charAt(i))){
				digits++;
			}
		}
		return (digits >= 2);
	}

}
