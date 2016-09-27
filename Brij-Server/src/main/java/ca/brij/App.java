package ca.brij;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ca.brij.bean.user.User;
import ca.brij.dao.user.UserDao;

/**
 * Main Class
 *
 */
@SpringBootApplication
public class App 
{
    public static void main( String[] args )
    {
		SpringApplication.run(App.class, args);
    }
    
	@Autowired
    public void insertPriviligedUser(UserDao dao){
		if(dao.findByUserName("admin") == null){
	    	dao.save(User.getPriviligedUser());
		}
    }

}
