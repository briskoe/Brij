package ca.brij.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationProperties {

	@Value("${brij.google.api.key}")
	private String googleKey;

	@Value("${brij.serverURL}")
	private String serverURL;
	
	public String getGoogleKey() {
		return googleKey;
	}

	public void setGoogleKey(String googleKey) {
		this.googleKey = googleKey;
	}

	public String getServerURL() {
		return serverURL;
	}

}
